import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { MatGridListModule } from '@angular/material/grid-list';
import {LightThreeComponent} from './light.component';


const meta: Meta<LightThreeComponent> = {
  title: 'UI Components/LightThreeComponent',
  component: LightThreeComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: LightThreeComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<LightThreeComponent>;

export const Primary: Story = {
  args: {
    light: true
    },
};
