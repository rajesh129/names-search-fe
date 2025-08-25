import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // your BE
        changeOrigin: true,
        // strip /api if your backend is mounted at /api already? NO — you said BE is /api/names/search
        // so keep it as-is (no rewrite).
      },
    },
  }
})
