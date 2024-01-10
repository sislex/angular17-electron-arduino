import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {NavComponent} from './nav.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const meta: Meta<NavComponent> = {
  title: 'UI Components/NavComponent',
  component: NavComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: NavComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<NavComponent>;

export const Primary: Story = {
  args: {
  },
};
