import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => ({
  // 一部の依存 (@elzup/kit, styled-components 等) が参照する process.env.NODE_ENV を
  // ブラウザ向けに実体化する。無いと resize 等の経路で "process is not defined" になる。
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            { displayName: true, preprocess: false },
          ],
        ],
      },
    }),
    // eslint-disable-next-line new-cap
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/icon.png', 'images/icon-4x.png'],
      manifest: {
        short_name: 'Mitelop',
        name: 'Mitelop',
        start_url: '/',
        display: 'standalone',
        theme_color: '#2B0065',
        icons: [
          {
            src: '/images/icon-4x.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/images/icon-512w.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        protocol_handlers: [
          {
            protocol: 'mitelop',
            url: '/%s',
          },
        ],
        shortcuts: [
          {
            name: 'Clock',
            short_name: 'clock',
            url: '/clock',
          },
          {
            name: 'Timer',
            short_name: 'timer',
            url: '/timer',
          },
        ],
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
}))
