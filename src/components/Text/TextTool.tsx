import { TextGadgetConfig } from '../../types'
import { ConfigModal } from '../ConfigModal'
import { useActiveSlot } from '../hooks/useActiveSlot'
import { OpenConfigButton } from '../OpenConfigButton'
import TextAtom from './TextAtom'
import { textDefaultConfig } from './textConfig'

type Props = { windowMode?: boolean }

function TextTool(_props: Props) {
  const { config, mode, setMode } = useActiveSlot<TextGadgetConfig>(
    'gad-text',
    textDefaultConfig
  )

  return (
    <div
      style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
      onMouseEnter={() => setMode('over')}
      onMouseLeave={() => setMode('main')}
    >
      <TextAtom config={config} />
      <ConfigModal mode={mode} miniOver>
        <div className="over">
          <OpenConfigButton gadgetKey="gad-text" />
        </div>
      </ConfigModal>
    </div>
  )
}

export default TextTool
