import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'
import { ChecksConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import ChecksAtom from './ChecksAtom'
import ChecksConfigEditor from './ChecksConfigEditor'
import { checksDefaultConfig } from './checksConfig'

type Props = {}
function ChecksTool({}: Props) {
  const { config, setConfig, mode, setMode } = useConfig<ChecksConfig>(
    'checks',
    checksDefaultConfig
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <ChecksAtom config={config} setConfig={setConfig} />
      <ConfigModal mode={mode} miniOver>
        <div className="over">
          <IconButton onClick={() => setMode('conf')}>
            <SettingsIcon />
          </IconButton>
        </div>
        <div className="conf">
          <ChecksConfigEditor config={config} setConfig={setConfig} />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .conf {
    padding: 8px;
  }
`

export default ChecksTool
