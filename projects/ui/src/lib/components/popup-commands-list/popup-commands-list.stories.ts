import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {PopupCommandsListComponent} from './popup-commands-list.component';


const meta: Meta<PopupCommandsListComponent> = {
  title: 'UI Components/PopupCommandsListComponent',
  component: PopupCommandsListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: PopupCommandsListComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<PopupCommandsListComponent>;

export const Primary: Story = {
  args: {
    },
};