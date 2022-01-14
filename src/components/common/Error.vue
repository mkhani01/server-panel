<template>
  <v-snackbar
      v-model="showErrorMessage"
      color="danger"
      multi-line
      bottom
      :timeout="5000"
  >
    {{ error }}
    <template v-slot:action="{ attrs }">
      <v-btn small text @click="showErrorMessage = false">CLOSE</v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'ErrorMessage',
  computed: {
    showErrorMessage: {
      get() {
        return this.$store.state.errorHandling.showErrorMessage
      },
      set(value) {
        this.$store.commit('SHOW_ERROR', value)
      }
    },
    error() {
      return this.$store.state.errorHandling.errorMessage;
    },
  },
}
</script>
