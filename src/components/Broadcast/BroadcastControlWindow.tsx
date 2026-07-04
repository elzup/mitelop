import {
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import { Lock, LockOpen } from '@material-ui/icons'
import styled from 'styled-components'
import { BROADCAST_RATIOS } from '../../types'
import { isTauri } from '../../utils/platform'
import { denseTheme } from '../../utils/theme'
import { tokens } from '../../utils/tokens'
import ColorField from '../forms/ColorField'
import BroadcastPanel from './BroadcastPanel'
import { useBroadcast } from './useBroadcast'
import { useGadgetWindow } from './useGadgetWindow'
import { useOverlayConfig } from './useTauriOverlay'

/**
 * /broadcast/control で開く「出しっぱなし」のコントロール窓。
 * ガジェット追加・配置一覧・stage 編集トグルを持つ。各ガジェットの設定は
 * 行の歯車から更に別窓 (/config) で開く。全て localStorage 経由で stage 窓に同期。
 */
function BroadcastControlWindow() {
  const {
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
    removeItem,
  } = useBroadcast()
  const bgTransparent = frame.bg === 'transparent'
  const { openConfigWindow, isConfigOpen } = useGadgetWindow()
  const [overlay, setOverlay] = useOverlayConfig()

  return (
    <Style>
      <ThemeProvider theme={denseTheme}>
        <Header>
          <Typography variant="subtitle2">Broadcast コントロール</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={editing}
                onChange={(e) => setEditing(e.target.checked)}
                color="primary"
              />
            }
            label="stage を編集"
          />
        </Header>
        <FrameBar>
          <Typography variant="caption" color="textSecondary">
            配信枠
          </Typography>
          <div className="ratios">
            {BROADCAST_RATIOS.map((r) => (
              <Button
                key={r}
                size="small"
                disableElevation
                variant={frame.ratio === r ? 'contained' : 'outlined'}
                color={frame.ratio === r ? 'primary' : 'default'}
                onClick={() => setRatio(r)}
              >
                {r}
              </Button>
            ))}
          </div>
          <IconButton
            size="small"
            color={frame.locked ? 'primary' : 'default'}
            onClick={toggleLock}
            title={
              frame.locked
                ? '枠サイズを固定中 (等倍) — 解除でウィンドウに合わせる'
                : '枠サイズを固定する (等倍)'
            }
          >
            {frame.locked ? (
              <Lock fontSize="small" />
            ) : (
              <LockOpen fontSize="small" />
            )}
          </IconButton>
        </FrameBar>
        <FrameBar>
          <Typography variant="caption" color="textSecondary">
            背景
          </Typography>
          <ColorField
            label="色"
            value={bgTransparent ? '#ffffff' : frame.bg}
            onChange={setBg}
          />
          <Button
            size="small"
            disableElevation
            variant={bgTransparent ? 'contained' : 'outlined'}
            color={bgTransparent ? 'primary' : 'default'}
            onClick={() => setBg(bgTransparent ? '#ffffff' : 'transparent')}
          >
            透明
          </Button>
        </FrameBar>
        {isTauri() && (
          <FrameBar>
            <Typography variant="caption" color="textSecondary">
              オーバーレイ
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={overlay.alwaysOnTop}
                  onChange={(e) =>
                    setOverlay((v) => ({ ...v, alwaysOnTop: e.target.checked }))
                  }
                />
              }
              label="最前面"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={overlay.clickThrough}
                  onChange={(e) =>
                    setOverlay((v) => ({
                      ...v,
                      clickThrough: e.target.checked,
                    }))
                  }
                />
              }
              label="クリック透過"
            />
          </FrameBar>
        )}
      </ThemeProvider>
      <BroadcastPanel
        config={config}
        selectedId={selectedId}
        onAddGadget={addGadget}
        onRemoveItem={removeItem}
        onSelectItem={setSelectedId}
        onOpenConfig={openConfigWindow}
        isConfigOpen={isConfigOpen}
      />
    </Style>
  )
}

const Style = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: ${tokens.color.surface};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-bottom: solid 1px ${tokens.color.border};
`
const FrameBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-bottom: solid 1px ${tokens.color.border};

  .ratios {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    flex-grow: 1;
  }
  .ratios .MuiButton-root {
    min-width: 0;
    padding: 1px 6px;
  }
`

export default BroadcastControlWindow
