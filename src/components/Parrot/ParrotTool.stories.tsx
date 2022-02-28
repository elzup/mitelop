import { Meta, Story } from '@storybook/react'
import { decorators } from '../SizeDiv'
import ParrotTool from './ParrotTool'

type Props = Parameters<typeof ParrotTool>
export default {
  title: 'ParrotTool',
  component: ParrotTool,
  parameters: {},
  decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (_args) => <ParrotTool />
