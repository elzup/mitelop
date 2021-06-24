import { TextField, Typography } from '@material-ui/core'
import React from 'react'
import ColorSelectButton from './ColorSelectButton'

type Props = {
  label: string
  value: string
  mini: boolean
  onChange: (v: string) => void
}
export const ColorField = ({ label, value, mini, onChange }: Props) => (
  <div
    style={{
      display: 'grid',
      width: '200px',
      gridTemplateColumns: '80px auto auto',
    }}
  >
    <Typography>{label}</Typography>
    <ColorSelectButton color={value} onChange={onChange} editable={!mini} />
    <TextField value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

export default ColorField
