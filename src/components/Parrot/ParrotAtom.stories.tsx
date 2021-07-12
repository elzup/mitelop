import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { DefaultSizeGadget, SizeSmall } from '../SizeDiv'
import ParrotAtom from './ParrotAtom'

type Props = ComponentProps<typeof ParrotAtom>
export default {
  title: 'ParrotAtom',
  component: ParrotAtom,
  args: {
    timeStr: '12',
    timeMilliStr: '987',
    total: 100 * 1000,
    progress: 12,
    status: 'run',
  },

  decorators: [
    (Story) => (
      <DefaultSizeGadget>
        <Story />
      </DefaultSizeGadget>
    ),
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <ParrotAtom {...args} />
export const Small = Base.bind({})
Small.decorators = [
  (Story) => (
    <SizeSmall>
      <Story />
    </SizeSmall>
  ),
]
