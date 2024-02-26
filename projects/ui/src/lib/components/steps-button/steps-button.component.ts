import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { IMoveSkin } from '../../../../../tripod/src/lib/+state/skins/move-skin/view/move-view-skin.reducer';

@Component({
  selector: 'steps-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './steps-button.component.html',
  styleUrl: './steps-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsButtonComponent {
  @Input() buttons: IMoveSkin[] = [];
  @Input() message: string = '';

  @Output() emitter = new EventEmitter()

  buttonClick(item: any) {
    const message = {
      event: 'SetButtonsComponent:BUTTON_CLICKED',
      data: item
    };
    this.emitter.emit(message);
  }
}
