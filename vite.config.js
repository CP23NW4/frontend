import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://54.179.85.138', // http to VM's IP
        rewrite: path => path.replace(/^\/api/, ''),
      changeOrigin: true,
      secure: false, // Set this flag to false to allow HTTP requests
      }
    },
    port: 2304, 
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/frontend/' : '/',
  base: '/',
})
