import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { TargetsListComponent } from './targets-list.component';

const meta: Meta<TargetsListComponent> = {
  title: 'UI Components/TargetsListComponent',
  component: TargetsListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: TargetsListComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<TargetsListComponent>;

export const Primary: Story = {
  args: {
    // message: 'Шаги',
    // buttons: [
    //   {text: '1', data: 1, selected: false},
    //   {text: '10', data: 10, selected: false},
    //   {text: '50', data: 50, selected: false},
    //   {text: '100', data: 100, selected: true},
    //   {text: '200', data: 200, selected: false},
    // ],
  },
};