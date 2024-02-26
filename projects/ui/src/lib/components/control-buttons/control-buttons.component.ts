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

  buttonClick(data: string) {
    const message = {
      event: 'ControlButtonsComponent:BUTTON_CLICKED',
      data,
    };
    this.emitter.emit(message);
    console.log(message)
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    switch (event.key) {
      case 'ArrowUp':
        this.buttonClick('UP');
        break;
      case 'ArrowDown':
        this.buttonClick('DOWN');
        break;
      case 'ArrowLeft':
        this.buttonClick('LEFT');
        break;
      case 'ArrowRight':
        this.buttonClick('RIGHT');
        break;
    }
  }
}
