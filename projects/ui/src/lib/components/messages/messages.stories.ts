import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MessagesComponent } from './messages.component';

const meta: Meta<MessagesComponent> = {
  title: 'UI Components/MessagesComponent',
  component: MessagesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: MessagesComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<MessagesComponent>;

export const Primary: Story = {
  args: {
    stateLog: [
          {direction: 'from', message: "{event: 'first log', data:'asdq'}", timestamp: '11.11.11'}, 
          {direction: 'to', message: "{event: 'second log', data:'asdq'}", timestamp: '11.11.11'}, 
          {direction: 'from', message: "{event: 'third log', data:'asdq'}", timestamp: '11.11.11'},
      ]
  },
};






