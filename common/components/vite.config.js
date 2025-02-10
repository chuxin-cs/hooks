import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyComponentLibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `my-component-library.${format}.js`
    },
  },
})