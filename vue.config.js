module.exports = {
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.56.1:3000', //目标接口域名
    //     changeOrigin: true,             //是否跨域
    //     secure: false,                   //是否https接口
    //     pathRewrite: {                  //路径重置
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  
}