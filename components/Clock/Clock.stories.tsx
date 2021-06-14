import { Meta } from '@storybook/react'
import React from 'react'
import { GridH, GridL, GridS, GridV, MultiSizeGrid } from '../SizeDiv'
import ClockTool from '.'
import ClockAtom from './ClockAtom'

export default {
  title: 'Clock',
  component: ClockTool,
} as Meta

export const ClockBase = () => (
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

export const ClockConfigs = () => (
  <div style={{ display: 'grid' }}>
    <div style={{ width: '200px', height: '150px' }}>
      <ClockAtom
        config={{ bgColor: '#000', fontColor: '#ddd', dateVisible: true }}
        dateStr={'2999-01-01'}
        tStrs={['12', '34', '56']}
        maxWidth={400}
      />
    </div>
    <div style={{ width: '200px', height: '150px' }}>
      <ClockAtom
        config={{ bgColor: '#ee0000', fontColor: '#ddd', dateVisible: false }}
        dateStr={'2999-01-01'}
        tStrs={['12', '34', '56']}
        maxWidth={400}
      />
    </div>
  </div>
)

ClockBase.args = {
  label: 'Clock',
}
