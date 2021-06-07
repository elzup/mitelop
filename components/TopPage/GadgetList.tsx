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
import GadgetCard from './GadgetCard'

const components = [
  <GadgetCard key={'gad-list'} icon={'list'} title="List">
    <List />
  </GadgetCard>,
  <GadgetCard key={'gad-katinko'} icon={'movie'} title="Katinko">
    <Katinko key={'gad-katinko'} />
  </GadgetCard>,
  <GadgetCard key={'gad-clock'} icon={'schedule'} title="Clock">
    <Clock />
  </GadgetCard>,
  <GadgetCard key={'gad-sw'} icon={'timer'} title="StopWatch">
    <Stopwatch />
  </GadgetCard>,
  <GadgetCard key={'gad-timer'} icon={'timer'} title="Timer">
    <Timer />
  </GadgetCard>,
  <GadgetCard key={'gad-yomiage'} icon={'speaker'} title="Yomiage">
    <Yomiage />
  </GadgetCard>,
  <GadgetCard key={'gad-color'} icon={'palette'} title="Color">
    <Color />
  </GadgetCard>,
]

function GadgetList() {
  return <MuuriComponent dragEnabled={false}>{components}</MuuriComponent>
}
export default GadgetList
