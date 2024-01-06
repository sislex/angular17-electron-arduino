import { Component } from '@angular/core';
import {StateModule} from '../../+state/state.module';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [StateModule, RouterOutlet],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {

}
