import {findById} from "@/helpers";
import {collection, doc, getFirestore, onSnapshot, query} from "firebase/firestore";

export default {
    createPost({commit, state}, post) {
        post.id = 'gggg' + Math.random()
        post.userId = state.authId
        post.publishedAt = Math.floor(Date.now() / 1000),
            commit('SET_ITEM', {resource: 'posts', item: post})
        commit('APPEND_POST_TO_THREAD', {childId: post.id, parentId: post.threadId})
        commit('APPEND_CONTRIBUTOR_TO_THREAD', {childId: state.authId, parentId: post.threadId})
    },
    updateUser({commit}, user) {
        commit('SET_ITEM', {resource: 'users', item: user})
    },
    async createThread({commit, state, dispatch}, {text, title, forumId}) {
        const id = 'gggg' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const thread = {forumId, title, publishedAt, userId, id}
        commit('SET_ITEM', {resource: 'threads', item: thread})
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
        commit('SET_ITEM', {resource: 'threads', item: newThread})
        commit('SET_ITEM', {resource: 'posts', item: newPost})
        return newThread
    },

    async fetchThread({dispatch}, {id}) {
        return dispatch('fetchItem', {resource: "threads", id})
    },

    fetchUser({dispatch}, {id}) {
        return dispatch('fetchItem', {resource: "users", id})
    },

    fetchPost({dispatch}, {id}) {
        return dispatch('fetchItem', {resource: "posts", id})
    },

    fetchCategory({dispatch}, {id}) {
        return dispatch('fetchItem', {resource: 'categories', id})
    },

    fetchForum({dispatch}, {id}) {
        return dispatch('fetchItem', {resource: 'forums', id})
    },

    fetchThreads({dispatch}, {ids}) {
        return dispatch('fetchItems', {ids, resource: 'threads'})
    },

    fetchForums({dispatch}, {ids}) {
        return dispatch('fetchItems', {resource: 'forums', ids})
    },

    fetchPosts({dispatch}, {ids}) {
        return dispatch('fetchItems', {resource: 'posts', ids})
    },

    fetchUsers({dispatch}, {ids}) {
        return dispatch('fetchItems', {resource: 'users', ids})
    },

    fetchItem({commit}, {resource, id}) {
        return new Promise((resolve) => {
            onSnapshot(doc(getFirestore(), resource, id), (doc) => {
                const item = {...doc.data(), id: doc.id}
                commit('SET_ITEM', {resource, id, item})
                resolve(item)
            })
        })
    },

    fetchItems({dispatch}, {ids, resource}) {
        return Promise.all(ids.map(id => dispatch('fetchItem', {resource, id})))
    },

    fetchAllCategories({commit}) {
        console.log('🔥', '🏷', 'all')
        return new Promise((resolve) => {
            onSnapshot(query(collection(getFirestore(), 'categories')), (querySnapshot) => {
                const categories = []
                querySnapshot.forEach(doc => {
                    categories.push({id: doc.id, ...doc.data()})
                    const item = {id: doc.id, ...doc.data()}
                    commit('SET_ITEM', {resource: 'categories', item})
                    return item
                })
                resolve(categories)
            })
        })

    }
}
