import {createStore} from 'vuex'
import sourceData from '@/data.json'

export default createStore({
    state: {
        sourceData,
        authId: 'jVa6Go6Nl1Urkag1R2p9CHTf4ny1'
    },
    getters: {
        authUser: state => {
            const user = state.sourceData.users.find(user => user.id === state.authId)
            if (!user) return null
            return {
                ...user,
                get posts() {
                    return state.sourceData.posts.filter(post => post.userId === user.id)
                },
                get threads() {
                    return state.sourceData.threads.filter(thread => thread.userId === user.id)
                },

                get postsCount() {
                    return this.posts.length
                },
                get threadsCount() {
                    return this.threads.length
                }
            }
        }
    },
    mutations: {
        SET_POST(state, post) {
            state.sourceData.posts.push(post)
        },
        SET_USER(state, {user, userId}) {
            const userIndex = state.sourceData.users.findIndex(user => user.id === userId)
            state.sourceData.users[userIndex] = user

        },
        APPEND_POST_TO_THREAD(state, {postId, threadId}) {
            const thread = state.sourceData.threads.find(thread => thread.id === threadId)
            thread.posts.push(postId)
        }
    },
    actions: {
        createPost({commit,state}, post) {
            post.id = 'gggg' + Math.random()
            post.userId = state.authId
            post.publishedAt = Math.floor(Date.now() / 1000),
            commit('SET_POST', post)
            commit('APPEND_POST_TO_THREAD', {postId: post.id, threadId: post.threadId})
        },
        updateUser({commit}, user) {
          commit('SET_USER', {user, userId: user.id})
        }
    },
    modules: {}
})
