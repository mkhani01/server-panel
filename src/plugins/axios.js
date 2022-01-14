import Vue from "vue"
import axios from "axios"

let url = new URL('/fastapi', "https://odev.abrnoc.com");
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.baseURL = url.href;
axios.interceptors.request.use(function (config) {

    if (JSON.parse(window.localStorage.getItem('token'))) {
        config.headers['X-Token'] = JSON.parse(window.localStorage.getItem('token'));
    }
    return config;
});
Plugin.install = Vue => {
    Vue.axios = axios;
    window.axios = axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return axios;
            }
        },
        $axios: {
            get() {
                return axios
            }
        }
    })
}

Vue.use(Plugin)
export default Plugin