import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import RulerTool from './RulerTool'

type Props = ComponentProps<typeof RulerTool>
export default {
  title: 'RulerTool',
  component: RulerTool,
  args: {},
  parameters: {},
  decorators,
} as Meta<Props>

export const Base: Story<Props> = (_args) => <RulerTool />
