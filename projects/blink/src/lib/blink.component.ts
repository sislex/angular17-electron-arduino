import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'lib-blink',
  standalone: true,
  imports: [],
  template: `
    <p>
      blink works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlinkComponent {

}
