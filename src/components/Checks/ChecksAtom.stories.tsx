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
    config: { text, checks: ['bob'], layout: 'horizontal', fontSize: 20 },
    setConfig: () => {},
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
} as Meta<Props>

export const Base: Story<Props> = (args) => <ChecksAtom {...args} />
Base.decorators = decorators()

export const Empty = Base.bind({})
Empty.args = {
  config: { text: '', checks: ['bob'], layout: 'horizontal', fontSize: 20 },
}
Empty.decorators = decorators()

export const Vertical = Base.bind({})
Vertical.args = {
  config: { text, checks: ['bob'], layout: 'vertical', fontSize: 20 },
}
Vertical.decorators = decorators()

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators()
