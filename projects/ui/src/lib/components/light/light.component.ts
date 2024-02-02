import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'light',
  standalone: true,
  imports: [MatIconModule, MatGridListModule],
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightComponent {
  @Input() light = false;
  @Output() emitter = new EventEmitter()

  buttonClick(data: string) {
    const message = {
      event: 'LightComponent:BUTTON_CLICKED',
      data,
    };
    this.emitter.emit(message);
  }
}
