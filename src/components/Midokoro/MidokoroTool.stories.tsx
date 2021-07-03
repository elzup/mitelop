import { Meta, Story } from '@storybook/react'
import MidokoroTool from '.'

export default {
  title: 'MidokoroTool',
  component: MidokoroTool,
  args: {},
  parameters: {},
} as Meta

export const Base: Story<Parameters<typeof MidokoroTool>[0]> = (_args) => (
  <MidokoroTool />
)
