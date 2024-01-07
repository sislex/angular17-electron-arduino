import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'nav-panel',
  standalone: true,
  templateUrl: './nav-panel.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent {
  @Input() message: string = '';
  @Output() emitter = new EventEmitter();

  buttonClicked(note: string) {
    this.emitter.emit({
      event: 'NavPanelContainerComponent:BUTTON_CLICKED',
      data: {note},
    });
  }
}
