import React from 'react'
import ChecksTool from './Checks/ChecksTool'
import Clock from './Clock/ClockTool'
import ColorTool from './Color/ColorTool'
import CounterTool from './Counter/CounterTool'
import IntervalTool from './Interval/IntervalTool'
import Katinko from './Katinko'
import Midokoro from './Midokoro/MidokoroTool'
import MirrorTool from './Mirror/MirrorTool'
import ParrotTool from './Parrot/ParrotTool'
import PianoTool from './Piano/PianoTool'
import RulerTool from './Ruler/RulerTool'
import StopwatchTool from './Stopwatch/StopwatchTool'
import TimerTool from './Timer/TimerTool'

export type GadgetDef = {
  key: string
  icon: string
  title: string
  path: string
  render: () => React.ReactNode
}

export const gadgets: GadgetDef[] = [
  {
    key: 'gad-checks',
    icon: 'checklist',
    title: 'Checks',
    path: '/checks',
    render: () => <ChecksTool />,
  },
  {
    key: 'gad-clock',
    icon: 'schedule',
    title: 'Clock',
    path: '/clock',
    render: () => <Clock />,
  },
  {
    key: 'gad-stopwatch',
    icon: 'timer',
    title: 'StopWatch',
    path: '/stopwatch',
    render: () => <StopwatchTool />,
  },
  {
    key: 'gad-timer',
    icon: 'hourglass_empty',
    title: 'Timer',
    path: '/timer',
    render: () => <TimerTool />,
  },
  {
    key: 'gad-interval',
    icon: 'hourglass_empty',
    title: 'Interval',
    path: '/interval',
    render: () => <IntervalTool />,
  },
  {
    key: 'gad-parrot',
    icon: 'speaker',
    title: 'Parrot',
    path: '/parrot',
    render: () => <ParrotTool />,
  },
  {
    key: 'gad-color',
    icon: 'palette',
    title: 'Color',
    path: '/color',
    render: () => <ColorTool />,
  },
  {
    key: 'gad-midokoro',
    icon: 'assessment',
    title: 'Midokoro',
    path: '/midokoro',
    render: () => <Midokoro />,
  },
  {
    key: 'gad-katinko',
    icon: 'movie',
    title: 'Katinko',
    path: '/katinko',
    render: () => <Katinko />,
  },
  {
    key: 'gad-mirror',
    icon: 'camera',
    title: 'Mirror',
    path: '/mirror',
    render: () => <MirrorTool />,
  },
  {
    key: 'gad-ruler',
    icon: 'ruler',
    title: 'Ruler',
    path: '/ruler',
    render: () => <RulerTool />,
  },
  {
    key: 'gad-counter',
    icon: 'exposure',
    title: 'Counter',
    path: '/counter',
    render: () => <CounterTool />,
  },
  {
    key: 'gad-piano',
    icon: 'piano',
    title: 'Piano',
    path: '/piano',
    render: () => <PianoTool />,
  },
]

export const gadgetMap: Record<string, GadgetDef> = Object.fromEntries(
  gadgets.map((g) => [g.key, g])
)
