import { ColorConfig } from '../../types'

type Props = { config: ColorConfig }
function ColorAtom({ config }: Props) {
  console.log(config)

  return (
    <div
      style={{ height: '100%', width: '100%', background: config.color }}
    ></div>
  )
}

export default ColorAtom
