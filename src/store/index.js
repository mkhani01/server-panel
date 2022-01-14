import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

const authModule = {
    state: {
        token: JSON.parse(!!localStorage.getItem('token')) || null,
        userInfo: [],
        isTokenSet: !!localStorage.getItem('token')
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            state.isTokenSet = true
        },
        addUserInfo(state, info) {
            state.userInfo = info
        },
        removeToken(state, payload) {
            state.token = null
            state.isTokenSet = false
            router.push({name: "Login"})
            window.localStorage.removeItem('token')
        }
    },
    actions: {
        async userLogin({commit}, payload) {
            await axios.post("/auth/login", payload)
                .then((response) => {
                    if (response.status === 201) {
                        commit('setToken', JSON.stringify(response.data.token))
                        window.localStorage.setItem('token', JSON.stringify(response.data.token))
                        router.push({name: 'servers'})
                    }
                })
                .catch((err) => {
                    /*console.error(err.response)*/
                    commit('ERRORHANDLER', err.response)
                })
        },
        async getUserInfo({commit}) {
            await axios.get("/auth/user-info")
                .then((response) => {
                    if (response.status === 200) {
                        commit('addUserInfo', response.data)
                    }
                })
                .catch((err) => {
                    console.error(err.response)
                    commit('ERRORHANDLER', err.response)
                })

        },
        async userLogOut({commit}) {
            await axios.post("auth/logout")
                .then((response) => {
                    if (response.status === 200) {
                        commit('removeToken')
                    }
                })
                .catch((err) => {
                    console.error(err.response)
                    commit('ERRORHANDLER', err.response)
                })
        }
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userInfo,
        isTokenSet: state => state.isTokenSet
    }
}

const errorHandling = {
    state: {
        showErrorMessage: false,
        errorMessage: null
    },
    mutations: {
        ERRORHANDLER(state, payload) {
            if (payload.data.message === null) {
                state.showErrorMessage = false
                state.errorMessage = null
            } else {
                state.showErrorMessage = true
                state.errorMessage = payload.data.message
            }
        },
        SHOW_ERROR(state, payload) {
            state.showErrorMessage = !!payload
        },

    },
    actions: {},
    getters: {
        showErrorMessage: state => state.showErrorMessage,
        errorMessage: state => state.errorMessage
    }
}
const servers = {
    state: {
        vmList: [],
        templates: [],
    },
    mutations: {
        setVmList(state, items) {
            state.vmList = items;
        },
        setTemplatesList(state, items) {
            state.templates = items;
        }
    },
    actions: {
        async getUserVmList({commit}) {
            await axios.get("/vm")
                .then((response) => {
                    if (response.status === 200) {
                        commit('setVmList', response.data)
                    }
                })
                .catch((err) => {
                    /*console.error(err.response)*/
                    commit('ERRORHANDLER', err.response)
                })
        },
        async getTemplateList({commit}) {
            await axios.get("/templates")
                .then((response) => {
                    if (response.status === 200) {
                        commit('setTemplatesList', response.data)
                    }
                })
                .catch((err) => {
                    /*console.error(err.response)*/
                    commit('ERRORHANDLER', err.response)
                })
        },
        async createVm({commit}, payload) {
            await axios.post("/vm", payload)
                .then((response) => {
                    if (response.status === 200) {
                        commit('SUCCESS', "The VM successfully created.")
                        router.push({path: '/servers'})
                    }
                })
                .catch((err) => {
                    /*console.error(err.response)*/
                    commit('ERRORHANDLER', err.response)
                })
        },
    },
    getters: {
        vmList: state => state.vmList,
        templates: state => state.templates
    }
}

const successMessages = {
    state: {
        showSuccessMessage: false,
        successMessage: null,
    },
    mutations: {
        SUCCESS(state, payload) {
            if (payload === null) {
                state.showSuccessMessage = false
                state.successMessage = null
            } else {
                state.showSuccessMessage = true
                state.successMessage = payload
            }
        },
        SHOW_SUCCESS(state, payload) {
            state.showSuccessMessage = !!payload
        }
    },
    actions: {},
    getters: {
        showSuccessMessage: state => state.successMessage,
        successMessage: state => state.successMessage,
    }
}
const store = new Vuex.Store({
    modules: {
        authModule: authModule,
        errorHandling: errorHandling,
        servers: servers,
        success: successMessages
    }
})
export default store


