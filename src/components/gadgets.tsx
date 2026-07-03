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
import ClockConfigAtom from './Clock/ClockConfigAtom'
import ClockConfigEditor from './Clock/ClockConfigEditor'
import { clockDefaultConfig } from './Clock/clockConfig'
import ClockTool from './Clock/ClockTool'
import ColorConfigAtom from './Color/ColorConfigAtom'
import ColorConfigEditor from './Color/ColorConfigEditor'
import { colorDefaultConfig } from './Color/colorConfig'
import ColorTool from './Color/ColorTool'
import MirrorConfigAtom from './Mirror/MirrorConfigAtom'
import MirrorConfigEditor from './Mirror/MirrorConfigEditor'
import { mirrorDefaultConfig } from './Mirror/mirrorConfig'
import RulerConfigAtom from './Ruler/RulerConfigAtom'
import RulerConfigEditor from './Ruler/RulerConfigEditor'
import { rulerDefaultConfig } from './Ruler/rulerConfig'
import CompassAtom from './Compass/CompassAtom'
import CompassConfigEditor from './Compass/CompassConfigEditor'
import {
  compassAspectRatio,
  compassDefaultConfig,
} from './Compass/compassConfig'
import CompassTool from './Compass/CompassTool'
import CounterTool from './Counter/CounterTool'
import IntervalConfigAtom from './Interval/IntervalConfigAtom'
import IntervalConfigEditor from './Interval/IntervalConfigEditor'
import { intervalDefaultConfig } from './Interval/intervalConfig'
import IntervalTool from './Interval/IntervalTool'
import Katinko from './Katinko'
import MidokoroTool from './Midokoro/MidokoroTool'
import MirrorTool from './Mirror/MirrorTool'
import ParrotAtom from './Parrot/ParrotAtom'
import ParrotConfigEditor from './Parrot/ParrotConfigEditor'
import { parrotDefaultConfig } from './Parrot/parrotConfig'
import ParrotTool from './Parrot/ParrotTool'
import PianoTool from './Piano/PianoTool'
import ProtractorAtom from './Protractor/ProtractorAtom'
import ProtractorConfigEditor from './Protractor/ProtractorConfigEditor'
import {
  protractorAspectRatio,
  protractorDefaultConfig,
} from './Protractor/protractorConfig'
import ProtractorTool from './Protractor/ProtractorTool'
import RulerTool from './Ruler/RulerTool'
import SetSquareAtom from './SetSquare/SetSquareAtom'
import SetSquareConfigEditor from './SetSquare/SetSquareConfigEditor'
import {
  setSquareAspectRatio,
  setSquareDefaultConfig,
} from './SetSquare/setSquareConfig'
import SetSquareTool from './SetSquare/SetSquareTool'
import StopwatchTool from './Stopwatch/StopwatchTool'
import ThumbnailTool from './Thumbnail/ThumbnailTool'
import TimerConfigAtom from './Timer/TimerConfigAtom'
import TimerConfigEditor from './Timer/TimerConfigEditor'
import { timerDefaultConfig } from './Timer/timerConfig'
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
  /**
   * 単独 (standalone) の設定を保存する useConfig の id。既定は key。
   * 標準ページの Tool が短い id (例 'clock') で useConfig しているものは、
   * その id を指定して設定窓 (instanceId なし) が同じ localStorage を指すようにする。
   * Broadcast の per-instance 設定は常に key + instanceId を使うのでこの値は無関係。
   */
  configId?: string
  /**
   * ネイティブ (Tauri) 版でだけ動く gadget。web ビルドでは無効表示にする。
   * 現状は三角定規・コンパス・分度器のみが該当予定。
   */
  nativeOnly?: boolean
}

const DEFAULT_SIZE: Size = { width: 320, height: 240 }

export const gadgets: GadgetDef[] = [
  {
    key: 'gad-checks',
    icon: 'checklist',
    title: 'Checks',
    path: '/checks',
    Component: ChecksTool,
    configId: 'checks',
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
    configId: 'clock',
    config: {
      defaultConfig: clockDefaultConfig,
      Atom: ClockConfigAtom,
      ConfigEditor: ClockConfigEditor,
    },
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
    configId: 'timer',
    config: {
      defaultConfig: timerDefaultConfig,
      Atom: TimerConfigAtom,
      ConfigEditor: TimerConfigEditor,
    },
  },
  {
    key: 'gad-interval',
    icon: 'hourglass_empty',
    title: 'Interval',
    path: '/interval',
    Component: IntervalTool,
    configId: 'interval',
    config: {
      defaultConfig: intervalDefaultConfig,
      Atom: IntervalConfigAtom,
      ConfigEditor: IntervalConfigEditor,
    },
  },
  {
    key: 'gad-parrot',
    icon: 'speaker',
    title: 'Parrot',
    path: '/parrot',
    Component: ParrotTool,
    configId: 'parrot',
    config: {
      defaultConfig: parrotDefaultConfig,
      Atom: ParrotAtom,
      ConfigEditor: ParrotConfigEditor,
    },
  },
  {
    key: 'gad-color',
    icon: 'palette',
    title: 'Color',
    path: '/color',
    Component: ColorTool,
    windowMode: true,
    configId: 'color',
    config: {
      defaultConfig: colorDefaultConfig,
      Atom: ColorConfigAtom,
      ConfigEditor: ColorConfigEditor,
    },
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
    configId: 'mirror',
    config: {
      defaultConfig: mirrorDefaultConfig,
      Atom: MirrorConfigAtom,
      ConfigEditor: MirrorConfigEditor,
    },
  },
  {
    key: 'gad-ruler',
    icon: 'ruler',
    title: 'Ruler',
    path: '/ruler',
    Component: RulerTool,
    configId: 'ruler',
    config: {
      defaultConfig: rulerDefaultConfig,
      Atom: RulerConfigAtom,
      ConfigEditor: RulerConfigEditor,
    },
  },
  {
    key: 'gad-setsquare',
    icon: 'square_foot',
    title: 'SetSquare',
    path: '/setsquare',
    Component: SetSquareTool,
    nativeOnly: true,
    defaultSize: { width: 320, height: 320 },
    config: {
      defaultConfig: setSquareDefaultConfig,
      Atom: SetSquareAtom,
      ConfigEditor: SetSquareConfigEditor,
      getAspectRatio: setSquareAspectRatio,
    },
  },
  {
    key: 'gad-compass',
    icon: 'architecture',
    title: 'Compass',
    path: '/compass',
    Component: CompassTool,
    nativeOnly: true,
    defaultSize: { width: 320, height: 320 },
    config: {
      defaultConfig: compassDefaultConfig,
      Atom: CompassAtom,
      ConfigEditor: CompassConfigEditor,
      getAspectRatio: compassAspectRatio,
    },
  },
  {
    key: 'gad-protractor',
    icon: 'data_usage',
    title: 'Protractor',
    path: '/protractor',
    Component: ProtractorTool,
    nativeOnly: true,
    defaultSize: { width: 400, height: 200 },
    config: {
      defaultConfig: protractorDefaultConfig,
      Atom: ProtractorAtom,
      ConfigEditor: ProtractorConfigEditor,
      getAspectRatio: protractorAspectRatio,
    },
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
