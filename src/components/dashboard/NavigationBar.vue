<template>
  <div>
    <v-app-bar
        app
        dense
        color="primary"
        class="white--text"
    >
      <v-btn
          @click="menuClick"
          fab
          class="mr-3 white--text"
          text
          small
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>Server-panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          @click="toggleMode"
          fab
          class="mr-3 white--text"
          text
          small
      >
        <v-icon v-if="!$vuetify.theme.dark" dark>mdi-moon-waning-crescent</v-icon>
        <v-icon v-else dark>mdi-white-balance-sunny</v-icon>
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
      <v-btn
          @click="logout"
          fab
          v-bind="attrs"
          v-on="on"
          class="mr-3 white--text"
          text
          small
      >
        <v-icon dark>mdi-logout</v-icon>
      </v-btn>
        </template>
        <span>Log out</span>
      </v-tooltip>

    </v-app-bar>
    <v-navigation-drawer
        v-model="sidebar"
        color="primary"
        class="white--text"
        app
    >
      <v-list class="d-flex flex-column align-center white--text">
        <v-list-item>
          <v-list-item-avatar size="60">
            <img src="../../assets/avatar-placeholder.png" alt="avatar">
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item class="white--text" link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $store.getters.userInfo["full_name"] }}
            </v-list-item-title>
            <v-list-item-subtitle class="white--text"> {{ $store.getters.userInfo["email"] }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-group
          :value="true"
          no-action
      >
        <template v-slot:activator style="padding-right: 0 !important">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-server</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text text-left">
            Servers
          </v-list-item-title>
        </template>
        <v-list-item
            to="/servers"
            link>
          <v-list-item-title class="white--text text-left">
            Servers List
          </v-list-item-title>
        </v-list-item>
        <v-list-item
            to="/addServers"
            link>
          <v-list-item-title class="white--text text-left">
            Add new
          </v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "NavigationBar",
  props: {},
  data() {
    return {
      sidebar: false
    }
  },
  methods: {
    ...mapActions(['userLogOut']),
    menuClick() {
      this.sidebar = !this.sidebar
    },
    async logout() {
      await this.userLogOut()
    },
    toggleMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      if (this.$vuetify.theme.dark) {
        window.localStorage.setItem('Mode', 'dark')
      } else {
        window.localStorage.setItem('Mode', 'light')
      }
    }
  }
};
</script>
<style>
i.v-icon.notranslate.mdi.mdi-chevron-down {
  color: white;
}
</style>
