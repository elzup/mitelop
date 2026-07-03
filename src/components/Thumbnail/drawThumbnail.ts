import {
  ThumbnailAnchor,
  ThumbnailConfig,
  ThumbnailImageFit,
  ThumbnailTextLayer,
} from '../../types'

/** テキストの余白 (短辺に対する割合)。 */
const PADDING_RATIO = 0.06
const LINE_HEIGHT_RATIO = 1.15

type HorizAlign = 'left' | 'center' | 'right'
type VertAlign = 'top' | 'middle' | 'bottom'

const anchorParts = (anchor: ThumbnailAnchor): [VertAlign, HorizAlign] => {
  const [vert, horiz] = anchor.split('-') as [VertAlign, HorizAlign]

  return [vert, horiz]
}

const fitRect = (
  fit: ThumbnailImageFit,
  iw: number,
  ih: number,
  cw: number,
  ch: number
): [number, number, number, number] => {
  const imageRatio = iw / ih
  const canvasRatio = cw / ch
  const useWidth =
    fit === 'cover' ? imageRatio < canvasRatio : imageRatio > canvasRatio
  const w = useWidth ? cw : ch * imageRatio
  const h = useWidth ? cw / imageRatio : ch

  return [(cw - w) / 2, (ch - h) / 2, w, h]
}

const drawTextLayer = (
  ctx: CanvasRenderingContext2D,
  layer: ThumbnailTextLayer,
  width: number,
  height: number
) => {
  if (!layer.text.trim()) return

  const pad = Math.round(Math.min(width, height) * PADDING_RATIO)
  const [vert, horiz] = anchorParts(layer.anchor)
  const lines = layer.text.split('\n')
  const lineHeight = layer.fontSize * LINE_HEIGHT_RATIO
  const blockHeight = lineHeight * lines.length

  ctx.font = `${layer.bold ? 'bold ' : ''}${layer.fontSize}px sans-serif`
  ctx.textAlign = horiz
  ctx.textBaseline = 'alphabetic'
  ctx.lineJoin = 'round'

  const x = horiz === 'left' ? pad : horiz === 'right' ? width - pad : width / 2
  const topY =
    vert === 'top'
      ? pad
      : vert === 'bottom'
      ? height - pad - blockHeight
      : (height - blockHeight) / 2

  lines.forEach((line, i) => {
    const baseY = topY + lineHeight * i + layer.fontSize

    if (layer.strokeWidth > 0) {
      ctx.strokeStyle = layer.strokeColor
      ctx.lineWidth = layer.strokeWidth
      ctx.strokeText(line, x, baseY)
    }
    ctx.fillStyle = layer.color
    ctx.fillText(line, x, baseY)
  })
}

/** config と読み込み済み背景画像から canvas へサムネイルを描画する。 */
export const drawThumbnail = (
  ctx: CanvasRenderingContext2D,
  config: ThumbnailConfig,
  image: HTMLImageElement | null
) => {
  const { width, height } = config

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = config.bgColor
  ctx.fillRect(0, 0, width, height)

  if (image) {
    const [x, y, w, h] = fitRect(
      config.imageFit,
      image.width,
      image.height,
      width,
      height
    )

    ctx.drawImage(image, x, y, w, h)
  }

  drawTextLayer(ctx, config.title, width, height)
  drawTextLayer(ctx, config.subtitle, width, height)
}
