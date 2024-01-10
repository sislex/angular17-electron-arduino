import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {UserListComponent} from './user-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

const meta: Meta<UserListComponent> = {
  title: 'UI Components/UserListComponent',
  component: UserListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: UserListComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<UserListComponent>;

export const Primary: Story = {
  args: {
    users: [
      {id: 1, name: 'User1', role: 'admin'},
      {id: 2, name: 'User2', role: 'admin'},
    ],
  },
};