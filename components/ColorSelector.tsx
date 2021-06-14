import React, { useEffect, useState } from 'react'
import { RGBColor, SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

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

  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: 2,
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  } as const)

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {visible && (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker
            color={color}
            onChange={(res) => {
              setColor(res.rgb)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default SketchExample
