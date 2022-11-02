const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack(config) {
    // 默认为 eval-cheap-module-source-map 
    // 使用 eval 为在 sourcemap 的映射中添加上 hash。无法定位到对应的文件。只能定位到虚拟的一个文件
    config.devtool = 'source-map'
  }
})
