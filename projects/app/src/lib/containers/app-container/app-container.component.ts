import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../../../../ui/src/public-api';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {

}
