import { MuuriComponent } from 'muuri-react'
import React from 'react'
import Clock from '../Clock'
import Color from '../Color'
import Katinko from '../Katinko'
import CheckList from '../CheckList'
import Stopwatch from '../Stopwatch'
import Timer from '../Timer'
import Yomiage from '../Yomiage'
import Midokoro from '../Midokoro'
import GadgetCard from './GadgetCard'

const components = [
  <GadgetCard key={'gad-checklist'} icon={'checklist'} title="CheckList">
    <CheckList />
  </GadgetCard>,
  <GadgetCard key={'gad-katinko'} icon={'movie'} title="Katinko">
    <Katinko />
  </GadgetCard>,
  <GadgetCard key={'gad-clock'} icon={'schedule'} title="Clock">
    <Clock />
  </GadgetCard>,
  <GadgetCard key={'gad-sw'} icon={'timer'} title="StopWatch">
    <Stopwatch />
  </GadgetCard>,
  <GadgetCard key={'gad-timer'} icon={'hourglass_empty'} title="Timer">
    <Timer />
  </GadgetCard>,
  <GadgetCard key={'gad-yomiage'} icon={'speaker'} title="Yomiage">
    <Yomiage />
  </GadgetCard>,
  <GadgetCard key={'gad-color'} icon={'palette'} title="Color">
    <Color />
  </GadgetCard>,
  <GadgetCard key={'gad-midokoro'} icon={'assessment'} title="Midokoro">
    <Midokoro />
  </GadgetCard>,
]

function GadgetList() {
  return <MuuriComponent dragEnabled={false}>{components}</MuuriComponent>
}
export default GadgetList
