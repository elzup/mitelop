import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { compDecorators as decorators } from '../SizeDiv'
import RulerTool from './RulerTool'

type Props = ComponentProps<typeof RulerTool>
export default {
  title: 'RulerTool',
  component: RulerTool,
  args: {},
  parameters: {},
  decorators,
} as Meta<Props>

export const Base: Story<Props> = (_args) => <RulerTool />

export const Tile1 = Base.bind({})
Tile1.args = {}
Tile1.decorators = [
  (Story) => (
    <div style={{ width: '100px', height: '100px' }}>
      <Story />
    </div>
  ),
]
