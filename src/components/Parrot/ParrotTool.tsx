/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ParrotConfig } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { ConfigModal } from '../components'
import { useConfig } from '../hooks/useConfig'
import ParrotAtom from './ParrotAtom'

function ParrotTool() {
  const { mode, setMode, config, setConfig } = useConfig<ParrotConfig>(
    'parrot',
    { pitch: 1.0, rate: 1.1 }
  )

  return (
    <Style onMouseEnter={() => setMode('over')}>
      <ParrotAtom config={config} />
      <ConfigModal mode={mode} onLeave={() => setMode('main')}>
        <div className="over">
          <div className="speed-control">
            <TextField
              type="number"
              label="Speed"
              fullWidth
              size="small"
              defaultValue={config.pitch}
              inputProps={{ min: 0.1, max: 10.0, step: 0.1 }}
              onChange={(e) => {
                setConfig({ ...config, pitch: Number(e.target.value) })
              }}
            />
          </div>
          <div className="rate-control">
            <TextField
              type="number"
              label="Rate"
              size="small"
              fullWidth
              inputProps={{ min: 0, max: 2.0, step: 0.1 }}
              defaultValue={config.rate}
              onChange={(e) => {
                setConfig({ ...config, rate: Number(e.target.value) })
              }}
            />
          </div>
        </div>
      </ConfigModal>
    </Style>
  )
}

const Style = styled.div`
  position: relative;
  height: 100%;
  .rate-control {
    display: flex;
    padding: 8px;
  }
  .speed-control {
    display: flex;
    padding: 8px;
  }
`

export default ParrotTool
