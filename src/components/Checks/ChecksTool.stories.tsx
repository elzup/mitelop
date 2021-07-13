import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import ChecksTool from './ChecksTool'

type Props = ComponentProps<typeof ChecksTool>

export default {
  title: 'ChecksTool',
  component: ChecksTool,
  args: {},
} as Meta<Props>

export const Base: Story<Props> = (_args) => <ChecksTool />
Base.decorators = decorators

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators
