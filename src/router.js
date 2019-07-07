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