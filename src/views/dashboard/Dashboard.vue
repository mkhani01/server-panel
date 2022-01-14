<template>
  <div>
    <NavigationBar/>
    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import NavigationBar from "../../components/dashboard/NavigationBar";

export default {
  name: "Dashboard",
  components: {NavigationBar},
  props: {},
  mounted() {
    this.getUserInfoFunc()
  },
  methods: {
    ...mapActions(['getUserInfo']),
    async getUserInfoFunc() {
      await this.getUserInfo()
    }
  }
};
</script>

