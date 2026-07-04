import { Icon, IconButton, ThemeProvider } from '@material-ui/core'
import { Close, Dashboard } from '@material-ui/icons'
import styled from 'styled-components'
import { isTauri } from '../../utils/platform'
import { denseTheme } from '../../utils/theme'
import { tokens } from '../../utils/tokens'
import { useGadgetWindow } from '../Broadcast/useGadgetWindow'
import { useTransparentBody } from '../Broadcast/useTauriOverlay'
import { gadgetMap, gadgets } from '../gadgets'
import { ResizeGrip } from '../ResizeGrip'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { GADGET_GROUPS } from './gadgetGroups'

/** 自ウィンドウ (=ランチャー) を閉じる */
async function closeSelf() {
  if (!isTauri()) return
  const { getCurrentWindow } = await import('@tauri-apps/api/window')

  await getCurrentWindow().close()
}

/** GADGET_GROUPS に載っていない key を「その他」としてまとめる */
function useGroupedGadgets() {
  const grouped = new Set(GADGET_GROUPS.flatMap((g) => g.gadgetKeys))
  const others = gadgets.map((g) => g.key).filter((k) => !grouped.has(k))
  const known = GADGET_GROUPS.map((g) => ({
    label: g.label,
    keys: g.gadgetKeys.filter((k) => gadgetMap[k]),
  }))

  return others.length > 0
    ? [...known, { label: 'その他', keys: others }]
    : known
}

/**
 * ネイティブの入口。小さな枠なし窓に、ガジェットをグループごとにミニマムに並べる。
 * クリックでガジェット単体を枠なし透過窓として開く。Board もここから開く。
 * (web ダッシュボード = TopPage とは別物。ネイティブ専用の導線)
 */
function Launcher() {
  const { openGadgetWindow, openBoardWindow } = useGadgetWindow()
  const groups = useGroupedGadgets()

  useTransparentBody()

  return (
    <ThemeProvider theme={denseTheme}>
      <Root>
        <Bar>
          <DragZone data-tauri-drag-region>Mitelop</DragZone>
          <IconButton size="small" onClick={() => void closeSelf()}>
            <Close fontSize="small" />
          </IconButton>
        </Bar>

        <BoardButton onClick={() => openBoardWindow()}>
          <Dashboard fontSize="small" />
          <span>Board を開く</span>
        </BoardButton>

        <div className="theme">
          <ThemeSwitcher />
        </div>

        <Groups>
          {groups.map((group) => (
            <section key={group.label}>
              <h4>{group.label}</h4>
              <div className="chips">
                {group.keys.map((key) => {
                  const g = gadgetMap[key]
                  const disabled = Boolean(g.nativeOnly) && !isTauri()

                  return (
                    <button
                      key={key}
                      className="chip"
                      disabled={disabled}
                      title={g.title}
                      onClick={() => openGadgetWindow(key)}
                    >
                      <Icon fontSize="small">{g.icon}</Icon>
                      <span>{g.title}</span>
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </Groups>
        <ResizeGrip />
      </Root>
    </ThemeProvider>
  )
}

const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${tokens.color.surface};
  border-radius: ${tokens.radius.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: ${tokens.color.text};

  .theme {
    padding: 4px 8px 0;
  }
`
const Bar = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  background: ${tokens.color.primary};
  color: #fff;
`
const DragZone = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: grab;
  user-select: none;
`
const BoardButton = styled.button`
  margin: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${tokens.color.border};
  border-radius: ${tokens.radius.sm};
  background: ${tokens.color.primaryWeak};
  color: ${tokens.color.primary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${tokens.color.overlayScrim};
  }
`
const Groups = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 8px 12px;

  section {
    margin-top: 8px;
  }
  h4 {
    margin: 0 0 4px;
    font-size: 11px;
    color: ${tokens.color.textWeak};
    letter-spacing: 0.04em;
  }
  .chips {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }
  .chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.sm};
    background: ${tokens.color.surface};
    color: ${tokens.color.text};
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    overflow: hidden;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover:not(:disabled) {
      background: ${tokens.color.primaryWeak};
    }
    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
`

export default Launcher
