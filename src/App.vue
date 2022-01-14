<template>
  <v-app>
    <Error/>
    <Success/>
    <router-view/>
  </v-app>
</template>
<script>
import Error from "./components/common/Error"
import Success from "./components/common/Success";

export default {
  name: 'App',
  components: {
    Error,
    Success
  },
  created() {
    if (window.localStorage.getItem('Mode')) {
      this.$vuetify.theme.dark = window.localStorage.getItem('Mode') === "dark";
    } else {
      this.$vuetify.theme.dark = false
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
