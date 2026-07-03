import { Button, MenuItem, TextField, Typography } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import ImageIcon from '@material-ui/icons/Image'
import { ChangeEvent, useRef } from 'react'
import styled from 'styled-components'
import { Size, ThumbnailConfig } from '../../types'
import ColorField from '../forms/ColorField'
import { useConfig } from '../hooks/useConfig'
import ThumbnailCanvas from './ThumbnailCanvas'
import ThumbnailLayerEditor from './ThumbnailLayerEditor'
import {
  THUMBNAIL_SIZE_PRESETS,
  thumbnailDefaultConfig,
} from './thumbnailConfig'

type Props = { windowMode?: boolean }

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

function ThumbnailTool(_props: Props) {
  const { config, setConfig } = useConfig<ThumbnailConfig>(
    'gad-thumbnail',
    thumbnailDefaultConfig
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const patch = (next: Partial<ThumbnailConfig>) =>
    setConfig((v) => ({ ...v, ...next }))

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return
    patch({ bgImage: await readFileAsDataUrl(file) })
    e.target.value = ''
  }

  const onDownload = () => {
    const canvas = canvasRef.current

    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = `thumbnail-${config.width}x${config.height}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  const onSelectSize = (size: Size) => patch(size)

  return (
    <Style>
      <div className="preview">
        <ThumbnailCanvas ref={canvasRef} config={config} />
      </div>
      <div className="panel">
        <Typography variant="h6">サムネイル作成</Typography>

        <TextField
          select
          size="small"
          label="サイズ"
          value={`${config.width}x${config.height}`}
          onChange={(e) => {
            const preset = THUMBNAIL_SIZE_PRESETS.find(
              (p) => `${p.size.width}x${p.size.height}` === e.target.value
            )

            if (preset) onSelectSize(preset.size)
          }}
        >
          {THUMBNAIL_SIZE_PRESETS.map((p) => (
            <MenuItem key={p.label} value={`${p.size.width}x${p.size.height}`}>
              {p.label}
            </MenuItem>
          ))}
        </TextField>

        <div className="row">
          <ColorField
            label="背景色"
            value={config.bgColor}
            onChange={(bgColor) => patch({ bgColor })}
          />
        </div>

        <div className="row">
          <Button
            size="small"
            variant="outlined"
            startIcon={<ImageIcon />}
            onClick={() => fileRef.current?.click()}
          >
            背景画像
          </Button>
          {config.bgImage && (
            <>
              <TextField
                select
                size="small"
                label="表示"
                value={config.imageFit}
                onChange={(e) =>
                  patch({
                    imageFit: e.target.value as ThumbnailConfig['imageFit'],
                  })
                }
              >
                <MenuItem value="cover">全体を覆う</MenuItem>
                <MenuItem value="contain">全体を収める</MenuItem>
              </TextField>
              <Button
                size="small"
                color="secondary"
                onClick={() => patch({ bgImage: '' })}
              >
                画像を外す
              </Button>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onUpload}
          />
        </div>

        <ThumbnailLayerEditor
          title="メインテキスト"
          layer={config.title}
          onChange={(title) => patch({ title })}
        />
        <ThumbnailLayerEditor
          title="サブテキスト"
          layer={config.subtitle}
          onChange={(subtitle) => patch({ subtitle })}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<GetAppIcon />}
          onClick={onDownload}
        >
          PNG ダウンロード
        </Button>
      </div>
    </Style>
  )
}

const Style = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(280px, 360px);
  height: 100%;
  overflow: hidden;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    overflow: auto;
  }
  .preview {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
    padding: 16px;
    overflow: hidden;
  }
  .panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    overflow: auto;
  }
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
`

export default ThumbnailTool
