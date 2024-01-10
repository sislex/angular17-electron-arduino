import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { AccountMenuComponent} from './account-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<AccountMenuComponent> = {
  title: 'UI Components/AccountMenuComponent',
  component: AccountMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: AccountMenuComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<AccountMenuComponent>;

export const Primary: Story = {
  args: {
  }
}