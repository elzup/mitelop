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
  <GadgetCard
    key={'gad-checklist'}
    icon={'checklist'}
    title="CheckList"
    path="/list"
  >
    <CheckList />
  </GadgetCard>,
  <GadgetCard
    key={'gad-katinko'}
    icon={'movie'}
    title="Katinko"
    path="/katinko"
  >
    <Katinko />
  </GadgetCard>,
  <GadgetCard key={'gad-clock'} icon={'schedule'} title="Clock" path="/clock">
    <Clock />
  </GadgetCard>,
  <GadgetCard
    key={'gad-stopwatch'}
    icon={'timer'}
    title="StopWatch"
    path="/stopwatch"
  >
    <Stopwatch />
  </GadgetCard>,
  <GadgetCard
    key={'gad-timer'}
    icon={'hourglass_empty'}
    title="Timer"
    path="/timer"
  >
    <Timer />
  </GadgetCard>,
  <GadgetCard
    key={'gad-yomiage'}
    icon={'speaker'}
    title="Yomiage"
    path="/yomiage"
  >
    <Yomiage />
  </GadgetCard>,
  <GadgetCard key={'gad-color'} icon={'palette'} title="Color" path="/color">
    <Color />
  </GadgetCard>,
  <GadgetCard
    key={'gad-midokoro'}
    icon={'assessment'}
    title="Midokoro"
    path="/midokoro"
  >
    <Midokoro />
  </GadgetCard>,
]

function GadgetList() {
  return <MuuriComponent dragEnabled={false}>{components}</MuuriComponent>
}
export default GadgetList
