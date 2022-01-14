const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 4000,
        public: '0.0.0.0:4000'
    },
    publicPath: "/",
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ]
    }
}