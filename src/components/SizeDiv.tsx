import { BaseDecorators } from '@storybook/addons'
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'
import { Component } from 'react'
import { defaultProps } from 'recompose'
import styled from 'styled-components'

type HwProps = {
  w: string
  h: string
}
export const SizeDiv = styled.div<HwProps>`
  border: solid 1px;
  width: ${(p) => p.w};
  height: ${(p) => p.h};
`

const ls = '640px'
const sm = '200px'
const md = '300px'

export const SizeSmall = defaultProps({ w: md, h: sm })(SizeDiv)
export const SizeVert = defaultProps({ w: ls, h: sm })(SizeDiv)
export const SizeHori = defaultProps({ w: sm, h: ls })(SizeDiv)
export const SizeLarge = defaultProps({ w: ls, h: ls })(SizeDiv)
export const MultiSizeGrid = styled.div`
  display: grid;
  width: 80%;
  height: 80vw;
  gap: 8px;
  grid-template-columns: 80% 20%;
  grid-template-rows: 20% 80%;
  grid-template-areas:
    'h s'
    'l v';
  > div {
    border: solid 1px;
  }
`

export const GridS = styled.div`
  grid-area: s;
`
export const GridL = styled.div`
  grid-area: l;
`
export const GridV = styled.div`
  grid-area: v;
`
export const GridH = styled.div`
  grid-area: h;
`

export const DefaultSizeGadget = styled.div`
  width: 400px;
  height: 300px;
  border: gray solid 1px;
`

export const decorators: BaseDecorators<StoryFnReactReturnType> = [
  (Story) => (
    <DefaultSizeGadget>
      <Story />
    </DefaultSizeGadget>
  ),
]
