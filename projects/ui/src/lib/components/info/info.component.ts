import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface IInfo {
  prop: string;
  descrip: string;
}

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  @Input() title: string = '';
  info: IInfo[] = [];

  displayedColumns: string[] = ['prop', 'descrip'];
}
