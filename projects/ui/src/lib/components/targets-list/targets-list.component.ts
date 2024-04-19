import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import {ITarget} from "../../../../../tripod/src/lib/+state/targets/targets.reducer";

@Component({
  selector: 'targets-list',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './targets-list.component.html',
  styleUrl: './targets-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetsListComponent {
  @Input() targets: ITarget[]|null = [];

  @Output() emitter = new EventEmitter()

  buttonClick(item: any) {
    const message = {
      event: 'LightTarget:BUTTON_CLICKED',
      data: item
    };
    this.emitter.emit(message);
  }
}
