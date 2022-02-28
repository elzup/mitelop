import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import StopwatchTool from './StopwatchTool'

type Props = ComponentProps<typeof StopwatchTool>
export default {
  title: 'StopwatchTool',
  component: StopwatchTool,
  args: {},
  parameters: {},
  decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (_args) => <StopwatchTool />
