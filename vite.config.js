import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => {
  const plugins = [react()]

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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'react-router-vendor';
            }
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('@sentry')) {
              return 'sentry-vendor';
            }
            return 'vendor';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
          if (id.includes('/pages/')) {
            const match = id.match(/\/pages\/([^/]+)/);
            if (match) {
              return `page-${match[1].toLowerCase()}`;
            }
          }
          if (id.includes('/services/')) {
            return 'services';
          }
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    target: 'es2020',
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    assetsInlineLimit: 2048,
    sourcemap: false,
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
}})
