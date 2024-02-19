import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // hmr: {
    //     // host: 'localhost'
    //     // port: 443,
    //     protocol: "wss",
    // },
    proxy: {
      '/socket': {
        target: 'ws://frontend-container:2304',
        ws: true,
        changeOrigin: true,
      },
      // '/api': {
      //   target: 'http://10.4.85.24', // http to VM's IP
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      //   changeOrigin: true,
      // },
    },
    host: '0.0.0.0',
    port: 2304,
  },
  base: '/nw4',
})
