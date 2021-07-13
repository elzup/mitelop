import styled from 'styled-components'
import { ChecksConfig } from '../../types'
import { arrayToObj } from '../../utils'
import SizeDef from '../SizeDef'

type Props = {
  config: ChecksConfig
  onClickItem: (id: string) => void
}
function CheckListAtom({ config, onClickItem }: Props) {
  const titles = config.text.split('\n')
  const checks = arrayToObj(config.checks)

  return (
    <SizeDef>
      <Style data-layout={config.layout}>
        <div className="list">
          {titles.map((title, i) => (
            <div
              key={i}
              className="item"
              onClick={() => onClickItem(title)}
              data-checked={checks[title]}
            >
              <div>
                <span>{title || '-'}</span>
              </div>
            </div>
          ))}
        </div>
      </Style>
    </SizeDef>
  )
}

CheckListAtom.defaultProps = {}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  .list {
    display: grid;
    height: 100%;
  }
  .item {
    font-size: 30px;
    padding-left: 8px;
    border: solid 1px #444;
    &[data-checked='true'] {
      background: green;
    }
    span {
      vertical-align: middle;
    }
  }
  &[data-layout='vertical'] {
    div {
      grid-auto-flow: column;
    }
  }
`

export default CheckListAtom
