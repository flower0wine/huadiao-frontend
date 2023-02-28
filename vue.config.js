const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    // 域名子路径,
    publicPath: process.env.NODE_ENV === 'production' ? '/huadiao-user/' : '/',
    lintOnSave: false,
    outputDir: "huadiao-user",
    assetsDir: "static",
    pages: {
        index: {
            // 主页入口
            entry: "./src/pages/index/index.js",
            // 主页
            template: './src/pages/index/index.html',
            // 打包后的html文件名称
            filename: "index.html",
            // 主页标题
            title: '花凋~~不一样的世界'
        },
    }
})
