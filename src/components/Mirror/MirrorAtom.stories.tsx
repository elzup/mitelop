import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import MirrorAtom from './MirrorAtom'

type Props = ComponentProps<typeof MirrorAtom>
export default {
  title: 'MirrorAtom',
  component: MirrorAtom,
  args: {
    allowed: true,
    flipped: true,
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <MirrorAtom {...args} />
Base.decorators = decorators

export const BeforeAllow = Base.bind({})
BeforeAllow.args = { allowed: false }
BeforeAllow.decorators = [
  (Story) => (
    <div style={{ width: '400px', height: '200px' }}>
      <Story />
    </div>
  ),
]

export const Flipped = Base.bind({})
Flipped.args = { flipped: false }
Flipped.decorators = decorators

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators
