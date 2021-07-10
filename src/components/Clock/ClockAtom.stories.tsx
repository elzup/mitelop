import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { DefaultSizeGadget } from '../SizeDiv'
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

  decorators: [
    (Story) => (
      <DefaultSizeGadget>
        <Story />
      </DefaultSizeGadget>
    ),
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <ClockAtom {...args} />

export const ColorClock = Base.bind({})
ColorClock.args = {
  ...Base.args,
  config: { bgColor: '#ee0000', fontColor: '#ddd', dateVisible: true },
  dateStr: '2999-01-01',
  tStrs: ['12', '34', '56'],
}

export const DateUnvisible = Base.bind({})
DateUnvisible.args = {
  ...Base.args,
  config: { bgColor: '#aaa', fontColor: '#ddd', dateVisible: false },
}
