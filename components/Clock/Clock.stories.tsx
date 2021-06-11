import { Meta } from '@storybook/react'
import React from 'react'
import {
  GridH,
  GridL,
  GridS,
  GridV,
  MultiSizeGrid,
  SizeDiv,
  SizeHori,
  SizeLarge,
  SizeSmall,
  SizeVert,
} from '../SizeDiv'
import Clock from '.'

export default {
  title: 'Clock',
  component: Clock,
} as Meta

export const ClockBase = () => (
  <MultiSizeGrid>
    <GridS>
      <Clock />
    </GridS>
    <GridL>
      <Clock />
    </GridL>
    <GridV>
      <Clock />
    </GridV>
    <GridH>
      <Clock />
    </GridH>
  </MultiSizeGrid>
)

ClockBase.args = {
  label: 'Clock',
}
