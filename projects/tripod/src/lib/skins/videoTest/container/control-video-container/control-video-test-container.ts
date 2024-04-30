import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PageLayoutComponent } from '../../../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ControlButtonsComponent } from '../../../../../../../ui/src/lib/components/control-buttons/control-buttons.component';
import {SkinMoveKeyboardEventsService} from '../../../buttons/services/keyboardEvents.service';
import { initSkin } from '../../../../+state/skins/move-skin/view/move-view-skin.actions';
import {StepsButtonComponent} from '../../../../../../../ui/src/lib/components/steps-button/steps-button.component';
import {NavPanelContainer} from '../nav-panel-container/nav-panel-container';
import {VideoTestContainer} from '../video-test-container/video-test-container';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {getSideMenu, isVideoView} from "../../../../+state/view/view.selectors";
import {IMenuItem} from "../../../../+state/view/view.reducer";
import {selectSideMenu} from "../../../../+state/view/view.actions";
import {
  getSelectedId,
  getTargetsList,
} from "../../../../+state/targets/targets.selectors";
import {setActiveTarget} from "../../../../+state/targets/targets.actions";

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
  ){}

  getSideMenu$ = this.store.select(getSideMenu);
  isVideoView$ = this.store.select(isVideoView);
  getTargetsData$ = this.store.select(getTargetsList);
  getSelectedId$ = this.store.select(getSelectedId);


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
  }
}
