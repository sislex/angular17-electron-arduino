import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'light-three',
  standalone: true,
  imports: [MatIconModule, MatGridListModule, MatButtonModule],
  templateUrl: './light-three-button.component.html',
  styleUrls: ['./light-three-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightThreeComponent {
  @Input() led = 'OFF';
  @Output() emitter = new EventEmitter()

  buttonClick(data: string) {
    const message = {
      event: 'LightThreeComponent:BUTTON_CLICKED',
      data,
    };
    this.emitter.emit(message);
  }
}