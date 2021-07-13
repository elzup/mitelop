import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import { decorators, multiSizeDecorators } from '../SizeDiv'
import ClockTool from './ClockTool'

type Props = ComponentProps<typeof ClockTool>

export default {
  title: 'ClockTool',
  component: ClockTool,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (_args) => <ClockTool />
Base.decorators = decorators

export const Size = Base.bind({})
Size.decorators = multiSizeDecorators
