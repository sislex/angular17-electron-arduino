import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

export interface SpeedControlComponentButton {
  speed: number;
  text: string;
  selected?: boolean;
}

@Component({
  selector: 'speed-control',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './speed-control.component.html',
  styleUrl: './speed-control.component.scss'
})
export class SpeedControlComponent {
  @Input() buttons: SpeedControlComponentButton[] = [];

  @Output() emitter = new EventEmitter() 
  
  buttonClick(data: number) {
    const message = {
      event: 'SpeedControlComponent:buttonClick', 
      data,
    };
    this.emitter.emit(message);
  }
}
