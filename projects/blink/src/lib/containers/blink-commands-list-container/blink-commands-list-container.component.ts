import { Component } from '@angular/core';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';
import { PageLayoutComponent } from '../../../../../ui/src/public-api';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';


@Component({
  selector: 'blink-commands-list-container',
  standalone: true,
  imports: [CommandsListComponent, PageLayoutComponent, BlinkNavPanelContainerComponent],
  templateUrl: './blink-commands-list-container.component.html',
  styleUrl: './blink-commands-list-container.component.scss'
})
export class BlinkCommandsListContainer {

}
