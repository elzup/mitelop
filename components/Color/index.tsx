import { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import Router from 'next/router'
import styled from 'styled-components'

type ColorConfigProps = {
  onFinish: () => void
  color: string
}
function ColorConfig({ color, onFinish }: ColorConfigProps) {
  return (
    <div>
      <input
        defaultValue={color}
        onChange={(e) => {
          Router.push({ query: { color: e.target.value } })
        }}
      />
      <button onClick={onFinish}>閉じる</button>
    </div>
  )
}

function Color({ color }: { color: string }) {
  const [configMode, setConfigMode] = useState<boolean>(false)

  if (configMode) {
    return <ColorConfig color={color} onFinish={() => setConfigMode(false)} />
  }

  return (
    <Style
      onClick={() => setConfigMode(true)}
      style={{ background: color }}
    ></Style>
  )
}
Color.defaultProps = { color: '#fff', onFinish: () => {} }

const Style = styled.div`
  height: 100vh;
  width: 100vw;
`

export default Color
