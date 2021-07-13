import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import ChecksAtom from './ChecksAtom'

const text = `alice
bob
charlie

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
  decorators,
} as Meta<Props>

export const Base: Story<Props> = (args) => <ChecksAtom {...args} />

export const Empty = Base.bind({})
Empty.args = { config: { text: '', checks: ['bob'], layout: 'horizontal' } }

export const Vertical = Base.bind({})
Empty.args = { config: { text, checks: ['bob'], layout: 'vertical' } }

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators
