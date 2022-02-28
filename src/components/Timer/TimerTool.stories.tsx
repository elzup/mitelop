import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import TimerTool from './TimerTool'

type Props = ComponentProps<typeof TimerTool>
export default {
  title: 'TimerTool',
  component: TimerTool,
  args: {},
  parameters: {},
  decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (_args) => <TimerTool />
