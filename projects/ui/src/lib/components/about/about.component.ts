import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'about',
  standalone: true,
  imports: [ AsyncPipe, DatePipe, MatGridListModule, MatListModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AboutComponent {
  @Input() about: any[] | null = [] ;
  @Input() title:string = '';
}
