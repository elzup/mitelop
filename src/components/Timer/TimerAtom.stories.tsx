import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, SizeSmall } from '../SizeDiv'
import TimerAtom from './TimerAtom'

type Props = ComponentProps<typeof TimerAtom>
export default {
  title: 'TimerAtom',
  component: TimerAtom,
  args: {
    timeStr: '12',
    timeMilliStr: '987',
    total: 100 * 1000,
    progress: 12,
    startTime: 1100,
    status: 'pause',
  },

  decorators: decorators(),
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <TimerAtom {...args} />

export const Run = Base.bind({})
Run.args = { status: 'run' }

export const End = Base.bind({})
End.args = { status: 'end', timeStr: '0', timeMilliStr: '000' }

export const Small = Base.bind({})
Small.decorators = [
  (Story) => (
    <SizeSmall>
      <Story />
    </SizeSmall>
  ),
]
