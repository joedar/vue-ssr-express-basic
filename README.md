# vue-ssr-webpack-express
A Vue SSR + Vuex + Vue Router + Webpack + Expressjs

## install and build
```npm install```</br>
```npm run build:dev``` - development mode </br>
```npm run build:prod``` - production mode </br></br>

## run server [after webpack]
```npm start``` - start the server

## 为什么要 SSR (Server Side Render) 服务端渲染？
ajax兴起之前，网站的所有页面都是由服务端渲染的！</br>
前端后端无法分离。</br>
页面上什么内容，右键查看源代码就有什么！</br>
</br>
ajax兴起之后，SSR兴起之前，网站的所有页面都是客户端渲染的！</br>
客户端渲染，又叫做单页面应用程序 SPA - (Single Page Application)</br>
前端后端分离。</br>
但是 页面上什么内容，右键查看源代码看不见内容！</br>
</br>
这样，就非常不利于搜索引擎的蜘蛛(spider)抓取了。</br>
因为页面上除了html的标签外，无网页上所看到的内容，蜘蛛想爬都爬不到呀。</br>
(蜘蛛：怪我咯~)</br>
</br>
所有现在，又提及了了服务端渲染了！</br>
怎么？ 又要回到ajax兴起之前了吗？？</br>
NO！NO！NO！</br>

SSR，其含义就是首频服务端渲染！</br>
啥叫首频服务端渲染？</br>
就是：</br>
当你进入首页的时候，首页的所有内容由服务器通过模版引擎发送至客户端，</br>
页面上看到的所有内容，右键查看源代码都是可以看到的！</br>
(蜘蛛：哈哈，我就喜欢这样的页面)</br>
然后你不刷新页面，记住哦！ 不刷新页面！ 不刷新页面！</br>
只是在页面上点击(跳转路由或者列表翻页)所发生的变化就再也不是服务端的事情了，</br>
这些就是纯纯的客户端的操作了，纯纯的SPA了！</br>
</br>
就好比 你进入 xxx.com 服务端会将首页内容发送回客户端，用户点击链接跳转路由 xxx.com/about 异步请求数据客户端渲染页面</br>
当你刷新页面 xxx.com/about 服务端会将about页面的内容发送回客户端，用户点击链接跳转回 xxx.com 异步请求数据客户端渲染页面</br>
</br>
也就是说，用户想要像ajax兴起之前那样服务端渲染，那就每点击一次跳转链接，就手动按F5刷新一下咯~</br>
(用户：我累不累呀~？)


# SSR 步骤
可用 vue-cli 脚手架生成一个项目，并安装 vue-router 和 vuex， 还有express<br>
以及相关依赖


## 步骤一：修改文件
/src/app.js
```

import Vue from 'vue'
import App from './App.vue'
import {createStore} from './store'
import {createRouter} from './router'

export function createApp () {
  const store = createStore()
  const router = createRouter()
  const app = new Vue({
    router
    ,store
    ,render: h => h(App)
  })
  return { app, store, router }
}

```
<br>


/src/router.js
```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 引入routes配置
const routes = require('./routes')

export const createRouter = () => {
  return new Router({
    mode : 'history'
    ,fallback : false
    ,routes
  })
}
```
<br>


/src/store.js
```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules : {
      namespaced: true
      ,state: {}
      ,actions: {}
      ,getters: {}
      ,mutations: {}
    }
  })
}
```
<br>


/src/routes/index.js
```
const Home = () => import('./Home.vue')
const Search = () => import('./Search.vue')
const Product = () => import('./Product.vue')
const NotFound = () => import('./NotFound.vue')

const routes = [
	{ path: '/', component: Home, meta : { title : '首页Page' } }
	,{ path: '/search', component: Search, meta : { title : '搜索Page' } }
	,{ path: '/product', component: Product, meta : { title : '产品Page' } }
	,{ path: '*', component: NotFound, meta : { title : '找不到Page' } }
]

module.exports = routes
```
<br>


/src/routes/xxx.vue
```
<template>
  <div class="about">
    <h3>this is about page</h3>
  </div>
</template>
```
<br>


/src/App.vue
```
<template>
  <div>
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/search">搜索</router-link>
      <router-link to="/product">产品</router-link>
      <router-link to="/haha">其他页面</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
```


## 步骤二：创建文件
创建文件 - 客户端入口文件<br>
/src/entry-client.js
```
import 'core-js/stable/promise'
import { createApp } from './app'
const { app, store, router } = createApp()

//--------------------------------------------------------------------------
// use this instance methods to display the title of the route in real time
// 用此方法 实时显示路由的标题
//--------------------------------------------------------------------------
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
```
<br>


创建文件 - 服务端入口文件<br>
/src/entry-server.js
```
import { createApp } from './app'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()
  const { url } = context

  router.push(url)

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) {
      return reject({ code: 404 })
    }

    return resolve(app)
  }, reject)
})
```
<br>


创建文件 - html模版文件
/template.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <title>{{title}}</title>
  </head>
  <body>
    <div id="app">
      <!--vue-ssr-outlet-->
    </div>
  </body>
</html>
```
<br>


## 步骤二：创建webpack 打包客户端js及服务端js
/webpack/webpack.config.js
```
const merge = require('webpack-merge')
const serverConfig = require('./webpack.server')
const clientConfig = require('./webpack.client')
const { plugins } = require('./part/plugins')
const alias = require('./part/alias')
const isProd = process.env.NODE_ENV === 'production'

const config = {
  mode : isProd ? 'production' : 'development'
  ,watch : isProd ? false : true
  ,devtool : isProd? false : 'source-map'
  ,output : {
    publicPath: '/static/'
  }
  ,resolve: { alias }
  ,plugins
}

module.exports = [merge(config, serverConfig), merge(config, clientConfig)]
```
<br>


客户端js 运行于客户端<br>
/webpack/webpack.client.js
```
const path = require('path')
const optimization = require('./part/optimization')
const { clientPlugins } = require('./part/plugins')
const { clientRules } = require('./part/rules')

module.exports = {
  entry: [
    path.join(__dirname, '..', 'src', 'entry-client.js')
    ,path.join(__dirname, '..', 'src', 'images', 'favicon.ico')
  ]
  ,module: { rules: clientRules }
  ,plugins: clientPlugins
  ,optimization
}
```
<br>


服务端js 运行于服务端<br>
/webpack/webpack.server.js
```
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { serverPlugins } = require('./part/plugins')
const { serverRules } = require('./part/rules')

module.exports = {
  entry : path.join(__dirname, '..', 'src', 'entry-server.js')
  ,target : 'node'
  ,output : {
    filename: 'server.bundle.js'
    ,libraryTarget: 'commonjs2'
  }
  ,module : { rules: serverRules }
  ,externals: nodeExternals({ whitelist: /\.css$/ })
  ,plugins : serverPlugins
}
```


## 步骤三：创建启动服务文件 我用的是express
/server.js
```
const express = require('express')
const path = require('path')
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')

// 服务端口
const port = process.env.PORT || 8000

// 引入模版
const tempPath = path.join(__dirname, 'template.html')
const template = require('fs').readFileSync(tempPath,'utf-8')
// 引入客户端-Manifest
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
// 引入服务端-Bundle
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
// 引入静态目录
const staticPath = path.resolve(__dirname, 'dist')

// 服务使用静态目录
server.use('/static', express.static(staticPath))
server.use('/favicon.ico', express.static(`${staticPath}/favicon.ico`))

// 引入routes配置
const routes = require('./src/routes')

server.get('*', (req, res) => {
  //-------------------------------------
  // 根据 req.url 正确匹配 routes 的标题
  // 以保证刷新页面渲染正确的router标题
  //-------------------------------------
  const title = (function(){
    let str = 'hello page'
    for(let i=0; i<routes.length; i++){
      if (req.url === routes[i].path) str = routes[i].meta.title
    }
    return str
  }())

  const context = { url : req.url, title : title }

  const renderer = createBundleRenderer(serverBundle, {
    template
    ,clientManifest
  })

  renderer.renderToString(context, (error, html) => {
    if(error){
      console.error('Controller.render', { error })
    }
    res.send(html)
  })
})

server.listen(port, () => {
    console.log(`Example app listening on ${port}!`)
})
```


## 步骤三：修改package.json命令
/package.json
```
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "eslint": "eslint --ext .js --ext .vue ./ --max-warnings=0",
    "build:dev": "cross-env NODE_ENV=development webpack --config ./webpack/webpack.config.js && node server.js",
    "build:prod": "cross-env NODE_ENV=production webpack --config ./webpack/webpack.config.js && node server.js"
  },
```