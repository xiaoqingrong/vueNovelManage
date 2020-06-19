
module.exports = {
  // 公共路径(必须有的)
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave:false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  devServer: {
    // 项目运行时候的端口号
    port: 8086
  },
  lintOnSave: false
}