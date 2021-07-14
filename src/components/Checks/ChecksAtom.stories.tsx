import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import ChecksAtom from './ChecksAtom'

const text = `alice
bob
チャーリー

eugene
`

type Props = ComponentProps<typeof ChecksAtom>
export default {
  title: 'ChecksAtom',
  component: ChecksAtom,
  args: {
    config: { text, checks: ['bob'], layout: 'horizontal' },
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <ChecksAtom {...args} />
Base.decorators = decorators

export const Empty = Base.bind({})
Empty.args = { config: { text: '', checks: ['bob'], layout: 'horizontal' } }
Empty.decorators = decorators

export const Vertical = Base.bind({})
Vertical.args = { config: { text, checks: ['bob'], layout: 'vertical' } }
Vertical.decorators = decorators

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators
