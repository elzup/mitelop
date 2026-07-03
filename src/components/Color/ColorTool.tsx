import colorfn from 'color'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ColorConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { useDocumentTitle, useThemeColor } from '../hooks/useDocumentMeta'
import { OpenConfigButton } from '../OpenConfigButton'
import ColorAtom from './ColorAtom'
import { colorDefaultConfig } from './colorConfig'

type Props = {
  windowMode?: boolean
}
function ColorTool(props: Props) {
  const { mode, setMode, config } = useActiveSlot<ColorConfig>(
    'gad-color',
    colorDefaultConfig,
    'color'
  )
  const [isDark, setIsDark] = useState<boolean>(false)

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
      onMouseLeave={() => setMode('main')}
      // @ts-ignore
      style={{ '--color': fontColor }}
    >
      <ColorAtom config={config} />

      <ConfigModal mode={mode} miniOver>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-color" />
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
