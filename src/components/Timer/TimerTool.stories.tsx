import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { DefaultSizeGadget } from '../SizeDiv'
import TimerTool from './TimerTool'

type Props = ComponentProps<typeof TimerTool>
export default {
  title: 'TimerTool',
  component: TimerTool,
  args: {},
  parameters: {},
  decorators: [
    (Story) => (
      <DefaultSizeGadget>
        <Story />
      </DefaultSizeGadget>
    ),
  ],
} as Meta<Props>

export const Base: Story<Props> = (_args) => <TimerTool />
