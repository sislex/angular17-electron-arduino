import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {SpeedControlComponent} from './speed-control.component';
import { ControlButtonsComponent } from '../control-buttons/control-buttons.component';

const meta: Meta<SpeedControlComponent> = {
  title: 'UI Components/SpeedControlComponent',
  component: SpeedControlComponent,
  decorators: [
    moduleMetadata({
      imports: [ControlButtonsComponent],
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
      {text: 'X0,25',  speed: 0.25, selected: false},
      {text: 'X0,5',  speed: 0.5, selected: false},
      {text: 'X1',  speed: 1, selected: true},
      {text: 'X2',  speed: 2, selected: false},
      {text: 'X3', speed: 3, selected: false},
      {text: 'X5', speed: 5, selected: false},
    ]
  },
};