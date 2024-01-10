import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {InfoComponent} from './info.component';
import { MatGridListModule } from '@angular/material/grid-list';


const meta: Meta<InfoComponent> = {
  title: 'UI Components/InfoComponent',
  component: InfoComponent,
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: InfoComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<InfoComponent>;

export const Primary: Story = {
  args: {
    title: 'Информация о виджете',
    info: [{prop: 'Свойство' , descrip: 'описание'}],
    },
};
export const Acc: Story = {
  args: {
    title: 'Информация об устройстве',
    info: [{prop: 'Главная' , descrip: 'описание'}],
    },
};

// Устройство
// Тип
// название
// Доступные функции
// дата выпуска
// совместимость
// набор комманд
// комплектующие
// Версия - number 
// уникальный номер 
// Последнее обновление
// Сосиояние памяти
// Время с начала последнего сеанса


// Виджет
// Версия 
// Последнее обновление