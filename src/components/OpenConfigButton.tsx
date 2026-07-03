import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { useGadgetWindow } from './Broadcast/useGadgetWindow'

/** ガジェットの設定を専用の別窓 (/config/<key>) で開くボタン。 */
export function OpenConfigButton({ gadgetKey }: { gadgetKey: string }) {
  const { openConfigWindow } = useGadgetWindow()

  return (
    <IconButton
      onClick={() => openConfigWindow(gadgetKey)}
      title="設定を別窓で開く"
    >
      <SettingsIcon />
    </IconButton>
  )
}
