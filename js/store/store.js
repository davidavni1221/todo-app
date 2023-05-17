import { userStore } from './user-store.js'
import { todoStore } from './todo-store.js'

export const myStore = Vuex.createStore({
    strict: true,
    state() {
        return {
            msg: {
                txt: '',
                type: '',
            }
        }
    },
    mutations: {
        setMsg(state, { msg }) {
            state.msg = msg
        },
        resetMsg(state) {
            state.msg = { txt: '', type: '' }
        }
    },
    getters: {
        msg({ msg }) { return msg },
    },
    modules: {
        userStore,
        todoStore
    }
})
