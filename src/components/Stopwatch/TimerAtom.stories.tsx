import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { DefaultSizeGadget, SizeSmall } from '../SizeDiv'
import StopwatchAtom from './StopwatchAtom'

type Props = ComponentProps<typeof StopwatchAtom>
export default {
  title: 'StopwatchAtom',
  component: StopwatchAtom,
  args: {
    timeStr: '0',
    timeMilliStr: '0',
    status: 'init',
    startTime: 0,
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

export const Base: Story<Props> = (args) => <StopwatchAtom {...args} />

export const Run = Base.bind({})
Run.args = { status: 'run' }

export const Pause = Base.bind({})
Pause.args = { status: 'pause', timeStr: '12', timeMilliStr: '987' }

export const Small = Base.bind({})
Small.decorators = [
  (Story) => (
    <SizeSmall>
      <Story />
    </SizeSmall>
  ),
]
