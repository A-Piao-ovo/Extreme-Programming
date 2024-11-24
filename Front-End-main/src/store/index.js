import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {},
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    removeUser: state => {
      state.user = null
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
})
