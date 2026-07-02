import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useState } from 'react'
import { FrameGadgetConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import FrameAtom from './FrameAtom'
import FrameConfigEditor from './FrameConfigEditor'
import { frameDefaultConfig } from './frameConfig'

type Props = { windowMode?: boolean }

function FrameTool(_props: Props) {
  const { config, setConfig, mode, setMode } = useConfig<FrameGadgetConfig>(
    'gad-frame',
    frameDefaultConfig
  )
  const [touched, setTouched] = useState(false)

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => {
        if (touched) return
        setMode('main')
      }}
    >
      <FrameAtom config={config} />
      <ConfigModal mode={mode} miniOver>
        <div className="over" onMouseDown={() => setTouched(true)}>
          <FrameConfigEditor config={config} setConfig={setConfig} />
          <IconButton
            onClick={() => {
              setMode('main')
              setTouched(false)
            }}
          >
            <Close />
          </IconButton>
        </div>
      </ConfigModal>
    </div>
  )
}

export default FrameTool
