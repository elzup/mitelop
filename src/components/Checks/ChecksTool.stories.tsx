import { Meta } from '@storybook/react'
import React from 'react'
import { GridH, GridL, GridS, GridV, MultiSizeGrid } from '../SizeDiv'
import ChecksTool from './ChecksTool'

export default {
  title: 'ChecksTool',
  component: ChecksTool,
} as Meta
export const ClockBase = () => (
  <MultiSizeGrid>
    <GridH>
      <ChecksTool />
    </GridH>
  </MultiSizeGrid>
)

export const ClockSize = () => (
  <MultiSizeGrid>
    <GridS>
      <ChecksTool />
    </GridS>
    <GridL>
      <ChecksTool />
    </GridL>
    <GridV>
      <ChecksTool />
    </GridV>
    <GridH>
      <ChecksTool />
    </GridH>
  </MultiSizeGrid>
)
