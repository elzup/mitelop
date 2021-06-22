import React, { useEffect, useState } from 'react'
import { RGBColor, SketchPicker } from 'react-color'
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
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    cursor: pointer;
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
`

function SketchExample() {
  const [visible, setVisible] = useState<boolean>(false)
  const [color, setColor] = useState<RGBColor>({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  })

  useEffect(() => {
    console.log('DidMount')
    return () => {
      console.log('WillUnmount')
    }
  }, [])

  const handleClick = () => setVisible((v) => !v)
  const handleClose = () => setVisible(false)
  const background = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`

  return (
    <Style>
      <div className="swatch" onClick={handleClick}>
        <div className="color" style={{ background }} />
      </div>
      {visible && (
        <div className="popover">
          <div className="cover" onClick={handleClose} />
          <SketchPicker
            color={color}
            onChange={(res) => {
              setColor(res.rgb)
            }}
          />
        </div>
      )}
    </Style>
  )
}

export default SketchExample
