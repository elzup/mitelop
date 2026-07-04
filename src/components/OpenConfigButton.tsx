import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { useGadgetWindow } from './Broadcast/useGadgetWindow'
import { useInGadgetWindow } from './gadgetWindowContext'

/** ガジェットの設定を専用の別窓 (/config/<key>) で開くボタン。 */
export function OpenConfigButton({ gadgetKey }: { gadgetKey: string }) {
  const { openConfigWindow } = useGadgetWindow()
  const inGadgetWindow = useInGadgetWindow()

  // 単体窓では header 側が ⚙ を出すので、ここでは出さない (二重表示回避)
  if (inGadgetWindow) return null

  return (
    <IconButton
      onClick={() => openConfigWindow(gadgetKey)}
      title="設定を別窓で開く"
    >
      <SettingsIcon />
    </IconButton>
  )
}
