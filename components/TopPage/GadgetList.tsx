import React from 'react'
import { MuuriComponent } from 'muuri-react'

import styled from 'styled-components'
import List from '../List'
import Katinko from '../Katinko'
import Clock from '../Clock'
import Stopwatch from '../Stopwatch'
import Timer from '../Timer'
import Yomiage from '../Yomiage'
import Color from '../Color'

const components = [
  <List key={'gadget-list'} />,
  <Katinko key={'gadget-katinko'} />,
  <Clock key={'gadget-clock'} />,
  <Stopwatch key={'gadget-stopwatch'} />,
  <Timer key={'gadget-timer'} />,
  <Yomiage key={'gadget-yomiage'} />,
  <Color key={'gadget-color'} />,
]

const GadgetCard = styled.div`
  width: 300px;
  height: 200px;
  border: solid 1px #2b0065;
  border-radius: 4px;
  padding: 8px;
  margin: 8px;
`

function GadgetList() {
  return (
    <MuuriComponent dragEnabled={false}>
      {components.map((comp) => (
        <GadgetCard key={comp.key}>{comp}</GadgetCard>
      ))}
    </MuuriComponent>
  )
}
export default GadgetList
