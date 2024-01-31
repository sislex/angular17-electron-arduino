import { Component } from '@angular/core';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';


@Component({
  selector: 'blink-commands-list-container',
  standalone: true,
  imports: [CommandsListComponent, DevicePageLayoutComponent, BlinkNavPanelContainerComponent],
  templateUrl: './blink-commands-list-container.component.html',
  styleUrl: './blink-commands-list-container.component.scss'
})
export class BlinkCommandsListContainer {

}
