import {findById, upsert, docToResource} from "@/helpers";

export default {

    SET_ITEM(state, {resource, item}) {
        upsert(state[resource], docToResource(item))
    },
    APPEND_POST_TO_THREAD: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
    APPEND_CONTRIBUTOR_TO_THREAD: makeAppendChildToParentMutation({parent: 'threads', child: 'contributors'}),

    APPEND_THREAD_TO_FORUM(state, {forumId, threadId}) {
        const forum = findById(state.forums, forumId)
        forum.threads = forum.threads || []
        forum.threads.push(threadId)
    },
    APPEND_THREAD_TO_USER(state, {userId, threadId}) {
        const user = findById(state.users, userId) || []
        user.threads = user.threads || []
        user.threads.push(threadId)
    }
}
function makeAppendChildToParentMutation({parent, child}) {
    return (state, {childId, parentId}) => {
        const resource = findById(state[parent], parentId)
        if(!resource) {
            console.warn(`Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent didn't exists`)
        }
        resource[child] = resource[child] || []
        if (!resource[child].includes(childId)) {
            resource[child].push(childId)
        }
    }
}

