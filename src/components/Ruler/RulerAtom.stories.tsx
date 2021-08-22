import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import RulerAtom from './RulerAtom'

type Props = ComponentProps<typeof RulerAtom>
export default {
  title: 'RulerAtom',
  component: RulerAtom,
  args: {},
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <RulerAtom {...args} />
Base.decorators = decorators

// export const Base2 = Base.bind({})
// Base2.args = { allowed: false }
// Base2.decorators = decorators
