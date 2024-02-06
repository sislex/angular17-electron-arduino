import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-popup-commands-list',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './popup-commands-list.component.html',
  styleUrl: './popup-commands-list.component.scss'
})
export class PopupCommandsListComponent {
  @Input() value:string=''; 

  @Output() emitter = new EventEmitter(); 

  onNoClick(): void {
    console.log('ops')
  }

  buttonClick(data: string) {
    const message = {
      event: 'PopupCommandListComponent:UseCommand', 
      data,
    };
    this.emitter.emit(message);
  }

  clearFun(value:string) {
    value=''
  }
}
