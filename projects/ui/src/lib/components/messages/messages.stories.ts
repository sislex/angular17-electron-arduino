import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {MessagesComponent} from './messages.component';
import { MatGridListModule } from '@angular/material/grid-list';


const meta: Meta<MessagesComponent> = {
  title: 'UI Components/MessagesContainerComponent',
  component: MessagesComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: MessagesComponent) => ({
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
type Story = StoryObj<MessagesComponent>;

export const Primary: Story = {
  args: {
  //   stateLog: [
  //   {direction: true, message: {event: 'first log', data:'asdq'}, timestamp: '11.11.11'}, 
  //   {direction: false, message: {event: 'second log', data:'asdq'}, timestamp: '11.11.11'}, 
  //   {direction: true, message: {event: 'third log', data:'asdq'}, timestamp: '11.11.11'},
  // ]
    },
};





