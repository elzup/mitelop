import { CSSProperties, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  TextAlign,
  TextGadgetConfig,
  TextScroll,
  TextVAlign,
} from '../../types'
import { useAppTheme } from '../hooks/useAppTheme'
import { activePreset } from './textConfig'

type Props = { config: TextGadgetConfig }

/** 表(グリッド)ブロック自体の水平位置 */
const justifyOf: Record<TextAlign, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}
/** 表(グリッド)ブロック自体の垂直位置 */
const alignItemsOf: Record<TextVAlign, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
}

const SCROLL_SPEED = 120 // px/sec (枠幅に依らず一定速度にする)

// 単一コピーを枠の外(start)から反対の外(end)まで通すので、常に 1 つだけ流れる
const marqueeX = keyframes`
  from { transform: translateX(var(--start, 100%)); }
  to { transform: translateX(var(--end, -100%)); }
`
const marqueeY = keyframes`
  from { transform: translateY(var(--start, 100%)); }
  to { transform: translateY(var(--end, -100%)); }
`

/** 枠と内容の実寸を測り、端から端まで流す距離(px)と一定速度の duration を算出する */
function useScrollStyle(scroll: TextScroll) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>({})

  useEffect(() => {
    if (scroll === 'none') {
      setStyle({})

      return
    }
    const container = containerRef.current
    const track = trackRef.current

    if (!container || !track) return

    const update = () => {
      const horizontal = scroll === 'marquee'
      const view = horizontal ? container.clientWidth : container.clientHeight
      const len = horizontal ? track.scrollWidth : track.scrollHeight
      const duration = Math.max(2, (view + len) / SCROLL_SPEED)

      setStyle({
        // keyframes が参照する開始/終了位置と一定速度の duration
        '--start': `${view}px`,
        '--end': `${-len}px`,
        animationDuration: `${duration}s`,
      } as CSSProperties)
    }

    update()
    const observer = new ResizeObserver(update)

    observer.observe(container)
    observer.observe(track)

    return () => observer.disconnect()
  }, [scroll])

  return { containerRef, trackRef, style }
}

function TextAtom({ config }: Props) {
  const { resolve } = useAppTheme()
  const { rows, cols, fontSize, align, blockAlign, vAlign, scroll } = config
  const { border, fullWidth } = config
  const bgColor = resolve(config.bgColor)
  const fontColor = resolve(config.fontColor)
  const cells = activePreset(config)?.cells ?? []
  const count = Math.max(1, rows * cols)
  const { containerRef, trackRef, style: scrollStyle } = useScrollStyle(scroll)

  return (
    <Style
      ref={containerRef}
      data-scroll={scroll}
      data-border={border}
      data-full={fullWidth}
      style={{
        background: bgColor,
        color: fontColor,
        // @ts-ignore CSS custom property
        '--cols': cols,
        '--rows': rows,
        '--font-size': `${fontSize}px`,
        // @ts-ignore CSS custom property
        '--justify': justifyOf[blockAlign],
        // @ts-ignore CSS custom property
        '--align-items': alignItemsOf[vAlign],
        // @ts-ignore CSS custom property
        '--bg': bgColor,
        textAlign: align,
      }}
    >
      <div className="track" ref={trackRef} style={scrollStyle}>
        <div className="grid">
          {Array.from({ length: count }, (_, i) => (
            <div className="cell" key={i}>
              {cells[i] ?? ''}
            </div>
          ))}
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: var(--align-items, center);
  justify-content: var(--justify, center);

  .track {
    width: max-content;
    max-width: 100%;
  }
  .grid {
    /* フル幅で伸ばさず内容幅にする。これで揃え (justify) で表ごと寄せられる */
    width: max-content;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(var(--cols), minmax(0, auto));
    grid-auto-rows: minmax(0, auto);
    align-items: center;
  }

  /* 横幅いっぱい: 列を 1fr 均等配分して枠幅に広げる (marquee は除く) */
  &[data-full='true']:not([data-scroll='marquee']) {
    .track {
      width: 100%;
      max-width: 100%;
    }
    .grid {
      width: 100%;
      max-width: 100%;
      grid-template-columns: repeat(var(--cols), 1fr);
    }
  }
  .cell {
    font-size: var(--font-size);
    line-height: 1.2;
    padding: 0.1em 0.3em;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* セル間に罫線。gap を罫線色(=文字色)で塗り、セル背景で隙間を埋める。
     空セルが線色で塗り潰されないよう、セルをセル領域いっぱいに伸ばす。 */
  &[data-border='true'] {
    .grid {
      gap: 1px;
      background: currentColor;
      align-items: stretch;
    }
    .cell {
      background: var(--bg);
    }
  }

  &[data-scroll='vertical'] {
    /* 原点を上端に固定して transform 距離を正確にする */
    align-items: flex-start;
    .track {
      animation-name: ${marqueeY};
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      will-change: transform;
    }
  }

  &[data-scroll='marquee'] {
    /* 原点を左端に固定して transform 距離を正確にする */
    justify-content: flex-start;
    .track {
      flex: none;
      max-width: none;
      animation-name: ${marqueeX};
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      will-change: transform;
    }
    .grid {
      grid-auto-flow: column;
      white-space: nowrap;
      max-width: none;
    }
    .cell {
      white-space: nowrap;
    }
  }
`

export default TextAtom
