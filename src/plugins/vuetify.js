import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
export default new Vuetify({
    rtl: false,
    theme: {
        dark: false,
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#0d324d',
                secondary: '#7f5a83',
                danger: '#f62d51',
                info: '#ffbc34',
                success: '#36bea6',
                anchor: '#8c9eff',
                background: '#ffffff', // Not automatically applied
            },
            dark: {
                primary: '#0d324d',
                secondary: '#7f5a83',
                danger: '#f62d51',
                info: '#ffbc34',
                success: '#36bea6',
                anchor: '#8c9eff',
                background: colors.shades.black // If not using lighten/darken, use base to return hex
            },
        },
    },
    iconfont: 'mdi'
})

