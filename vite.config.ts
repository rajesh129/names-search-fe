// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  // Load .env files (VITE_*)
  const env = loadEnv(mode, process.cwd(), '')

  const isDev = mode === 'development'
  const devProxy = isDev
    ? {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // NOTE: do NOT set cookieDomainRewrite for localhost
        },
      }
    : undefined

  return {
    plugins: [react()],
    // If you deploy under a subpath, set base here (e.g., '/app/')
    base: env.VITE_BASE_PATH || '/',
    server: {
      host: 'localhost',
      port: Number(env.VITE_PORT || 4200),
      open: true,
      strictPort: true,
      proxy: devProxy,
    },
    // Useful to test the production build locally with a proxy
    preview: {
      host: 'localhost',
      port: Number(env.VITE_PREVIEW_PORT || 4173),
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_PREVIEW_API || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    build: {
      sourcemap: isDev ? true : false,
      outDir: 'dist',
      // tweak chunking if you want:
      // rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom'] } } },
    },
  }
})
