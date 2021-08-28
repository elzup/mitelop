import { Meta, Story } from '@storybook/react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import CounterTool from './CounterTool'

const meta: Meta = {
  title: 'CounterTool',
  component: CounterTool,
}

export default meta

export const Base: Story = () => <CounterTool />
Base.decorators = decorators

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators
