import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { ThumbnailConfig } from '../../types'
import { drawThumbnail } from './drawThumbnail'

type Props = {
  config: ThumbnailConfig
  className?: string
}

/**
 * config を canvas に描画する。背景画像 (data URL) は読み込んでから描く。
 * forwardRef で <canvas> を公開し、親が toBlob で PNG を書き出せるようにする。
 */
const ThumbnailCanvas = forwardRef<HTMLCanvasElement, Props>(
  ({ config, className }, ref) => {
    const innerRef = useRef<HTMLCanvasElement>(null)
    const [image, setImage] = useState<HTMLImageElement | null>(null)

    useImperativeHandle(ref, () => innerRef.current as HTMLCanvasElement)

    useEffect(() => {
      if (!config.bgImage) {
        setImage(null)

        return
      }
      const img = new Image()

      img.onload = () => setImage(img)
      img.src = config.bgImage
    }, [config.bgImage])

    useEffect(() => {
      const canvas = innerRef.current
      const ctx = canvas?.getContext('2d')

      if (!ctx) return
      drawThumbnail(ctx, config, image)
    }, [config, image])

    return (
      <canvas
        ref={innerRef}
        className={className}
        width={config.width}
        height={config.height}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      />
    )
  }
)

ThumbnailCanvas.displayName = 'ThumbnailCanvas'

export default ThumbnailCanvas
