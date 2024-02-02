import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { MatGridListModule } from '@angular/material/grid-list';
import {LightComponent} from './light.component';


const meta: Meta<LightComponent> = {
  title: 'UI Components/LightComponent',
  component: LightComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: LightComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<LightComponent>;

export const Primary: Story = {
  args: {
    light: true
    },
};
