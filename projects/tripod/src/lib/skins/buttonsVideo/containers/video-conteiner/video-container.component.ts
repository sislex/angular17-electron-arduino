import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {VideoComponent} from '../../../../../../../ui/src/lib/components/video/video.component';
import {Store} from '@ngrx/store';
import {MoveViewSkinState} from '../../../../+state/skins/move-skin/view/move-view-skin.reducer';
import {getVideoUrl} from '../../../../+state/skins/move-skin/view/move-view-skin.selectors';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RectangleComponent} from '../../../../../../../ui/src/lib/components/rectangle/rectangle.component';
import {
  getCoordinatesStyles,
  getOverageRecognitionTime, getTargetsData, getTargetsList,
  getTheDistanceToTheCenterOfTheNearestTarget
} from '../../../../+state/targets/targets.selectors';
import {UserListComponent} from '../../../../../../../ui/src/lib/components/user-list/user-list.component';
import {RecognitionWorkerService} from '../../../../../../../app/src/lib/services/recognition-worker.service';
import {getImageData} from '../../../../../../../app/src/lib/halpers/images-utils';
import {Subject, take, takeUntil} from 'rxjs';
import {getIntervalTime} from '../../../../../../../app/src/lib/halpers/coordinates-utils';
import {addCoordinates} from '../../../../+state/targets/targets.actions';

@Component({
  selector: 'app-video-container',
  standalone: true,
  imports: [
    VideoComponent,
    AsyncPipe,
    RectangleComponent,
    UserListComponent,
    JsonPipe
  ],
  templateUrl: './video-container.component.html',
  styleUrl: './video-container.component.scss'
})
export class VideoContainerComponent implements OnDestroy {
  getVideoUrl$ = this.store.select(getVideoUrl);
  getCoordinatesStyles$ = this.store.select(getCoordinatesStyles);
  getOverageRecognitionTime$ = this.store.select(getOverageRecognitionTime);
  getTheDistanceToTheCenterOfTheNearestTarget$ = this.store.select(getTheDistanceToTheCenterOfTheNearestTarget);
  getTargetsData$ = this.store.select(getTargetsData);



  private destroy$ = new Subject<void>();

  contentHtmlElement!: HTMLVideoElement;

  isContentReady = false;
  workerIsReady = false;
  isRecognizing = false;

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
  }

  ngOnDestroy() {
    if (this.contentHtmlElement) {
      this.isContentReady = false;
      const contentElement = this.contentHtmlElement;
      contentElement.src = '';
    }
    this.destroy$.next();
  }

  sendImage() {
    if (this.isContentReady && this.workerIsReady) {
      this.isRecognizing = true;

      const element: any = this.contentHtmlElement;
      let size: {width: number, height: number} = this.cameraSize;

      if (element.naturalWidth) { // if image
        size = {
          width:  element.naturalWidth/2,
          height: element.naturalHeight/2
        };
      }

      const imageData = getImageData(this.contentHtmlElement, size);
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

  contentReady(contentHtmlElement: HTMLVideoElement) {
    this.isContentReady = true;
    if (!this.isRecognizing) {
      this.contentHtmlElement = contentHtmlElement;
      this.sendImage();
    }
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'VideoComponent:CONTENT_READY') {
     this.contentReady($event.data.contentHtmlElement);
    } else if ($event.event === 'COORDINATES') {
      this.isRecognizing = false;
      this.store.dispatch(addCoordinates({recognitionData: $event.data}));
      this.cdr.detectChanges();

      const recognitionInterval = 1000;

      if (recognitionInterval > 0) {
        setTimeout(() => {
          this.sendImage();
        }, getIntervalTime($event.data.recognitionTime,  recognitionInterval));
      }
    }
  }

}
