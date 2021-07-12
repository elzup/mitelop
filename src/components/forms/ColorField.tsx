import { TextField, Typography } from '@material-ui/core'
import React from 'react'

type Props = {
  label: string
  value: string
  onChange: (v: string) => void
  onMouseDown?: () => void
}
const ColorField = ({ label, value, onChange, onMouseDown }: Props) => (
  <div
    style={{
      display: 'grid',
      width: '200px',
      gridTemplateColumns: '80px auto auto',
    }}
  >
    <Typography>{label}</Typography>
    <TextField value={value} onChange={(e) => onChange(e.target.value)} />
    <input
      value={value}
      type="color"
      onMouseDown={onMouseDown}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

export default ColorField
