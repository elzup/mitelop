import styled from 'styled-components'
import { GadgetLayout } from '../types'
import { tokens } from '../utils/tokens'

type Props = {
  layouts: GadgetLayout[]
  value: string
  /** 今の窓 (配置) のアス比 width/height。推奨範囲内のレイアウトを緑で示す */
  currentAspect?: number
  onSelect: (id: string) => void
}

const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1))

/** レイアウトを名前＋推奨アス比 (ミニ矩形) で並べ、現在のアス比が推奨内かを示す */
export function LayoutPicker({
  layouts,
  value,
  currentAspect,
  onSelect,
}: Props) {
  return (
    <Root>
      <span className="head">レイアウト</span>
      <div className="list">
        {layouts.map((l) => {
          const [min, max] = l.aspect
          const inRange =
            currentAspect !== undefined &&
            currentAspect >= min &&
            currentAspect <= max
          const mid = (min + max) / 2
          const rw = 26
          const rh = Math.max(9, Math.min(26, rw / mid))

          return (
            <button
              key={l.id}
              type="button"
              className="opt"
              data-selected={value === l.id}
              onClick={() => onSelect(l.id)}
            >
              <span className="rect" style={{ width: rw, height: rh }} />
              <span className="name">{l.name}</span>
              <span className="asp">
                {fmt(min)}–{fmt(max)}
                {inRange && <b className="fit">適</b>}
              </span>
            </button>
          )
        })}
      </div>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 4px;
  border-bottom: dashed 1px ${tokens.color.border};

  .head {
    font-size: 11px;
    color: ${tokens.color.textWeak};
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .opt {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 6px;
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.sm};
    background: ${tokens.color.surface};
    cursor: pointer;
    text-align: left;
  }
  .opt[data-selected='true'] {
    border-color: ${tokens.color.primary};
    background: ${tokens.color.primaryWeak};
  }
  .rect {
    flex-shrink: 0;
    display: inline-block;
    background: ${tokens.color.primaryRing};
    border-radius: 1px;
  }
  .name {
    flex-grow: 1;
    font-size: 13px;
    color: ${tokens.color.text};
  }
  .asp {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: ${tokens.color.textWeak};
  }
  .fit {
    padding: 0 4px;
    border-radius: 6px;
    background: #1f9d55;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
  }
`

export default LayoutPicker
