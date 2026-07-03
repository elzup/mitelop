import styled from 'styled-components'
import { ChecksConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import ChecksAtom from './ChecksAtom'
import { checksDefaultConfig } from './checksConfig'

type Props = {}
function ChecksTool({}: Props) {
  const { config, setConfig, mode, setMode } = useActiveSlot<ChecksConfig>(
    'gad-checks',
    checksDefaultConfig,
    'checks'
  )

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <ChecksAtom config={config} setConfig={setConfig} />
      <ConfigModal mode={mode} miniOver>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-checks" />
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
`

export default ChecksTool
