import { Meta, Story } from '@storybook/react'
import { decorators } from '../SizeDiv'
import MidokoroTool from './MidokoroTool'

type Props = Parameters<typeof MidokoroTool>
export default {
  title: 'MidokoroTool',
  component: MidokoroTool,
  parameters: {},
  decorators,
} as Meta<Props>

export const Base: Story<Props> = (_args) => <MidokoroTool />
