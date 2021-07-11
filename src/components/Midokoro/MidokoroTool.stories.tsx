import { Meta, Story } from '@storybook/react'
import { DefaultSizeGadget } from '../SizeDiv'
import MidokoroTool from '.'

type Props = Parameters<typeof MidokoroTool>
export default {
  title: 'MidokoroTool',
  component: MidokoroTool,
  parameters: {},
  decorators: [
    (Story) => (
      <DefaultSizeGadget>
        <Story />
      </DefaultSizeGadget>
    ),
  ],
} as Meta<Props>

export const Base: Story<Props> = (_args) => <MidokoroTool />
