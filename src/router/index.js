import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login.vue";
import Dashboard from "../views/dashboard/Dashboard";
import Servers from "../views/dashboard/servers/Servers"
import AddServer from "../views/dashboard/servers/AddServer";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/dashboard",
        name: "Dashboards",
        children: [
            {
                path: '/servers',
                name: 'servers',
                component:Servers,
            },
            {
                path: '/addServers',
                name: 'addServers',
                component:AddServer,
            }
        ],
        component:Dashboard
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    const isTokenSet = store.getters.isTokenSet
    if ((to.path !== "/") && !isTokenSet) {
        return next('/')
    }
    if ((to.path === "/") && isTokenSet) {
        return next('/servers')
    }
    return next()
})
export default router;
