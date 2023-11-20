const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/huadiao/',
    lintOnSave: false,
    outputDir: "huadiao-user",
    assetsDir: "static",
    pages: {
        // 首页
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
        // 个人主页
        homepage: {
            entry: "./src/pages/homepage/index.js",
            template: './src/pages/homepage/index.html',
            filename: "homepage.html",
            title: '花凋~~个人主页'
        },
        // 账号信息
        account: {
            entry: "./src/pages/account/index.js",
            template: './src/pages/account/index.html',
            filename: "account.html",
            title: '花凋~~账号信息'
        },
        // 关注与粉丝
        followfan: {
            entry: "./src/pages/followfan/index.js",
            template: './src/pages/followfan/index.html',
            filename: "followfan.html",
            title: '花凋~~关注与粉丝'
        },
        // 收藏笔记或番剧
        star: {
            entry: "./src/pages/star/index.js",
            template: './src/pages/star/index.html',
            filename: "star.html",
            title: '花凋~~宝藏收藏馆'
        },
        // 消息中心
        message: {
            entry: "./src/pages/message/index.js",
            template: './src/pages/message/index.html',
            filename: "message.html",
            title: '花凋~~倾听万物之声'
        },
        // 创建笔记
        buildnote: {
            entry: "./src/pages/buildnote/index.js",
            template: './src/pages/buildnote/index.html',
            filename: "buildnote.html",
            title: '花凋~~记你所想'
        },
        // 展示单个笔记
        singlenote: {
            entry: "./src/pages/singlenote/index.js",
            template: './src/pages/singlenote/index.html',
            filename: "note.html",
            title: '花凋~~曾经的记录'
        },
        // 展示多个笔记
        notes: {
            entry: "./src/pages/notes/index.js",
            template: './src/pages/notes/index.html',
            filename: "notes.html",
            title: '花凋~~日积月累方显人之本色'
        },
        // 历史记录
        history: {
            entry: "./src/pages/history/index.js",
            template: './src/pages/history/index.html',
            filename: "history.html",
            title: '花凋~~过去的味道'
        },
        // 番剧馆
        animehouse: {
            entry: "./src/pages/animehouse/index.js",
            template: './src/pages/animehouse/index.html',
            filename: "animehouse.html",
            title: '花凋~~保存的都是回忆'
        },
        // 单个番剧
        singleanime: {
            entry: "./src/pages/singleanime/index.js",
            template: './src/pages/singleanime/index.html',
            filename: "singleanime.html",
            title: '花凋~~打造旷世巨作'
        }
    },
    devServer: {
        host: "localhost",
        port: 8081,
        // 自动启动浏览器
        open: true,
        // 代理服务器
        proxy: {
            // 匹配路径后进行代理
            "/huadiao": {
                // 目标服务器
                target: "http://127.0.0.1:9090/huadiao",
                // 是否跨域
                changeOrigin: true,
            }
        }
    }
})
