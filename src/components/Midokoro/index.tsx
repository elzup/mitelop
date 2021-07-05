import { useEffect, useState } from 'react'
import { useSeconds } from 'use-seconds'
import { MidokoroConfig, MidokoroPlot } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { pad02, round4 } from '../../utils'
import MidokoroAtom from './MidokoroAtom'

const initConfig: MidokoroConfig = {
  dateVisible: true,
  bgColor: '#aaaaff',
  fontColor: '#000066',
}

type Props = {}

const currentTimes = (
  now: Date
): {
  ymdh: string
  minute: number
  id: string
  perHour: number
} => {
  const minute = new Date().getMinutes()
  const sec = new Date().getSeconds()
  const id = `${+now}`
  const ymdh = `${now.getFullYear()}${pad02(now.getMonth() + 1)}${pad02(
    now.getDate()
  )}_${pad02(now.getHours())}`

  const perHour = round4((minute * 60 + sec) / 3600)

  return {
    minute,
    id,
    ymdh,
    perHour,
  }
}

type MidokoroHourPlots = { [id: string]: MidokoroPlot }
type MidokoroData = { [ymdh: string]: MidokoroHourPlots }

function MidokoroTool(_props: Props) {
  const [time] = useSeconds()
  const [config, setConfig] = useLocalStorage<MidokoroConfig>(
    'config-midokoro',
    initConfig
  )
  const [hourPlots, setHourPlots] = useState<MidokoroHourPlots>({})
  const [plots, setPlots] = useLocalStorage<MidokoroData>(
    'data-midokoro_plots',
    {}
  )
  const minute = time.getMinutes()
  const { ymdh } = currentTimes(time)

  useEffect(() => {
    setHourPlots(plots[ymdh] || {})
  }, [ymdh])

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <MidokoroAtom
        config={config}
        progressRate={(minute * 100) / 60}
        plots={Object.values(hourPlots)}
        onChangePlot={(newPlot) => {
          const now = new Date()
          const { ymdh } = currentTimes(now)
          const newHourPlots = { ...plots[ymdh] }

          newHourPlots[newPlot.id] = newPlot
          setHourPlots(newHourPlots)
          setPlots({ ...plots, [ymdh]: newHourPlots })
        }}
        onAddPlot={() => {
          const now = new Date()
          const { minute, id, ymdh, perHour } = currentTimes(now)
          const newPlot: MidokoroPlot = {
            rate: perHour * 100,
            label: `${perHour}`,
            id,
          }
          const newHourPlots = { ...plots[ymdh] }
          const isDup = Object.values(newHourPlots).find(
            (v) => v.label === newPlot.label
          )

          if (isDup) return

          newHourPlots[id] = newPlot

          setHourPlots(newHourPlots)
          setPlots({ ...plots, [ymdh]: newHourPlots })
        }}
        onDeletePlot={(id) => {
          const { ymdh } = currentTimes(time)
          const newHourPlots = { ...plots[ymdh] }

          delete newHourPlots[id]
          setPlots((plots) => ({ ...plots, [ymdh]: newHourPlots }))
          setHourPlots(newHourPlots)
        }}
      />
    </div>
  )
}

export default MidokoroTool
