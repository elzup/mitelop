import { Meta, Story } from '@storybook/react'
import { DefaultSizeGadget } from '../SizeDiv'
import MidokoroAtom from './MidokoroAtom'

type Props = Parameters<typeof MidokoroAtom>[0]
export default {
  title: 'Midokoro',
  component: MidokoroAtom,
  args: {
    config: {},
    plots: [
      { id: '1', rate: 10, label: 'A' },
      { id: '2', rate: 30, label: 'B' },
    ],
    progressRate: 80,
  },

  decorators: [
    (Story) => (
      <DefaultSizeGadget>
        <Story />
      </DefaultSizeGadget>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta<Props>

export const Base: Story<Props> = (args) => <MidokoroAtom {...args} />
