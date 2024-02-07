import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { MatGridListModule } from '@angular/material/grid-list';
import {LightTwoComponent} from './light-two-button.component';


const meta: Meta<LightTwoComponent> = {
  title: 'UI Components/LightTwoComponent',
  component: LightTwoComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: LightTwoComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<LightTwoComponent>;

export const Primary: Story = {
  args: {
    },
};
