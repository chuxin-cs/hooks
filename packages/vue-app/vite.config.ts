import path from "path"; 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    // 配置别名
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    // 设置文件可以跨域，这一步很重要，qiankun的子应用需要跨域才能正常访问
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // IP
    host: "0.0.0.0",
    // 端口
    port: 7001,
    origin: "http://localhost:7001",
  },
})
