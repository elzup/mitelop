import { MenuItem, TextField } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { ChecksConfig, ChecksLayout } from '../../types'

type Props = {
  config: ChecksConfig
  setConfig: Dispatch<SetStateAction<ChecksConfig>>
}

function ChecksConfigEditor({ config, setConfig }: Props) {
  const patch = (p: Partial<ChecksConfig>) => setConfig((v) => ({ ...v, ...p }))

  return (
    <Style>
      <div className="row">
        <TextField
          select
          label="並び"
          value={config.layout}
          onChange={(e) => patch({ layout: e.target.value as ChecksLayout })}
        >
          <MenuItem value="horizontal">縦並び</MenuItem>
          <MenuItem value="vertical">横並び</MenuItem>
        </TextField>
        <TextField
          type="number"
          label="文字サイズ"
          value={config.fontSize}
          onChange={(e) => patch({ fontSize: Number(e.target.value) || 1 })}
        />
      </div>
      <TextField
        multiline
        minRows={3}
        label="項目 (1 行 1 つ)"
        value={config.text}
        onChange={(e) => patch({ text: e.target.value })}
      />
    </Style>
  )
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .row {
    display: flex;
    gap: 8px;
  }
  .row > * {
    flex: 1;
  }
`

export default ChecksConfigEditor
