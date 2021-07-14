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
      // onMouseLeave={() => setMode('main')}
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
          <div>
            <div>
              <label htmlFor="layout">layout</label>
              <select
                name="layout"
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
            <div>
              <label htmlFor="items">items</label>
              <textarea
                name="items"
                value={config.text}
                // style={{ font-size: '' }}
                onChange={(e) =>
                  setConfig((v) => ({ ...v, text: e.target.value }))
                }
              ></textarea>
            </div>
          </div>
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
  .conf {
    height: 100%;
    > div {
      height: 100%;
      display: grid;
      grid-template-rows: auto 1fr;
      /* padding:  */
      textarea {
        box-sizing: border-box;
        font-size: 1.2rem;
        width: 100%;
        height: 100%;
      }
    }
  }
`

export default ChecksTool
