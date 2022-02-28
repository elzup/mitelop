import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import PianoAtom from './PianoAtom'

type Props = ComponentProps<typeof PianoAtom>
export default {
  title: 'PianoAtom',
  component: PianoAtom,
  args: {},
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <PianoAtom {...args} />
Base.decorators = decorators()
