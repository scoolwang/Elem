import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    menuIndex: '',
    noticeAllReaded: true,
    hasReply: false
  },
  mutations: {
    changeMenuIndex: (state, arg) => {
      state.menuIndex = arg
    },
    changeNoticeAllReaded: (state, arg) => {
      state.noticeAllReaded = arg
    },
    changeHasReply: (state, arg) => {
      state.hasReply = arg
    }
  }
})
