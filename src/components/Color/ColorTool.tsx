import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import colorfn from 'color'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ColorConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useConfig } from '../hooks/useConfig'
import { useDocumentTitle, useThemeColor } from '../hooks/useDocumentMeta'
import ColorAtom from './ColorAtom'
import ColorConfigEditor from './ColorConfigEditor'
import { colorDefaultConfig } from './colorConfig'

type Props = {
  windowMode?: boolean
}
function ColorTool(props: Props) {
  const { mode, setMode, config, setConfig } = useConfig<ColorConfig>(
    'color',
    colorDefaultConfig
  )
  const [isDark, setIsDark] = useState<boolean>(false)
  const [touched, setTouched] = useState<boolean>(false)

  useThemeColor(props.windowMode ? config.color : undefined)
  useDocumentTitle(props.windowMode ? `Color-${config.color}` : undefined)

  useEffect(() => {
    try {
      setIsDark(colorfn(config.color).isDark())
    } catch (_e) {}
  }, [config.color])

  const fontColor = isDark ? '#fff' : '#000'

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => {
        if (touched) return
        setMode('main')
      }}
      // @ts-ignore
      style={{ '--color': fontColor }}
    >
      <ColorAtom config={config} />

      <ConfigModal mode={mode} miniOver>
        <div className="over" onMouseDown={() => setTouched(true)}>
          <ColorConfigEditor config={config} setConfig={setConfig} />
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
    </Style>
  )
}
ColorTool.defaultProps = { windowMode: false }

const Style = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  color: var(--color) !important;
  input,
  button {
    color: var(--color);
  }
`

export default ColorTool
