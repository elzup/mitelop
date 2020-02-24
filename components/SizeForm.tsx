import { Typography, Slider } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { Size } from '../types'

type Props = {
  size: Size
  setSize: Dispatch<SetStateAction<Size>>
}
function SizeForm({ size: { width, height }, setSize }: Props) {
  return (
    <>
      <Typography gutterBottom>ウィジェット幅: {width}</Typography>
      <Slider
        value={width}
        onChange={(e, width) => {
          if (typeof width === 'object') return
          setSize(size => ({ ...size, width }))
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={20}
        max={1000}
      />
      <Typography gutterBottom>ウィジェット高さ: {height}</Typography>
      <Slider
        value={height}
        onChange={(e, height) => {
          if (typeof height === 'object') return
          setSize(size => ({ ...size, height }))
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={20}
        max={1000}
      />
    </>
  )
}

export default SizeForm
