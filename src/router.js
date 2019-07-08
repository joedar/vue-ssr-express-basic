import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import('./routes/Home.vue')
const Search = () => import('./routes/Search.vue')
const Product = () => import('./routes/Product.vue')
const NotFound = () => import('./routes/NotFound.vue')

// 引入routes配置
// const routes = require('./routes')

export const createRouter = () => {
  return new Router({
    mode : 'history'
    ,fallback : false
    ,routes : [
        { path: '/', component: Home, meta : { title : '首页Page' } }
        ,{ path: '/search', component: Search, meta : { title : '搜索Page' } }
        ,{ path: '/product', component: Product, meta : { title : '产品Page' } }
        ,{ path: '*', component: NotFound, meta : { title : '找不到Page' } }
    ]
  })
}