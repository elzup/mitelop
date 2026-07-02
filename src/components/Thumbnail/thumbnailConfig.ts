import { Size, ThumbnailConfig } from '../../types'

export const thumbnailDefaultConfig: ThumbnailConfig = {
  width: 1280,
  height: 720,
  bgColor: '#2b0065',
  bgImage: '',
  imageFit: 'cover',
  title: {
    text: 'タイトル',
    fontSize: 120,
    color: '#ffffff',
    strokeColor: '#000000',
    strokeWidth: 12,
    bold: true,
    anchor: 'middle-center',
  },
  subtitle: {
    text: '',
    fontSize: 56,
    color: '#ffe14d',
    strokeColor: '#000000',
    strokeWidth: 8,
    bold: true,
    anchor: 'bottom-center',
  },
}

/** よく使う書き出しサイズ (YouTube サムネ・SNS など)。 */
export const THUMBNAIL_SIZE_PRESETS: { label: string; size: Size }[] = [
  { label: 'YouTube 16:9 (1280×720)', size: { width: 1280, height: 720 } },
  { label: '正方形 1:1 (1080×1080)', size: { width: 1080, height: 1080 } },
  { label: '縦 9:16 (1080×1920)', size: { width: 1080, height: 1920 } },
  { label: 'OGP 1.91:1 (1200×630)', size: { width: 1200, height: 630 } },
]
