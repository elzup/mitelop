import React from 'react'
import styled from 'styled-components'
import { tokens } from '../../utils/tokens'

// NOTE: うまくジェネリクスできてない
type Props<T extends string> = {
  name: string
  options: T[]
  value: T
  divStyle?: React.CSSProperties
  onSelect: (option: T) => void
}

/** ラジオではなくセグメント (トグル) ボタン群で 1 つを選ぶ。 */
export const RadioGroup = <T extends string>({
  options,
  onSelect,
  divStyle,
  value,
}: Props<T>) => {
  return (
    <Group style={divStyle}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          data-active={value === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </Group>
  )
}

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  button {
    padding: 3px 10px;
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.sm};
    background: ${tokens.color.surface};
    color: ${tokens.color.text};
    font-size: 12px;
    line-height: 1.4;
    cursor: pointer;
    transition: background 0.1s;
  }
  button:hover {
    background: ${tokens.color.primaryWeak};
  }
  button[data-active='true'] {
    background: ${tokens.color.primary};
    border-color: ${tokens.color.primary};
    color: #fff;
  }
`
