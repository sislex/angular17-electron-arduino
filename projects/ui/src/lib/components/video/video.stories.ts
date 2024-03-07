import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {VideoComponent} from './video.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

const meta: Meta<VideoComponent> = {
  title: 'UI Components/UserListComponent',
  component: VideoComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: VideoComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<VideoComponent>;

export const Primary: Story = {
  args: {
    src: 'http://192.168.0.208:8080/video',
  },
};
