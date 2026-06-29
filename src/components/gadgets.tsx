import { ComponentType } from 'react'
import { Size } from '../types'
import ChecksTool from './Checks/ChecksTool'
import ClockTool from './Clock/ClockTool'
import ColorTool from './Color/ColorTool'
import CounterTool from './Counter/CounterTool'
import IntervalTool from './Interval/IntervalTool'
import Katinko from './Katinko'
import MidokoroTool from './Midokoro/MidokoroTool'
import MirrorTool from './Mirror/MirrorTool'
import ParrotTool from './Parrot/ParrotTool'
import PianoTool from './Piano/PianoTool'
import RulerTool from './Ruler/RulerTool'
import StopwatchTool from './Stopwatch/StopwatchTool'
import TimerTool from './Timer/TimerTool'

/** すべての gadget Tool が受けられる共通 props。windowMode 非対応の Tool は無視する。 */
export type GadgetToolProps = { windowMode?: boolean }

export type GadgetDef = {
  key: string
  icon: string
  title: string
  path: string
  Component: ComponentType<GadgetToolProps>
  /** 単独ページ (route) で開くときに windowMode を渡すか */
  windowMode?: boolean
  /** Broadcast に配置したときの初期サイズ */
  defaultSize?: Size
}

const DEFAULT_SIZE: Size = { width: 320, height: 240 }

export const gadgets: GadgetDef[] = [
  {
    key: 'gad-checks',
    icon: 'checklist',
    title: 'Checks',
    path: '/checks',
    Component: ChecksTool,
  },
  {
    key: 'gad-clock',
    icon: 'schedule',
    title: 'Clock',
    path: '/clock',
    Component: ClockTool,
    windowMode: true,
  },
  {
    key: 'gad-stopwatch',
    icon: 'timer',
    title: 'StopWatch',
    path: '/stopwatch',
    Component: StopwatchTool,
  },
  {
    key: 'gad-timer',
    icon: 'hourglass_empty',
    title: 'Timer',
    path: '/timer',
    Component: TimerTool,
  },
  {
    key: 'gad-interval',
    icon: 'hourglass_empty',
    title: 'Interval',
    path: '/interval',
    Component: IntervalTool,
  },
  {
    key: 'gad-parrot',
    icon: 'speaker',
    title: 'Parrot',
    path: '/parrot',
    Component: ParrotTool,
  },
  {
    key: 'gad-color',
    icon: 'palette',
    title: 'Color',
    path: '/color',
    Component: ColorTool,
    windowMode: true,
  },
  {
    key: 'gad-midokoro',
    icon: 'assessment',
    title: 'Midokoro',
    path: '/midokoro',
    Component: MidokoroTool,
  },
  {
    key: 'gad-katinko',
    icon: 'movie',
    title: 'Katinko',
    path: '/katinko',
    Component: Katinko,
  },
  {
    key: 'gad-mirror',
    icon: 'camera',
    title: 'Mirror',
    path: '/mirror',
    Component: MirrorTool,
  },
  {
    key: 'gad-ruler',
    icon: 'ruler',
    title: 'Ruler',
    path: '/ruler',
    Component: RulerTool,
  },
  {
    key: 'gad-counter',
    icon: 'exposure',
    title: 'Counter',
    path: '/counter',
    Component: CounterTool,
  },
  {
    key: 'gad-piano',
    icon: 'piano',
    title: 'Piano',
    path: '/piano',
    Component: PianoTool,
  },
]

export const gadgetMap: Record<string, GadgetDef> = Object.fromEntries(
  gadgets.map((g) => [g.key, g])
)

export const gadgetDefaultSize = (key: string): Size =>
  gadgetMap[key]?.defaultSize ?? DEFAULT_SIZE
