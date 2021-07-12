import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import MidokoroAtom from './MidokoroAtom'

type Props = ComponentProps<typeof MidokoroAtom>
export default {
  title: 'MidokoroAtom',
  component: MidokoroAtom,
  args: {
    config: {},
    prevs: [
      {
        label: '08:',
        plots: [
          { id: '1', rate: 20, label: '08A' },
          { id: '2', rate: 55, label: '08B' },
        ],
      },
      {
        label: '09:',
        plots: [],
      },
      {
        label: '10:',
        plots: [
          { id: '1', rate: 10, label: 'A' },
          { id: '2', rate: 30, label: 'B' },
        ],
      },
    ],

    current: {
      label: '11:',
      plots: [
        { id: '1', rate: 10, label: 'A' },
        { id: '2', rate: 30, label: 'B' },
      ],
    },
    progressRate: 80,
  },

  decorators,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta<Props>

export const Base: Story<Props> = (args) => <MidokoroAtom {...args} />
