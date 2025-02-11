import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 设置文件可以跨域，这一步很重要，qiankun的子应用需要跨域才能正常访问
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // IP
    host: "0.0.0.0",
    // 端口
    port: 7002,
    origin: "http://localhost:7002",
  },
})
