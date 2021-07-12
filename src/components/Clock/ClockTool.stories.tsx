import { Meta } from '@storybook/react'
import React from 'react'
import { GridH, GridL, GridS, GridV, MultiSizeGrid } from '../SizeDiv'
import ClockTool from './ClockTool'

export default {
  title: 'ClockTool',
  component: ClockTool,
} as Meta
export const ClockBase = () => (
  <MultiSizeGrid>
    <GridH>
      <ClockTool />
    </GridH>
  </MultiSizeGrid>
)

export const ClockSize = () => (
  <MultiSizeGrid>
    <GridS>
      <ClockTool />
    </GridS>
    <GridL>
      <ClockTool />
    </GridL>
    <GridV>
      <ClockTool />
    </GridV>
    <GridH>
      <ClockTool />
    </GridH>
  </MultiSizeGrid>
)
