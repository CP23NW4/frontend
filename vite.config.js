import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 2304, 
    
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/frontend/' : '/',
  // base: '/',
})
