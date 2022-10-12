import {createStore} from 'vuex'
import sourceDate from '@/data.json'
import {findById, upsert} from "@/helpers"

const makeAppendChildToParentMutation = ({parent, child}) => {
    return (state, {childId, parentId}) =>  {
        const resource = findById(state[parent], parentId)
        resource[child] = resource[child] || []
        resource[child].push(childId)
    }
}
export default createStore({
    state: {
        ...sourceDate,
        authId: 'jVa6Go6Nl1Urkag1R2p9CHTf4ny1'
    },
    getters: {
        authUser: state => {
            const user = findById(state.users, state.authId)
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
        SET_POST(state, post) {
            upsert(state.posts, post)
        },
        SET_THREAD(state, thread) {
            upsert(state.threads, thread)
        },
        SET_USER(state, {user, userId}) {
            const userIndex = state.users.findIndex(user => user.id === userId)
            state.users[userIndex] = user
        },
        APPEND_POST_TO_THREAD: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),

        APPEND_THREAD_TO_FORUM(state, {forumId, threadId}) {
            const forum = findById(state.forums, forumId)
            forum.threads = forum.threads || []
            forum.threads.push(threadId)
        },
        APPEND_THREAD_TO_USER(state, {userId, threadId}) {
            const user = findById(state.users, userId)
            user.threads = user.threads || []
            user.threads.push(threadId)
        }
    },
    actions: {
        createPost({commit, state}, post) {
            post.id = 'gggg' + Math.random()
            post.userId = state.authId
            post.publishedAt = Math.floor(Date.now() / 1000),
            commit('SET_POST', post)
            commit('APPEND_POST_TO_THREAD', {childId: post.id, parentId: post.threadId})
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
            return findById(state.threads, id)
        },

        async updateThread({commit, state}, {title, text, id}) {
            const thread = findById(state.threads, id)
            const post = findById(state.posts, thread.posts[0])
            const newThread = {...thread, title}
            const newPost = {...post, text}
            commit('SET_THREAD', newThread)
            commit('SET_POST', newPost)
            return newThread
        }
    },
    modules: {}
})
