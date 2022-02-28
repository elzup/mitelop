import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { compDecorators as decorators } from '../SizeDiv'
import RulerAtom from './RulerAtom'

type Props = ComponentProps<typeof RulerAtom>
export default {
  title: 'RulerAtom',
  component: RulerAtom,
  args: { origin: 'UL', unit: 'px' },
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<Props>

export const Base: Story<Props> = (args) => <RulerAtom {...args} />
Base.decorators = decorators()

export const OriginCenter = Base.bind({})
OriginCenter.args = { origin: 'center' }
OriginCenter.decorators = decorators()

export const OriginDR = Base.bind({})
OriginDR.args = { origin: 'DR' }
OriginDR.decorators = decorators()

export const Parsent100 = Base.bind({})
Parsent100.args = { unit: '%' }
Parsent100.decorators = decorators()
