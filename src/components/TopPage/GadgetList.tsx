import styled from 'styled-components'
import { isTauri } from '../../utils/platform'
import { gadgets } from '../gadgets'
import GadgetCard from './GadgetCard'

function GadgetList() {
  return (
    <Style>
      {gadgets.map(({ key, icon, title, path, Component, nativeOnly }) => {
        const webDisabled = Boolean(nativeOnly) && !isTauri()

        return (
          <div key={key} className="cell" data-native-only={webDisabled}>
            <GadgetCard icon={icon} title={title} path={path}>
              <Component />
            </GadgetCard>
            {webDisabled && <span className="badge">Native</span>}
          </div>
        )
      })}
    </Style>
  )
}
const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .cell {
    position: relative;
  }
  /* web ではネイティブ専用ガジェットを薄く表示 (プレビューは見せる) */
  .cell[data-native-only='true'] {
    opacity: 0.55;
  }
  .badge {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 2;
    padding: 1px 6px;
    border-radius: 8px;
    background: rgba(43, 0, 101, 0.75);
    color: #fff;
    font-size: 10px;
    pointer-events: none;
  }
`

export default GadgetList
