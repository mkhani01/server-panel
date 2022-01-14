<template>
  <v-snackbar
      v-model="showSuccessMessage"
      color="success"
      multi-line
      bottom
      :timeout="4000"
  >
    <v-icon>mdi-check-circle</v-icon>
    {{ successMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text small @click="showSuccessMessage = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'SuccessMessage',
  computed: {
    showSuccessMessage: {
      get() {
        return this.$store.state.success.showSuccessMessage
      },
      set(value) {
        this.$store.commit('SHOW_SUCCESS', value)
      }
    },
    successMessage() {

      return this.$store.state.success.successMessage
    },
  },
}
</script>
