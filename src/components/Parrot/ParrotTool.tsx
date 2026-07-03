import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'
import { ParrotConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import ParrotAtom from './ParrotAtom'
import ParrotConfigEditor from './ParrotConfigEditor'
import { parrotDefaultConfig } from './parrotConfig'

function ParrotTool() {
  const { mode, setMode, config, setConfig } = useConfig<ParrotConfig>(
    'parrot',
    parrotDefaultConfig
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <ParrotAtom config={config} />
      <ConfigModal miniOver mode={mode}>
        <div className="over">
          <IconButton onClick={() => setMode('conf')}>
            <SettingsIcon />
          </IconButton>
        </div>
        <div className="conf">
          <ParrotConfigEditor config={config} setConfig={setConfig} />
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
  .rate-control {
    display: flex;
    padding: 8px;
  }
  .speed-control {
    display: flex;
    padding: 8px;
  }
`

export default ParrotTool
