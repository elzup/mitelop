import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { DefaultSizeGadget } from '../SizeDiv'
import ColorTool from './ColorTool'

type Props = ComponentProps<typeof ColorTool>
export default {
  title: 'ColorTool',
  component: ColorTool,
  args: {},

  decorators: [
    (Story) => (
      <DefaultSizeGadget>
        <Story />
      </DefaultSizeGadget>
    ),
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (_args) => <ColorTool />
