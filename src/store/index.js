import {createStore} from 'vuex'
import sourceDate from '@/data.json'

export default createStore({
    state: {
        ...sourceDate,
        authId: 'jVa6Go6Nl1Urkag1R2p9CHTf4ny1'
    },
    getters: {
        authUser: state => {
            const user = state.users.find(user => user.id === state.authId)
            if (!user) return null
            return {
                ...user,
                get posts() {
                    return state.posts.filter(post => post.userId === user.id)
                },
                get threads() {
                    return state.threads.filter(thread => thread.userId === user.id)
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
        SET_POST(state, {post}) {
            const index = state.posts.findIndex(p => p.id === post.id)
            if (post.id && index !== -1) {
                state.posts[index] = post
            } else {
                state.posts.push(post)
            }
        },
        SET_USER(state, {user, userId}) {
            const userIndex = state.users.findIndex(user => user.id === userId)
            state.users[userIndex] = user

        },
        APPEND_POST_TO_THREAD(state, {postId, threadId}) {
            const thread = state.threads.find(thread => thread.id === threadId)
            thread.posts = thread.posts || []
            thread.posts.push(postId)
        },
        APPEND_THREAD_TO_FORUM(state, {forumId, threadId}) {
            const forum = state.forums.find(forum => forum.id === forumId)
            forum.threads = forum.threads || []
            forum.threads.push(threadId)
        },
        APPEND_THREAD_TO_USER(state, {userId, threadId}) {
            const user = state.users.find(user => user.id === userId)
            user.threads = user.threads || []
            user.threads.push(threadId)
        },
        SET_THREAD(state, {thread}) {

            const index = state.threads.findIndex(t => t.id === thread.id)
            if (thread.id && index !== -1) {
                state.threads[index] = thread

            } else {
                state.threads.push(thread)
            }
        }
    },
    actions: {
        createPost({commit, state}, post) {
            post.id = 'gggg' + Math.random()
            post.userId = state.authId
            post.publishedAt = Math.floor(Date.now() / 1000),
            commit('SET_POST', post)
            commit('APPEND_POST_TO_THREAD', {postId: post.id, threadId: post.threadId})
        },
        updateUser({commit}, user) {
            commit('SET_USER', {user, userId: user.id})
        },
        async createThread({commit, state, dispatch}, {text, title, forumId}) {
            const id = 'gggg' + Math.random()
            const userId = state.authId
            const publishedAt = Math.floor(Date.now() / 1000)
            const thread = {forumId, title, publishedAt, userId, id}

            commit('SET_THREAD', thread)
            commit('APPEND_THREAD_TO_FORUM', {forumId, threadId: thread.id})
            commit('APPEND_THREAD_TO_USER', {userId, threadId: thread.id})
            dispatch('createPost', {text, threadId: id})
            return state.threads.find(thread => thread.id === id)
        },

        async updateThread({commit, state}, {title, text, id}) {

            const thread = state.threads.find(thread => thread.id === id)
            const post = state.posts.find(post => post.id === thread.posts[0])
            const newThread = {...thread, title}
            const newPost = {...post, text}
            commit('SET_THREAD', {thread: newThread})
            commit('SET_POST', {post: newPost})
            return newThread
        }
    },
    modules: {}
})
