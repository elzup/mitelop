import { MuuriComponent } from 'muuri-react'
import React from 'react'
import CheckList from '../CheckList'
import Clock from '../Clock/ClockTool'
import ColorTool from '../Color/ColorTool'
import Katinko from '../Katinko'
import Midokoro from '../Midokoro/MidokoroTool'
import StopwatchTool from '../Stopwatch/StopwatchTool'
import TimerTool from '../Timer/TimerTool'
import ParrotTool from '../Parrot/ParrotTool'
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
  <GadgetCard key={'gad-clock'} icon={'schedule'} title="Clock" path="/clock">
    <Clock />
  </GadgetCard>,
  <GadgetCard
    key={'gad-stopwatch'}
    icon={'timer'}
    title="StopWatch"
    path="/stopwatch"
  >
    <StopwatchTool />
  </GadgetCard>,
  <GadgetCard
    key={'gad-timer'}
    icon={'hourglass_empty'}
    title="Timer"
    path="/timer"
  >
    <TimerTool />
  </GadgetCard>,
  <GadgetCard key={'gad-parrot'} icon={'speaker'} title="Parrot" path="/parrot">
    <ParrotTool />
  </GadgetCard>,
  <GadgetCard key={'gad-color'} icon={'palette'} title="Color" path="/color">
    <ColorTool />
  </GadgetCard>,
  <GadgetCard
    key={'gad-midokoro'}
    icon={'assessment'}
    title="Midokoro"
    path="/midokoro"
  >
    <Midokoro />
    <GadgetCard
      key={'gad-katinko'}
      icon={'movie'}
      title="Katinko"
      path="/katinko"
    >
      <Katinko />
    </GadgetCard>
    ,
  </GadgetCard>,
]

function GadgetList() {
  return <MuuriComponent dragEnabled={false}>{components}</MuuriComponent>
}
export default GadgetList
