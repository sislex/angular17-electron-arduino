import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PageLayoutComponent } from '../../../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ControlButtonsComponent } from '../../../../../../../ui/src/lib/components/control-buttons/control-buttons.component';
import {SkinMoveKeyboardEventsService} from '../../../buttons/services/keyboardEvents.service';
import {initSkin, sendDirection} from '../../../../+state/skins/move-skin/view/move-view-skin.actions';
import {StepsButtonComponent} from '../../../../../../../ui/src/lib/components/steps-button/steps-button.component';
import {NavPanelContainer} from '../nav-panel-container/nav-panel-container';
import {VideoTestContainer} from '../video-test-container/video-test-container';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {getSideMenu, isVideoView} from "../../../../+state/view/view.selectors";
import {IMenuItem} from "../../../../+state/view/view.reducer";
import {selectSideMenu, setAllowRecognition} from "../../../../+state/view/view.actions";
import {getSelectedId, getTargetsList, getTargetsListCoordinate} from "../../../../+state/targets/targets.selectors";
import {getAllowRecognition} from "../../../../+state/view/view.selectors";
import {setActiveTarget} from "../../../../+state/targets/targets.actions";
import {CoordinatesMessagesService} from "../../../buttonsVideo/services/cognitionEvents.service";

@Component({
  selector: 'control-video-test-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ControlButtonsComponent,
    NavPanelContainer,
    RouterOutlet,
    AsyncPipe,
    StepsButtonComponent,
    VideoTestContainer,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './control-video-test-container.html',
  styleUrl: './control-video-test-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkinMoveKeyboardEventsService, ],
})

export class ControlVideoTestContainer implements OnInit, AfterViewInit  {

  @ViewChild('keyboardEventsArea') keyboardEventsArea!: ElementRef;

  constructor(
    private readonly store: Store,
    private coordinatesMessagesService: CoordinatesMessagesService,
  ) {
    this.getTargetCoordinates$.subscribe((coordinates) => {
      if (coordinates) {
        this.coordinatesMessagesService.sendCoordinates(coordinates);
      }
    })
  }

  getSideMenu$ = this.store.select(getSideMenu);
  isVideoView$ = this.store.select(isVideoView);
  getTargetsData$ = this.store.select(getTargetsList);
  getTargetCoordinates$ = this.store.select(getTargetsListCoordinate);
  getSelectedId$ = this.store.select(getSelectedId);
  allowRecognition$ = this.store.select(getAllowRecognition);

  setAllowRecognition() {
    this.store.dispatch(setAllowRecognition());

    this.buttonClick(-1);
  }

  selectMenu(menuItem: IMenuItem) {
    this.store.dispatch(selectSideMenu({menuItem}));
  }

  ngOnInit() {
    this.store.dispatch(initSkin());
  }

  ngAfterViewInit(): void {
    this.keyboardEventsArea.nativeElement.focus();
  }

  buttonClick(selectedId: number) {
      this.store.dispatch(setActiveTarget({selectedId}));

    this.store.dispatch(sendDirection({
      direction: 'VERTICALSTOP',
      m: 2
    }));

    this.store.dispatch(sendDirection({
      direction: 'HORIZONTALSTOP',
      m: 2
    }));
  }
}
