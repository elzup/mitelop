import { Icon, IconButton } from '@material-ui/core'
import { Close, Settings } from '@material-ui/icons'
import styled from 'styled-components'

type Props = {
  title: string
  icon?: string
  /** macOS で閉じるボタンを左端に寄せる (OS ウィンドウ操作の慣習) */
  mac?: boolean
  onClose: () => void
  onConfig?: () => void
  /** ドラッグ領域に付与する属性。Tauri 窓は {'data-tauri-drag-region': true}、
   *  ボード枠は react-rnd の {className:'bc-drag'} を渡す。 */
  dragProps?: Record<string, unknown>
  /** 親が位置・表示トリガ (hover/編集) を付与するための styled 連携用 */
  className?: string
}

/**
 * 単体ガジェット窓 (GadgetWindow) とボード配置枠 (BroadcastFrame) で共有する上部バー。
 * ダーク半透明 + 白アイコンで、どのガジェット背景でも視認できる。位置と表示トリガは
 * 親側 (className) が制御する。これでボードのガジェットも他と同じ chrome を継承する。
 */
export function GadgetChrome({
  title,
  icon,
  mac,
  onClose,
  onConfig,
  dragProps,
  className,
}: Props) {
  return (
    <Bar className={className} data-mac={mac ? 'true' : undefined}>
      <DragZone {...dragProps}>
        {icon && <Icon fontSize="small">{icon}</Icon>}
        <span className="gc-title">{title}</span>
      </DragZone>
      {onConfig && (
        <IconButton
          className="gc-config"
          size="small"
          title="設定を別窓で開く"
          onClick={onConfig}
        >
          <Settings fontSize="small" />
        </IconButton>
      )}
      <IconButton className="gc-close" size="small" onClick={onClose}>
        <Close fontSize="small" />
      </IconButton>
    </Bar>
  )
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;

  .MuiIconButton-root {
    color: #fff;
    padding: 4px;
  }
  .MuiSvgIcon-root {
    font-size: 18px;
  }
  /* macOS は閉じるボタンだけ左端へ (⚙ は右のまま)。それ以外は DOM 順で close が右端 */
  &[data-mac='true'] .gc-close {
    order: -1;
  }
`
const DragZone = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 8px;
  font-size: 11px;
  cursor: grab;
  user-select: none;
  overflow: hidden;
  white-space: nowrap;

  .gc-title {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
