import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {LigthCopyComponent} from './ligth.component';
import { MatGridListModule } from '@angular/material/grid-list';


const meta: Meta<LigthCopyComponent> = {
  title: 'UI Components/LigthCopyComponent',
  component: LigthCopyComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: LigthCopyComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<LigthCopyComponent>;

export const Primary: Story = {
  args: {
    light: true
    },
};