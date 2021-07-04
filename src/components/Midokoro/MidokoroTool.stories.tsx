import { Meta, Story } from '@storybook/react'
import { DefaultSizeGadget } from '../SizeDiv'
import MidokoroTool from '.'

export default {
  title: 'MidokoroTool',
  component: MidokoroTool,
  args: {},
  parameters: {},
  decorators: [
    (Story) => (
      <DefaultSizeGadget>
        <Story />
      </DefaultSizeGadget>
    ),
  ],
} as Meta

export const Base: Story<Parameters<typeof MidokoroTool>[0]> = (_args) => (
  <MidokoroTool />
)
