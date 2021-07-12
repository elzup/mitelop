import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useEffect, useState } from 'react'

import styled from 'styled-components'
import color from 'color'
import { ColorConfig, GadgetMode } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { ConfigModal } from '../components'
import ColorField from '../forms/ColorField'
import ColorAtom from './ColorAtom'

const initConfig: ColorConfig = {
  color: '#2B0065',
}

function ColorTool() {
  const [mode, setMode] = useState<GadgetMode>('main')
  const [isDark, setIsDark] = useState<boolean>(false)
  const [config, setConfig] = useLocalStorage<ColorConfig>(
    'config-color',
    initConfig
  )

  useEffect(() => {
    try {
      setIsDark(color(config.color).isDark())
    } catch (_e) {}
  }, [config.color])

  const fontColor = isDark ? '#fff' : '#000'

  return (
    <Style
      onMouseEnter={() => setMode('over')}
      // @ts-ignore
      style={{ '--color': fontColor }}
    >
      <ColorAtom config={config} />
      <ConfigModal visible={mode !== 'main'} background="transparent">
        <div
          style={{
            display: mode === 'over' ? 'block' : 'none',
          }}
        >
          <ColorField
            label="Color"
            onChange={(color) => setConfig((v) => ({ ...v, color }))}
            value={config.color}
          />
          <IconButton onClick={() => setMode('main')}>
            <Close />
          </IconButton>
        </div>
      </ConfigModal>
    </Style>
  )
}

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
