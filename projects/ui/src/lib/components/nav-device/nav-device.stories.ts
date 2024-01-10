import {argsToTemplate, componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {NavDeviceComponent} from './nav-device.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';


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
      events: action('emitter'),
    },
    template: `
        <nav-device ${argsToTemplate(args)} (emitter)="events($event)"></nav-device>
`,
  }),
};

export default meta;
type Story = StoryObj<NavDeviceComponent>;

export const Primary: Story = {
  args: {
    message: 'message123',
  },
};
