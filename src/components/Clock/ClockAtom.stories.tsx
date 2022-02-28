import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import ClockAtom from './ClockAtom'

type Props = ComponentProps<typeof ClockAtom>
export default {
  title: 'ClockAtom',
  component: ClockAtom,
  args: {
    config: {
      bgColor: '#000',
      fontColor: '#ddd',
      dateVisible: true,
      diffMinutes: 0,
    },
    dateStr: '2999-01-01',
    tStrs: ['12', '34', '56'],
    progressRate: 80,
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <ClockAtom {...args} />

export const Color = Base.bind({})
Color.args = {
  ...Base.args,
  config: {
    bgColor: '#ee0000',
    fontColor: '#ddd',
    dateVisible: true,
    diffMinutes: 0,
  },
  dateStr: '2999-01-01',
  tStrs: ['12', '34', '56'],
}

export const DateUnvisible = Base.bind({})
DateUnvisible.args = {
  ...Base.args,
  config: {
    bgColor: '#aaa',
    fontColor: '#ddd',
    dateVisible: false,
    diffMinutes: 0,
  },
}
