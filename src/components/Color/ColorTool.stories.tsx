import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import ColorTool from './ColorTool'

type Props = ComponentProps<typeof ColorTool>
export default {
  title: 'ColorTool',
  component: ColorTool,
  args: {},

  decorators: decorators(),
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (_args) => <ColorTool />
