import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import styled from 'styled-components'

const Style = styled.div`
  .color {
    width: 36px;
    height: 14px;
    border-radius: 2px;
  }
  .swatch {
    padding: 5px;
    background: #fff;
    border-radius: 1px;
    display: inline-block;
  }
  .popover {
    position: absolute;
    z-index: 2;
  }
  .cover {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
  &[data-editable='true'] {
    .swatch {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`

type Props = {
  color: string
  onChange: (v: string) => void
  editable?: boolean
}
function ColorSelectButton({ color, onChange, editable = true }: Props) {
  const [visible, setVisible] = useState<boolean>(false)

  const handleClick = () => editable && setVisible((v) => !v)
  const handleClose = () => setVisible(false)

  return (
    <Style data-editable={editable}>
      <div className="swatch" onClick={handleClick}>
        <div className="color" style={{ background: color }} />
      </div>
      {visible && (
        <div className="popover">
          <div className="cover" onClick={handleClose} />
          <SketchPicker
            color={color}
            onChange={(res) => {
              onChange(res.hex)
            }}
          />
        </div>
      )}
    </Style>
  )
}

export default ColorSelectButton
