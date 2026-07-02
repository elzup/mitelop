import CheckedIcon from '@material-ui/icons/CheckCircle'
import NoCheckIcon from '@material-ui/icons/RadioButtonUnchecked'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { ChecksConfig } from '../../types'
import { arrayToObj, arrToggle } from '../../utils'

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
  setConfig: Dispatch<SetStateAction<ChecksConfig>>
}

function ChecksAtom({ config, setConfig }: Props) {
  const titles = config.text.split('\n')
  const checks = arrayToObj(config.checks)

  const toggle = (title: string) =>
    setConfig((v) => ({ ...v, checks: arrToggle(v.checks, title) }))

  return (
    <Style
      data-layout={config.layout}
      style={{ fontSize: `${config.fontSize}px` }}
    >
      <div className="list">
        {titles.map((title, i) => (
          <CheckItem
            key={i}
            onClick={() => toggle(title)}
            checked={checks[title]}
            title={title}
          />
        ))}
      </div>
    </Style>
  )
}

const Style = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;

  .list {
    display: grid;
  }
  .item {
    display: flex;
    align-items: center;
    min-height: 1.6em;
    width: 100%;
    /* アイコン・文字とも親 (config.fontSize) に追従させる */
    font-size: 1em;
    padding-left: 0.4em;
    gap: 0.4em;
    cursor: pointer;
    .MuiSvgIcon-root {
      font-size: 1.2em;
    }
    &[data-checked='true'] {
      background: #dfdfdf;
      color: #656565;
    }
    span {
      vertical-align: middle;
    }
  }
  &[data-layout='vertical'] {
    .list {
      grid-auto-flow: column;
    }
  }
`

export default ChecksAtom
