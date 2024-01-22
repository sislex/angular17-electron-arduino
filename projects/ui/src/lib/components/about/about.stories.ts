import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { AboutComponent} from './about.component';

const meta: Meta<AboutComponent> = {
  title: 'UI Components/AboutComponent',
  component: AboutComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: AboutComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<AboutComponent>;

export const Primary: Story = {
  args: { about: [
    {name: 'name', description: 'nam'}, 
    {name: 'description', description: 'descr'}, 
    {name: 'date-create', description: '22.01.2024'}, 
    {name: 'vers', description: '1.0'}
    ],
    title: 'WIDGET'
  }
}