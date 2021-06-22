import { Resizable } from 're-resizable'
import { Size } from '../types'
import { Preview } from '.'

type Props = {
  size: Size
  url: string
  onChangeSize: (size: Size) => void
}
function PreviewResizable({ size, onChangeSize, url }: Props) {
  return (
    <Preview>
      <Resizable
        defaultSize={size}
        enable={{ bottomRight: true, bottom: true, right: true }}
        onResizeStop={(e, dr, ref, d) => {
          onChangeSize({
            height: size.height + d.height,
            width: size.width + d.width,
          })
        }}
      >
        <iframe src={url} />
      </Resizable>
    </Preview>
  )
}

export default PreviewResizable
