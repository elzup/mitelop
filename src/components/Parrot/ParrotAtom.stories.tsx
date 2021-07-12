import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, SizeSmall } from '../SizeDiv'
import ParrotAtom from './ParrotAtom'

type Props = ComponentProps<typeof ParrotAtom>
export default {
  title: 'ParrotAtom',
  component: ParrotAtom,
  args: {
    config: { pitch: 1.0, rate: 1.0 },
  },
  decorators,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <ParrotAtom {...args} />
export const Small = Base.bind({})
Small.decorators = [
  (Story) => (
    <SizeSmall>
      <Story />
    </SizeSmall>
  ),
]
