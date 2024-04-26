import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import IntervalTool from './IntervalTool'

type Props = ComponentProps<typeof IntervalTool>
export default {
  title: 'IntervalTool',
  component: IntervalTool,
  args: {},
  parameters: {},
  decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (_args) => <IntervalTool />
