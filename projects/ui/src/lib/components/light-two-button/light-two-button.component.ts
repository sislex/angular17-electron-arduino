import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'light-two',
  standalone: true,
  imports: [MatIconModule, MatGridListModule, MatButtonModule],
  templateUrl: './light-two-button.component.html',
  styleUrls: ['./light-two-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightTwoComponent {
  @Input() mode: string | null = 'OFF';
  @Input() led: string | null = 'OFF';
  @Output() emitter = new EventEmitter();

  getImagePath(mode: string): string {
    return `./assets/images/blink/${mode}.png`;
  }

  buttonClick(data: string) {
    const message = {
      event: 'LightTwoComponent:BUTTON_CLICKED',
      data,
    };
    this.emitter.emit(message);
  }
}
