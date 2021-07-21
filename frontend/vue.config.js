const webpack = require('webpack');
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
	//프로덕션 시 소스맵 안보이게 수정
	productionSourceMap: process.env.NODE_ENV != 'production',
	lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.BannerPlugin({
        banner: () => `빌드 날짜: ${new Date(new Date().getTime() + 9 * 3600000)}`
      })
    ],
  },
  outputDir: process.env.NODE_ENV != 'production' ? '../beta' : '../public',
}