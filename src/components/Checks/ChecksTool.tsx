import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'
import { ChecksConfig, isLayoutType } from '../../types'
import { arrToggle } from '../../utils'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import ChecksAtom from './ChecksAtom'

type Props = {}
function ChecksTool({}: Props) {
  const { config, setConfig, mode, setMode } = useConfig<ChecksConfig>(
    'checks',
    {
      text: `Hello\nWorld\n!!`,
      checks: [],
      layout: 'horizontal',
    }
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <ChecksAtom
        config={config}
        onClickItem={(name) => {
          setConfig((v) => ({ ...v, checks: arrToggle(v.checks, name) }))
        }}
      />
      <ConfigModal mode={mode} miniOver>
        <div className="over">
          <IconButton onClick={() => setMode('conf')}>
            <SettingsIcon />
          </IconButton>
        </div>
        <div className="conf">
          <select
            value={config.layout}
            onChange={(e) => {
              const layout = e.target.value

              if (!isLayoutType(layout)) return
              setConfig((v) => ({ ...v, layout }))
            }}
          >
            <option>horizontal</option>
            <option>vertical</option>
          </select>
        </div>
      </ConfigModal>
    </Style>
  )
}

ChecksTool.defaultProps = {
  titles: [],
  row: false,
}

const Style = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export default ChecksTool
