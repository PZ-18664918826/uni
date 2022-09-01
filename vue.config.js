/* eslint-disable global-require */
const path = require('path');
const TransformPages = require('uni-read-pages');

const { webpack } = new TransformPages();

module.exports = {
  transpileDependencies: ['uview-ui', '@dcloudio/uni-ui'],
  pluginOptions: {},
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        parser: require('postcss-comment'),
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: ['last 15 versions']
          }),
          require('postcss-import')({
            resolve(id) {
              if (id.startsWith('~@/')) {
                return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3));
              }
              if (id.startsWith('@/')) {
                return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2));
              }
              if (id.startsWith('/') && !id.startsWith('//')) {
                return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1));
              }
              return id;
            }
          }),
          require('@dcloudio/vue-cli-plugin-uni/packages/postcss'),
          require('postcss-nested'),
          require('postcss-windicss-postcss7'),
          require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
        ]
      },
      sass: {}
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'meta', 'aliasPath']
          });
          return JSON.stringify(tfPages.routes);
        }, true)
      })
    ]
  },
  devServer: {
    port: 8100, // 本地调试的端口
    open: true,
    public: 'http://192.168.100.87:8100',
    host: '0.0.0.0'
  }
};
