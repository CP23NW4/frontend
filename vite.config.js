import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
       '/socket': {
        target: 'ws://frontend-container:2304',
        ws: true,
        changeOrigin: true,
       },
     // '/api': {
       // target: 'http://54.179.85.138', // http to VM's IP
       // rewrite: path => path.replace(/^\/api/, ''),
      //changeOrigin: true,
      //}
    },
    host: '0.0.0.0',
    port: 2304, 
  },
  base: '/',
})
