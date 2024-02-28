import {Component, Output, EventEmitter, ChangeDetectionStrategy, HostListener} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'control-buttons',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './control-buttons.component.html',
  styleUrl: './control-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlButtonsComponent {
  @Output() emitter = new EventEmitter()

  buttonHold(data: string, note: any) {
    const message = {
      event: 'ControlButtonsComponent:BUTTON_CLICKED',
      data,
      note,
    };
    this.emitter.emit(message);
  }
}

