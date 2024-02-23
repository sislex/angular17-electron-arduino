import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

export interface SpeedControlComponentButton {
  value: number;
  text: string;
  selected?: boolean;
}

@Component({
  selector: 'speed-control',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './speed-control.component.html',
  styleUrl: './speed-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedControlComponent {
  @Input() buttons: SpeedControlComponentButton[] = [];

  @Output() emitter = new EventEmitter()

  buttonClick(data: number) {
    const message = {
      event: 'SpeedControlComponent:BUTTON_CLICKED',
      data,
    };
    this.emitter.emit(message);
  }
}
