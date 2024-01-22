import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AboutComponent } from '../../../../../ui/src/lib/components/about/about.component';


@Component({
  selector: 'about-container',
  standalone: true,
  imports: [AsyncPipe, AboutComponent],
  templateUrl: './about-container.component.html',
  styleUrl: './about-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AboutContainerComponent {
  @Input() abouts: []=[];
  @Input() titles: string='';
  // abouts = [{name:'assaaaa', description: 'adda'}];
  // titles = 'Тайтл'
}