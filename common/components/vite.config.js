import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig(() => {
  return {
    plugins: [vue()],
    build: {
      // lib 打包
      lib: {
        entry: 'src/index.js',
        name: 'named',
        formats: ['es', 'umd'],
        fileName: (format) => `components.${format}.js`
      },
      rollupOptions: {

        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          exports: 'named',
          globals: {
            vue: 'Vue'
          },

        }
      },
      // 根据环境控制是否压缩代码
      minify: false
    },
  }
})