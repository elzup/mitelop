import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import StopwatchAtom from './StopwatchAtom'

type Props = ComponentProps<typeof StopwatchAtom>
export default {
  title: 'StopwatchAtom',
  component: StopwatchAtom,
  args: {
    timeStr: '10:10:10',
    timeMilliStr: '000',
    status: 'pause',
    startTime: 0,
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <StopwatchAtom {...args} />
Base.decorators = decorators()

export const Run = Base.bind({})
Run.args = { status: 'run' }
Run.decorators = decorators()

export const Init = Base.bind({})
Init.args = { status: 'init', timeStr: '0', timeMilliStr: '0' }
Init.decorators = decorators()

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators()
