import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LightComponent, PageLayoutComponent} from '../../../../../ui/src/public-api';
import {BlinkNavPanelContainerComponent} from '../blink-nav-panel-container/blink-nav-panel-container.component';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {blinkSendMessage, setDeviceName} from '../../+state/blink-config/blink-config.actions';
import {RouterOutlet} from '@angular/router';
import { BlinkAboutContainerComponent } from '../blink-about-container/blink-about-container.component';

@Component({
  selector: 'lib-blink-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    BlinkNavPanelContainerComponent,
    LightComponent,
    RouterOutlet,
    BlinkAboutContainerComponent
  ],
  templateUrl: './blink-container.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlinkContainerComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const deviceName: string = this.route.snapshot.paramMap.get('deviceName') ?? 'emptyDeviceName';
    this.store.dispatch(setDeviceName({deviceName}));
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'LightComponent:BUTTON_CLICKED') {
      this.store.dispatch(blinkSendMessage({message: {
        event: 'TO_DEVICE',
        data: {
          message: {
            event: 'LED',
            data: {
              command: $event.data,
            },
          },
        },
      }}));
    } 
  }
}
