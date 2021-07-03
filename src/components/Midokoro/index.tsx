import { useSeconds } from 'use-seconds'
import { MidokoroConfig } from '../../types'
import { useLocalStorage } from '../../utils/useLocalStorage'
import MidokoroAtom from './MidokoroAtom'

const initConfig: MidokoroConfig = {
  dateVisible: true,
  bgColor: '#aaaaff',
  fontColor: '#000066',
}

function MidokoroTool() {
  const [time] = useSeconds()
  const [config, setConfig] = useLocalStorage<MidokoroConfig>(
    'config-midokoro',
    initConfig
  )

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <MidokoroAtom
        config={config}
        progressRate={80}
        plots={[]}
        onAddPlot={() => {}}
        onDeletePlot={() => {}}
      />
    </div>
  )
}

export default MidokoroTool
