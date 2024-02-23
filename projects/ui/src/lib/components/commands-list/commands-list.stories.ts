import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {CommandsListComponent} from './commands-list.component';
import { MatGridListModule } from '@angular/material/grid-list';


const meta: Meta<CommandsListComponent> = {
  title: 'UI Components/CommandsListComponent',
  component: CommandsListComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: CommandsListComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<CommandsListComponent>;

export const Primary: Story = {
  args: {
    // commandsList: [{name: 'name1', event: 'event1'}, {name: 'name1', data: 'event123123123'}]
    },
};