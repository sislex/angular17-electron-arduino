import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AccountMenuComponent } from '../account-menu/account-menu.component';

@Component({
  selector: 'nav-panel',
  standalone: true,
  templateUrl: './nav-panel.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    AccountMenuComponent
  ],
  styleUrls: ['./nav-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavPanelComponent {
  @Input() message: string = '';
  @Output() emitter = new EventEmitter();
}
