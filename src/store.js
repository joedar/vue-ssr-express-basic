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