import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import ClockAtom from './ClockAtom'

type Props = ComponentProps<typeof ClockAtom>
export default {
  title: 'ClockAtom',
  component: ClockAtom,
  args: {
    config: { bgColor: '#000', fontColor: '#ddd', dateVisible: true },
    dateStr: '2999-01-01',
    tStrs: ['12', '34', '56'],
    progressRate: 80,
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <ClockAtom {...args} />
Base.decorators = decorators

export const Color = Base.bind({})
Color.args = {
  ...Base.args,
  config: { bgColor: '#ee0000', fontColor: '#ddd', dateVisible: true },
  dateStr: '2999-01-01',
  tStrs: ['12', '34', '56'],
}
Color.decorators = decorators

export const DateUnvisible = Base.bind({})
DateUnvisible.args = {
  ...Base.args,
  config: { bgColor: '#aaa', fontColor: '#ddd', dateVisible: false },
}
DateUnvisible.decorators = decorators

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators