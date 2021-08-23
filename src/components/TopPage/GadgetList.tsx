import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import ChecksTool from '../Checks/ChecksTool'
import Clock from '../Clock/ClockTool'
import ColorTool from '../Color/ColorTool'
import Katinko from '../Katinko'
import Midokoro from '../Midokoro/MidokoroTool'
import MirrorTool from '../Mirror/MirrorTool'
import ParrotTool from '../Parrot/ParrotTool'
import RulerTool from '../Ruler/RulerTool'
import StopwatchTool from '../Stopwatch/StopwatchTool'
import TimerTool from '../Timer/TimerTool'
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
  {
    key: 'gad-mirror',
    icon: 'camera',
    title: 'Mirror',
    path: '/mirror',
    children: <MirrorTool />,
  },
  {
    key: 'gad-ruler',
    icon: 'ruler',
    title: 'Ruler',
    path: '/ruler',
    children: <RulerTool />,
  },
]

function GadgetList() {
  return (
    <Style>
      {gadgets.map((props) => (
        <GadgetCard {...props} key={props.key} />
      ))}
    </Style>
  )
}
const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default GadgetList
