import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {ControlButtonsComponent} from './control-buttons.component';


const meta: Meta<ControlButtonsComponent> = {
  title: 'UI Components/ControlButtonsComponent',
  component: ControlButtonsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: ControlButtonsComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<ControlButtonsComponent>;

export const Primary: Story = {
  args: {
    },
};