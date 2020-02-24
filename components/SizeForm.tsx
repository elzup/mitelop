import { Typography, TextField } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import Slider from 'rc-slider'
import { Size } from '../types'

type Props = {
  size: Size
  setSize: Dispatch<SetStateAction<Size>>
}
function SizeForm({ size: { width, height }, setSize }: Props) {
  return (
    <>
      <Typography gutterBottom>ウィジェット幅: {width}</Typography>
      <TextField
        type="number"
        value={width}
        onChange={({ target: { value } }) => {
          if (!value) return
          setSize(size => ({ ...size, width: Number(value) }))
        }}
        inputProps={{
          min: 20,
          max: 1000,
        }}
      />

      <Typography gutterBottom>ウィジェット高さ: {height}</Typography>
      <TextField
        type="number"
        value={height}
        onChange={({ target: { value } }) => {
          if (!value) return
          setSize(size => ({ ...size, height: Number(value) }))
        }}
        inputProps={{
          min: 20,
          max: 1000,
        }}
      />
    </>
  )
}

export default SizeForm
