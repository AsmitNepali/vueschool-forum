import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    sourceData
  },
  getters: {
  },
  mutations: {
    SET_POST (state, post) {
      state.sourceData.posts.push(post)
    },
    APPEND_POST_TO_THREAD (state, {postId, threadId}) {
      const thread = state.sourceData.threads.find(thread => thread.id === threadId)
      console.log(threadId)
      thread.posts.push(postId)
    }
  },
  actions: {
    createPost ({commit}, post) {
      post.id = 'gggg' + Math.random()
      commit('SET_POST', post)
      commit('APPEND_POST_TO_THREAD', { postId:post.id, threadId: post.threadId })
    }
  },
  modules: {
  }
})
