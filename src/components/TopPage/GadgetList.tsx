import { MuuriComponent } from 'muuri-react'
import React, { ComponentProps } from 'react'
import ChecksTool from '../Checks/ChecksTool'
import Clock from '../Clock/ClockTool'
import ColorTool from '../Color/ColorTool'
import Katinko from '../Katinko'
import Midokoro from '../Midokoro/MidokoroTool'
import StopwatchTool from '../Stopwatch/StopwatchTool'
import TimerTool from '../Timer/TimerTool'
import ParrotTool from '../Parrot/ParrotTool'
import GadgetCard from './GadgetCard'

type GadgetProp = ComponentProps<typeof GadgetCard> & { key: string }
const gadgets: GadgetProp[] = [
  {
    key: 'gad-checks',
    icon: 'checklist',
    title: 'Checks',
    path: '/checks',
    children: <ChecksTool />,
  },
  {
    key: 'gad-clock',
    icon: 'schedule',
    title: 'Clock',
    path: '/clock',
    children: <Clock />,
  },
  {
    key: 'gad-stopwatch',
    icon: 'timer',
    title: 'StopWatch',
    path: '/stopwatch',
    children: <StopwatchTool />,
  },
  {
    key: 'gad-timer',
    icon: 'hourglass_empty',
    title: 'Timer',
    path: '/timer',
    children: <TimerTool />,
  },
  {
    key: 'gad-parrot',
    icon: 'speaker',
    title: 'Parrot',
    path: '/parrot',
    children: <ParrotTool />,
  },
  {
    key: 'gad-color',
    icon: 'palette',
    title: 'Color',
    path: '/color',
    children: <ColorTool />,
  },
  {
    key: 'gad-midokoro',
    icon: 'assessment',
    title: 'Midokoro',
    path: '/midokoro',
    children: <Midokoro />,
  },
  {
    key: 'gad-katinko',
    icon: 'movie',
    title: 'Katinko',
    path: '/katinko',
    children: <Katinko />,
  },
]

function GadgetList() {
  return (
    <MuuriComponent dragEnabled={false}>
      {gadgets.map((props) => (
        <GadgetCard {...props} key={props.key} />
      ))}
    </MuuriComponent>
  )
}
export default GadgetList
