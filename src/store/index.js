import {createStore} from 'vuex'
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";


export default createStore({
    state: {
        categories: [],
        forums: [],
        threads: [],
        posts: [],
        users: [],
        authId: 'jVa6Go6Nl1Urkag1R2p9CHTf4ny1'
    },
    getters,
    actions,
    mutations,
    modules: {}
})
