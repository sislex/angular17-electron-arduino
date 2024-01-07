import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'lib-page-layout',
  standalone: true,
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {

}
