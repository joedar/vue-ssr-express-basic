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

## 修改文件

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

