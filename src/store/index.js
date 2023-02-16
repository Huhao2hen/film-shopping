import { createStore } from 'vuex'
import { getUserMsg } from '@/api/user'
import movie from './movie'
import schedule from './schedule'
import cinema from './cinema'
import order from './order'
import persistedstate from 'vuex-persistedstate'

export default createStore({
    state: {
        loginPopup: false,
        isLogin: false,
        payDialogState: false,
        userMsg: {},
    },
    mutations: {
        chageLogin(state, status) {
            state.isLogin = status
        },
        chageLoginPopup(state, status) {
            state.loginPopup = status
        },
        setPayDialogState(state, status) {
            state.payDialogState = status
        },
        setUserMsg(state, msg) {
            // msg.interesteTag = msg.interesteTag.split(',')
            state.userMsg = msg
        },
    },
    actions: {
        async saveUserMsg({ commit, state }, userLoginName) {
            const { data, code } = await getUserMsg(userLoginName)
            if (code == 200) {
                commit('setUserMsg', data)
            }
        }
    },
    modules: {
        movie,
        schedule,
        cinema,
        order
    },
    plugins: [persistedstate({ storage: sessionStorage, path: ['movie', 'schedule', 'cinema', 'order'], })],
})