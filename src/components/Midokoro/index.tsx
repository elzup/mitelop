import { useSeconds } from 'use-seconds'
import { MidokoroConfig, MidokoroPlot } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import MidokoroAtom from './MidokoroAtom'

const initConfig: MidokoroConfig = {
  dateVisible: true,
  bgColor: '#aaaaff',
  fontColor: '#000066',
}

type Props = {}
function MidokoroTool(_props: Props) {
  const [time] = useSeconds()
  const [config, setConfig] = useLocalStorage<MidokoroConfig>(
    'config-midokoro',
    initConfig
  )
  const [plots, setPlots] = useLocalStorage<MidokoroPlot[]>(
    'memo-midokoro_plots',
    []
  )
  // 00 ~ 59
  const minute = time.getMinutes()

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <MidokoroAtom
        config={config}
        progressRate={(minute * 100) / 60}
        plots={plots}
        onAddPlot={() => {
          setPlots((v) => [
            ...v,
            { rate: (new Date().getMinutes() * 100) / 60 },
          ])
        }}
        onDeletePlot={(plot) => {
          // NOTE:
          setPlots(plots.filter((p) => p.rate !== plot.rate))
        }}
      />
    </div>
  )
}

export default MidokoroTool
