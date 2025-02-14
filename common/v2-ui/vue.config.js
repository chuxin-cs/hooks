const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    output: {
        // 定义库的名称，在浏览器环境中作为全局变量名
        library: 'v2-ui', 
        // 支持 UMD 模块规范，兼容多种引入方式
        libraryTarget: 'umd', 
        // 为 UMD 模块命名
        umdNamedDefine: true, 
        // 为 ESModule 版本生成单独的文件名
        filename: 'v2-ui.esm.js', 
        // 确保在 ESModule 环境中能正常使用
        globalObject: 'this', 
    },
  },
})
