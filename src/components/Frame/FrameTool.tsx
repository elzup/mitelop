import { FrameGadgetConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import FrameAtom from './FrameAtom'
import { frameDefaultConfig } from './frameConfig'

type Props = { windowMode?: boolean }

function FrameTool(_props: Props) {
  const { config, mode, setMode } = useActiveSlot<FrameGadgetConfig>(
    'gad-frame',
    frameDefaultConfig
  )

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <FrameAtom config={config} />
      <ConfigModal mode={mode} miniOver>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-frame" />
        </div>
      </ConfigModal>
    </div>
  )
}

export default FrameTool
