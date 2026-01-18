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
          manualChunks(id) {
            // Vendor chunks
            if (id.includes('node_modules')) {
              // React core
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              // Supabase (lazy load this)
              if (id.includes('@supabase')) {
                return 'supabase-vendor';
              }
              // Other large dependencies
              if (id.includes('react-ga4') || id.includes('@sentry')) {
                return 'analytics-vendor';
              }
              // Everything else
              return 'vendor';
            }
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
