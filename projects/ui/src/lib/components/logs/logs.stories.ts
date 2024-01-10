import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {LogsComponent} from './logs.component';
import { MatGridListModule } from '@angular/material/grid-list';


const meta: Meta<LogsComponent> = {
  title: 'UI Components/LogsComponent',
  component: LogsComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: LogsComponent) => ({
    props: {
      ...args, 
    },
    template: `
        <logs [stateLog]="stateLog"></logs>
`,
// или <logs [stateLog]="args.stateLog"></logs>
// <logs ${argsToTemplate(args)}"></logs> - такая конструкция у меня не работает, выдает ошибку вроде неизвестно что такое argsToTemplate
  }),
};

export default meta;
type Story = StoryObj<LogsComponent>;

export const Primary: Story = {
  args: {
    stateLog: [
    {num: 1, direction: 'in', log: 'first log', date: '11.11.11'}, 
    {num: 3, direction: 'out', log: 'first log', date: '11.11.11'}, 
    {num: 2, direction: 'in', log: 'first log', date: '11.11.11'},
  ]
    },
};





