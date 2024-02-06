import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageLayoutComponent } from '../page-layout/page-layout.component';

@Component({
  selector: 'device-page-layout',
  standalone: true,
  imports: [MatCardModule, PageLayoutComponent],
  templateUrl: './device-page-layout.component.html',
  styleUrls: ['./device-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicePageLayoutComponent {
  @Input() title: string = '';
}
