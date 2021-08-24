import React from 'react'

// NOTE: うまくジェネリクスできてない
type Props<T extends string> = {
  name: string
  options: T[]
  value: T
  divStyle?: React.CSSProperties
  onSelect: (option: T) => void
}

export const RadioGroup = <T extends string>({
  name,
  options,
  onSelect,
  divStyle,
  value,
}: Props<T>) => {
  return (
    <div style={{ display: 'flex', ...divStyle }}>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            name={option}
            value={option}
            id={`${name}-${option}`}
            checked={value === option}
            onChange={() => onSelect(option)}
          />
          <label htmlFor={`${name}-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  )
}
