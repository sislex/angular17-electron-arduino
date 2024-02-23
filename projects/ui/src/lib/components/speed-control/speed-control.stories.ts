import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {SpeedControlComponent} from './speed-control.component';

const meta: Meta<SpeedControlComponent> = {
  title: 'UI Components/SpeedControlComponent',
  component: SpeedControlComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: SpeedControlComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<SpeedControlComponent>;

export const Primary: Story = {
  args: {
    buttons: [
      {text: 'X0,25',  value: 0.25, selected: false},
      {text: 'X0,5',  value: 0.5, selected: false},
      {text: 'X1',  value: 1, selected: true},
      {text: 'X2',  value: 2, selected: false},
      {text: 'X3', value: 3, selected: false},
      {text: 'X5', value: 5, selected: false},
    ]
  },
};