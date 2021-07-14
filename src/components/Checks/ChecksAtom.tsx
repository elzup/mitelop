import NoCheckIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckedIcon from '@material-ui/icons/CheckCircle'
import styled from 'styled-components'
import { ChecksConfig } from '../../types'
import { arrayToObj } from '../../utils'
import SizeDef from '../SizeDef'

function CheckItem(props: {
  title: string
  checked: boolean
  onClick: () => void
}) {
  return (
    <div className="item" onClick={props.onClick} data-checked={props.checked}>
      {props.checked ? <CheckedIcon /> : <NoCheckIcon />}
      <div>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

type Props = {
  config: ChecksConfig
  onClickItem: (id: string) => void
}
function ChecksAtom({ config, onClickItem }: Props) {
  const titles = config.text.split('\n')
  const checks = arrayToObj(config.checks)

  return (
    <SizeDef>
      <Style data-layout={config.layout}>
        <div className="list">
          {titles.map((title, i) => (
            <CheckItem
              key={i}
              onClick={() => onClickItem(title)}
              checked={checks[title]}
              title={title}
            />
          ))}
        </div>
      </Style>
    </SizeDef>
  )
}

ChecksAtom.defaultProps = {}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: scroll;

  .list {
    display: grid;
  }
  .item {
    display: flex;
    font-size: 1.2rem;
    align-items: center;
    padding-left: 8px;
    gap: 8px;
    &[data-checked='true'] {
      background: #dfdfdf;
      color: #656565;
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

export default ChecksAtom
