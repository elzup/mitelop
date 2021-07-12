import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import color from 'color'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ColorConfig, GadgetMode } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { ConfigModal } from '../components'
import ColorField from '../forms/ColorField'
import { useConfig } from '../hooks/useConfig'
import ColorAtom from './ColorAtom'

type Props = {
  windowMode?: boolean
}
function ColorTool(props: Props) {
  const { mode, setMode, config, setConfig } = useConfig('color', {
    color: '#2B0065',
  })
  const [isDark, setIsDark] = useState<boolean>(false)
  const [touched, setTouched] = useState<boolean>(false)

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
      {props.windowMode && (
        <Head>
          <meta name="theme-color" content={config.color} />
          <title>Color-{color}</title>
        </Head>
      )}
      <ColorAtom config={config} />

      <ConfigModal
        mode={mode}
        background="transparent"
        onLeave={() => {
          if (touched) return
          setMode('main')
        }}
      >
        <div
          className="over"
          style={{ height: 'max-contnt', background: '#ffffffaa' }}
        >
          <ColorField
            label="Color"
            onChange={(color) => setConfig((v) => ({ ...v, color }))}
            onMouseDown={() => setTouched(true)}
            value={config.color}
          />
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
