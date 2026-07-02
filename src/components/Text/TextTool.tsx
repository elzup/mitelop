import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useState } from 'react'
import { TextGadgetConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import TextAtom from './TextAtom'
import TextConfigEditor from './TextConfigEditor'
import { textDefaultConfig } from './textConfig'

type Props = { windowMode?: boolean }

function TextTool(_props: Props) {
  const { config, setConfig, mode, setMode } = useConfig<TextGadgetConfig>(
    'gad-text',
    textDefaultConfig
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
      <TextAtom config={config} />
      <ConfigModal mode={mode} miniOver>
        <div className="over" onMouseDown={() => setTouched(true)}>
          <TextConfigEditor config={config} setConfig={setConfig} />
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

export default TextTool
