import {
  BroadcastConfig,
  BroadcastFrameConfig,
  BroadcastItem,
  BroadcastRatio,
} from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { gadgetDefaultSize, gadgetMap } from '../gadgets'
import { createSlot } from '../hooks/useSlots'

export type BoardMeta = { id: string; name: string }

/** main 以外の追加ボード一覧をランチャーで管理する。 */
export function useBoards() {
  const [boards, setBoards] = useLocalStorage<BoardMeta[]>('board-list', [])

  const addBoard = (name?: string): string => {
    const id = `b-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 5)}`

    setBoards((v) => [...v, { id, name: name ?? `Board ${v.length + 2}` }])

    return id
  }
  const removeBoard = (id: string) =>
    setBoards((v) => v.filter((b) => b.id !== id))

  return { boards, addBoard, removeBoard }
}

const initialConfig: BroadcastConfig = { items: [] }
const initialFrame: BroadcastFrameConfig = {
  ratio: '16:9',
  locked: false,
  bg: '#ffffff',
}

const genId = () =>
  `bc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

/** 設計座標系の長辺 (px)。比率から短辺を導出し、stage で window に contain させる。 */
const DESIGN_LONG = 1280

/** 比率プリセット → 設計座標系の実寸 (長辺 1280 固定)。 */
export const ratioDims = (ratio: BroadcastRatio): { w: number; h: number } => {
  const [rw, rh] = ratio.split(':').map(Number)
  const aspect = rw / rh

  return aspect >= 1
    ? { w: DESIGN_LONG, h: Math.round(DESIGN_LONG / aspect) }
    : { w: Math.round(DESIGN_LONG * aspect), h: DESIGN_LONG }
}

/** 既定ボード 'main' は従来キーを使い後方互換。他ボードは board-<id>-* に分離。 */
const boardKeys = (boardId: string) =>
  boardId === 'main'
    ? {
        items: 'broadcast',
        sel: 'broadcast-selected',
        edit: 'broadcast-editing',
        frame: 'broadcast-frame',
      }
    : {
        items: `board-${boardId}`,
        sel: `board-${boardId}-selected`,
        edit: `board-${boardId}-editing`,
        frame: `board-${boardId}-frame`,
      }

/**
 * Broadcast ボードの配置状態 (items) と選択中インスタンスを localStorage に束ねる。
 * boardId ごとにキーを分けるので複数ボードを独立に持てる。config も selectedId も
 * storage イベントで他ウィンドウと同期し、stage と編集パネルが同じ状態を共有する。
 */
export function useBroadcast(boardId = 'main') {
  const k = boardKeys(boardId)
  const [config, setConfig] = useLocalStorage<BroadcastConfig>(
    k.items,
    initialConfig
  )
  const [selectedId, setSelectedId] = useLocalStorage<string | null>(
    k.sel,
    null
  )
  // stage の編集モード。コントロール窓で切り替え、stage 窓へ storage 同期する
  const [editing, setEditing] = useLocalStorage<boolean>(k.edit, false)
  // 配信枠 (stage のアス比・ロック)。コントロール窓で切り替え stage に同期する
  const [frame, setFrame] = useLocalStorage<BroadcastFrameConfig>(
    k.frame,
    initialFrame
  )

  const addGadget = (gadgetKey: string) => {
    const def = gadgetMap[gadgetKey]
    const spec = def?.config
    // 追加インスタンスは自分専用スロットを持つ (既定で設定を分離)
    const count =
      config.items.filter((it) => it.gadgetKey === gadgetKey).length + 1
    const slotId = spec
      ? createSlot(
          gadgetKey,
          spec.defaultConfig,
          undefined,
          `${def?.title ?? gadgetKey} ${count}`,
          def?.configId
        )
      : undefined
    const item: BroadcastItem = {
      id: genId(),
      gadgetKey,
      x: 40,
      y: 40,
      ...gadgetDefaultSize(gadgetKey),
      slotId,
    }

    setConfig((v) => ({ ...v, items: [...v.items, item] }))
    setSelectedId(item.id)
  }

  const updateItem = (id: string, patch: Partial<BroadcastItem>) =>
    setConfig((v) => ({
      ...v,
      items: v.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }))

  const removeItem = (id: string) =>
    setConfig((v) => ({ ...v, items: v.items.filter((it) => it.id !== id) }))

  const setRatio = (ratio: BroadcastRatio) => setFrame((v) => ({ ...v, ratio }))
  const toggleLock = () => setFrame((v) => ({ ...v, locked: !v.locked }))
  const setBg = (bg: string) => setFrame((v) => ({ ...v, bg }))

  return {
    config,
    selectedId,
    setSelectedId,
    editing,
    setEditing,
    frame,
    setRatio,
    toggleLock,
    setBg,
    addGadget,
    updateItem,
    removeItem,
  }
}
