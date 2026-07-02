import { ComponentType, Dispatch, SetStateAction } from 'react'
import { Size } from '../types'
import ChecksAtom from './Checks/ChecksAtom'
import ChecksConfigEditor from './Checks/ChecksConfigEditor'
import { checksDefaultConfig } from './Checks/checksConfig'
import FrameAtom from './Frame/FrameAtom'
import FrameConfigEditor from './Frame/FrameConfigEditor'
import FrameTool from './Frame/FrameTool'
import { frameAspectRatio, frameDefaultConfig } from './Frame/frameConfig'
import TextAtom from './Text/TextAtom'
import TextConfigEditor from './Text/TextConfigEditor'
import TextTool from './Text/TextTool'
import { textDefaultConfig } from './Text/textConfig'
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
import ThumbnailTool from './Thumbnail/ThumbnailTool'
import TimerTool from './Timer/TimerTool'

/** すべての gadget Tool が受けられる共通 props。windowMode 非対応の Tool は無視する。 */
export type GadgetToolProps = { windowMode?: boolean }

export type ConfigEditorProps<T> = {
  config: T
  setConfig: Dispatch<SetStateAction<T>>
}

/**
 * gadget を「表示(Atom) / 設定値(defaultConfig) / 設定UI(ConfigEditor)」に分けた仕様。
 * これを持つ gadget は Broadcast で per-instance config を持ち、設定を編集枠側に出せる。
 */
// 異種 config を持つ gadget を 1 つの registry に並べるため any を許容する
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GadgetConfigSpec<T = any> = {
  defaultConfig: T
  /** 表示本体。インタラクティブな gadget は setConfig で自身の状態を更新できる */
  Atom: ComponentType<{ config: T; setConfig: Dispatch<SetStateAction<T>> }>
  ConfigEditor: ComponentType<ConfigEditorProps<T>>
  /** 固定アス比 (width/height) を返す gadget は枠自体をその比率に固定できる */
  getAspectRatio?: (config: T) => number | undefined
}

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
  /** 設定を Atom/ConfigEditor に分離した gadget のみ持つ */
  config?: GadgetConfigSpec
}

const DEFAULT_SIZE: Size = { width: 320, height: 240 }

export const gadgets: GadgetDef[] = [
  {
    key: 'gad-checks',
    icon: 'checklist',
    title: 'Checks',
    path: '/checks',
    Component: ChecksTool,
    config: {
      defaultConfig: checksDefaultConfig,
      Atom: ChecksAtom,
      ConfigEditor: ChecksConfigEditor,
    },
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
  {
    key: 'gad-text',
    icon: 'title',
    title: 'Text',
    path: '/text',
    Component: TextTool,
    defaultSize: { width: 480, height: 120 },
    config: {
      defaultConfig: textDefaultConfig,
      Atom: TextAtom,
      ConfigEditor: TextConfigEditor,
    },
  },
  {
    key: 'gad-thumbnail',
    icon: 'image',
    title: 'Thumbnail',
    path: '/thumbnail',
    Component: ThumbnailTool,
    defaultSize: { width: 640, height: 480 },
  },
  {
    key: 'gad-frame',
    icon: 'crop_16_9',
    title: 'Frame',
    path: '/frame',
    Component: FrameTool,
    defaultSize: { width: 480, height: 270 },
    config: {
      defaultConfig: frameDefaultConfig,
      Atom: FrameAtom,
      ConfigEditor: FrameConfigEditor,
      getAspectRatio: frameAspectRatio,
    },
  },
]

export const gadgetMap: Record<string, GadgetDef> = Object.fromEntries(
  gadgets.map((g) => [g.key, g])
)

export const gadgetDefaultSize = (key: string): Size =>
  gadgetMap[key]?.defaultSize ?? DEFAULT_SIZE
