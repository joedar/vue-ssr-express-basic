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