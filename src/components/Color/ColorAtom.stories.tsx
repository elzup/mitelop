import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { decorators } from '../SizeDiv'
import ColorAtom from './ColorAtom'

type Props = ComponentProps<typeof ColorAtom>
export default {
  title: 'ColorAtom',
  component: ColorAtom,
  args: {
    config: { color: '#aa33aa' },
  },
  decorators: decorators(),
} as Meta<Props>

export const Base: Story<Props> = (args) => <ColorAtom {...args} />

export const OrangeColor = Base.bind({})
OrangeColor.args = {
  ...Base.args,
  config: { color: '#aaaa00' },
}
