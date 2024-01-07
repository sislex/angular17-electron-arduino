import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent {
  @Input() message: string = '';
  @Output() emitter = new EventEmitter();

  buttonClicked(note: string) {
    this.emitter.emit({
      event: 'NavPanelComponent:BUTTON_CLICKED',
      data: {note},
    });
  }
}
