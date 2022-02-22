import { IconButton, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Head from 'next/head'
import { useState } from 'react'
import { useSeconds } from 'use-seconds'
import { ClockConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import ColorField from '../forms/ColorField'
import { useConfig } from '../hooks/useConfig'
import ClockAtom from './ClockAtom'

const pad2 = (n: number) => `${n}`.padStart(2, '0')
const toDateStr = (t: Date) =>
  `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())}`
const timeStr = (t: Date) =>
  [t.getHours(), t.getMinutes(), t.getSeconds()].map(pad2)

const offsetMinutes = new Date().getTimezoneOffset() || -540

function useTimeStr(diffMinutes: number) {
  const [localeTime] = useSeconds()
  const time = new Date(+localeTime + (offsetMinutes - diffMinutes) * 1000 * 60)

  return { dateStr: toDateStr(time), tStrs: timeStr(time) }
}

type Props = {
  windowMode?: boolean
}
function ClockTool({ windowMode }: Props) {
  const { mode, setMode, config, setConfig } = useConfig<ClockConfig>('clock', {
    dateVisible: true,
    bgColor: '#aaaaff',
    fontColor: '#000066',
    diffMinutes: offsetMinutes,
  })

  console.log({ offsetMinutes })
  const { dateStr, tStrs } = useTimeStr(config.diffMinutes)
  const [touched, setTouched] = useState<boolean>(false)

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => {
        if (touched) return
        setMode('main')
      }}
    >
      {windowMode && (
        <Head>
          <meta name="theme-color" content={config.bgColor} />
        </Head>
      )}
      <ClockAtom config={config} dateStr={dateStr} tStrs={tStrs} />

      <ConfigModal mode={mode} miniOver>
        <div className="over" onMouseDown={() => setTouched(true)}>
          <ColorField
            label="Back"
            onChange={(bgColor) => setConfig((v) => ({ ...v, bgColor }))}
            value={config.bgColor}
          />
          <ColorField
            label="Font"
            onChange={(fontColor) => setConfig((v) => ({ ...v, fontColor }))}
            value={config.fontColor}
          />
          <TextField
            type="number"
            label="diffMinutes"
            onChange={(e) =>
              setConfig((v) => ({ ...v, diffMinutes: Number(e.target.value) }))
            }
            value={config.diffMinutes}
          />
          <IconButton
            onClick={() => {
              setMode('main')
              setTouched(false)
            }}
          >
            <Close />
          </IconButton>
        </div>
      </ConfigModal>
    </div>
  )
}

export default ClockTool
