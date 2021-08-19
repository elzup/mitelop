import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import MirrorTool from './MirrorTool'

type Props = ComponentProps<typeof MirrorTool>
export default {
  title: 'MirrorTool',
  component: MirrorTool,
  args: {},
  parameters: {},
  decorators,
} as Meta<Props>

export const Base: Story<Props> = (_args) => <MirrorTool />
