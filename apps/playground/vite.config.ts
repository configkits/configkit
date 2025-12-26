import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import brotliCompress, { BrotliQuality, CompressionType, GzipLevel } from 'vite-plugin-brotli-compress'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    brotliCompress({
      type: CompressionType.BOTH,
      quality: BrotliQuality.HIGH,
      gzipLevel: GzipLevel.DEFAULT,
    })
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@configkits/core': path.resolve(__dirname, '../../packages/core/src'),
      '@configkits/react': path.resolve(__dirname, '../../packages/react/src'),
      '@configkits/flags': path.resolve(__dirname, '../../packages/flags/src'),
    },
  },
  optimizeDeps: {
    include: ['@configkits/core', '@configkits/react', '@configkits/flags'],
  },

})

