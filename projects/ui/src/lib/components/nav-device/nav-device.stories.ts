import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {NavDeviceComponent} from './nav-device.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const meta: Meta<NavDeviceComponent> = {
  title: 'UI Components/NavDeviceComponent',
  component: NavDeviceComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: NavDeviceComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<NavDeviceComponent>;

export const Primary: Story = {
  args: {
  },
};
