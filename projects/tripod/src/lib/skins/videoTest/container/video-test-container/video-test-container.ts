import {ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {VideoComponent} from '../../../../../../../ui/src/lib/components/video/video.component';
import {Store} from '@ngrx/store';
import {MoveViewSkinState} from '../../../../+state/skins/move-skin/view/move-view-skin.reducer';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RectangleComponent} from '../../../../../../../ui/src/lib/components/rectangle/rectangle.component';
import {
  getOverageRecognitionTime, getTargetsStyles,
  getTheDistanceToTheCenterOfTheNearestTarget
} from '../../../../+state/targets/targets.selectors';
import {UserListComponent} from '../../../../../../../ui/src/lib/components/user-list/user-list.component';
import {RecognitionWorkerService} from '../../../../../../../app/src/lib/services/recognition-worker.service';
import {getImageData} from '../../../../../../../app/src/lib/halpers/images-utils';
import {Subject, take, takeUntil} from 'rxjs';
import {getIntervalTime} from '../../../../../../../app/src/lib/halpers/coordinates-utils';
import {addCoordinates} from '../../../../+state/targets/targets.actions';
import {getAllowRecognition, getSelectedSideMenuItem} from "../../../../+state/view/view.selectors";
import {ICoordinatesItem} from "../../../../+state/targets/targets.reducer";
import {setIsRecognition} from "../../../../+state/view/view.actions";

@Component({
  selector: 'video-test-container',
  standalone: true,
  imports: [
    VideoComponent,
    AsyncPipe,
    RectangleComponent,
    UserListComponent,
    JsonPipe
  ],
  templateUrl: './video-test-container.html',
  styleUrl: './video-test-container.scss'
})
export class VideoTestContainer implements OnDestroy {

  @ViewChild('content', { static: false }) contentElement!: ElementRef<HTMLVideoElement>;

  getCoordinatesStyles$ = this.store.select(getTargetsStyles);
  getTargetsStyles$ = this.store.select(getTargetsStyles);
  getOverageRecognitionTime$ = this.store.select(getOverageRecognitionTime);
  getTheDistanceToTheCenterOfTheNearestTarget$ = this.store.select(getTheDistanceToTheCenterOfTheNearestTarget);
  getSelectedSideMenuItem$ = this.store.select(getSelectedSideMenuItem).pipe(take(1));
  allowRecognition$ = this.store.select(getAllowRecognition);


  private destroy$ = new Subject<void>();

  isContentReady = false;
  workerIsReady = false;
  isRecognizing = false;
  recognizing = true;


  private cameraSize: {width: number, height: number} = {
    width:  320,
    height: 240,
  }


  constructor(
    private readonly store: Store<MoveViewSkinState>,
    private readonly recognitionWorkerService: RecognitionWorkerService,
    private readonly cdr:  ChangeDetectorRef,
  ) {
    this.recognitionWorkerService.isWorkerReady$.pipe(takeUntil(this.destroy$)).subscribe((isReady) => {
      this.workerIsReady = isReady;
      this.sendImage();
    });

    this.recognitionWorkerService.getWorkerMessages().pipe(takeUntil(this.destroy$)).subscribe((message) => {
      this.events(message);
    });

    this.allowRecognition$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.recognizing = value;
      if (this.recognizing) {
        this.sendImage()
      }
    });
  }

  stopRecognition(event$: boolean){
    this.store.dispatch(setIsRecognition({allowRecognition: event$}));
    if (!event$) {
      this.sendImage()
    }
  }

    ngOnDestroy() {
    if (this.contentElement && this.contentElement.nativeElement) {
        this.isContentReady = false;
      const contentElement = this.contentElement.nativeElement;
      contentElement.src = '';
    }
    this.destroy$.next();
  }

  sendImage() {
    if (this.isContentReady && this.workerIsReady && this.recognizing) {
      this.isRecognizing = true;

      const element: any = this.contentElement.nativeElement;
      let size: {width: number, height: number} = this.cameraSize;

      if (element.naturalWidth) { // if image
        size = {
          width:  element.naturalWidth/4.5,
          height: element.naturalHeight/4.5,
        };
      }

      const imageData = getImageData(this.contentElement.nativeElement, size);
      this.recognitionWorkerService.sendMessage({
        event: 'PROCESS_IMAGE',
        data: {
          data: imageData.data.buffer,
          width: imageData.width,
          height: imageData.height,
        },
      }, [imageData.data.buffer]);
    }
  }

  contentReady() {
    this.isContentReady = true;
    if (!this.isRecognizing ) {
      this.sendImage();
    }
  }



  events(message: any) {
    // console.log(message);
    if (message.event === 'COORDINATES') {
      this.isRecognizing = false;
      this.store.dispatch(addCoordinates({recognitionData: message.data}));
      this.cdr.detectChanges();

      this.getSelectedSideMenuItem$.pipe(take(1)).subscribe((selectedItem) => {
        let recognitionInterval = selectedItem?.data.recognitionInterval;

        if (recognitionInterval > 0) {
          setTimeout(() => {
            this.sendImage();
          }, getIntervalTime(message.data.recognitionTime,  recognitionInterval));
        }
      });
    }
  }



}
