import { Meta, Story } from '@storybook/react'
import MidokoroAtom from './MidokoroAtom'

export default {
  title: 'Midokoro',
  component: MidokoroAtom,
  args: {
    config: {},
    plots: [{ rate: 10 }, { rate: 50 }],
    progressRate: 80,
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta

export const Base: Story<Parameters<typeof MidokoroAtom>[0]> = (args) => (
  <MidokoroAtom {...args} />
)
