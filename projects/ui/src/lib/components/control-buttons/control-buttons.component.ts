import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'control-buttons',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './control-buttons.component.html',
  styleUrl: './control-buttons.component.scss'
})
export class ControlButtonsComponent {
  @Output() emitter = new EventEmitter() 

  buttonClick(data: string) {
    const message = {
      event: 'ControlButtonsComponent:buttonClick', 
      data,
    };
    this.emitter.emit(message);
  }
}
