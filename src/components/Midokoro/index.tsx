import { useEffect, useState } from 'react'
import { useSeconds } from 'use-seconds'
import { MidokoroConfig, MidokoroPlot } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import { pad02 } from '../../utils'
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
} => {
  const minute = new Date().getMinutes()
  const id = `${+now}`
  const ymdh = `${now.getFullYear()}${pad02(now.getMonth() + 1)}${pad02(
    now.getDate()
  )}_${pad02(now.getHours())}`

  return { minute, id, ymdh }
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
        onAddPlot={() => {
          const now = new Date()
          const { minute, id, ymdh } = currentTimes(now)
          const newPlot: MidokoroPlot = {
            rate: (minute * 100) / 60,
            label: `${minute}`,
            id,
          }
          const newHourPlots = { ...hourPlots }

          newHourPlots[id] = newPlot

          setHourPlots(newHourPlots)
          setPlots({ ...plots, [ymdh]: newHourPlots })
        }}
        onDeletePlot={(id) => {
          const newHourPlots = { ...hourPlots }

          delete newHourPlots[id]

          setHourPlots(newHourPlots)
          setPlots({ ...plots, [ymdh]: newHourPlots })
        }}
      />
    </div>
  )
}

export default MidokoroTool
