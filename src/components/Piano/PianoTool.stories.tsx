import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import PianoTool from './PianoTool'

type Props = ComponentProps<typeof PianoTool>
export default {
  title: 'PianoTool',
  component: PianoTool,
  args: {},
  parameters: {},
  decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (_args) => <PianoTool />
