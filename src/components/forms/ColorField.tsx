import { TextField } from '@material-ui/core'
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
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
    }}
  >
    <TextField
      label={label}
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <input
      value={value}
      type="color"
      onMouseDown={onMouseDown}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

export default ColorField
