import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { compression } from 'vite-plugin-compression2'

export default defineConfig(({ mode }) => {
  const plugins = [react()]

  // Add compression for production builds (gzip + brotli)
  if (mode === 'production') {
    plugins.push(
      compression({
        algorithm: 'gzip',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
      })
    )
  }

  if (mode === 'production' && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
      sentryVitePlugin({
        org: process.env.SENTRY_ORG || 'whoza-ai',
        project: 'whoza-ai',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      })
    )
  }

  return {
    plugins,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'supabase-vendor': ['@supabase/supabase-js'],
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 600,
      minify: 'esbuild',
      target: 'es2020',
      cssMinify: true,
      cssCodeSplit: true,
      reportCompressedSize: false,
      assetsInlineLimit: 4096,
      sourcemap: mode === 'production',
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
    },
  }
})
