<template>
  <div>
    <v-container>
      <v-card :loading="loading">
        <v-card-title>
          Vm List
        </v-card-title>
        <v-card-text>
          <VmList :items="items" :headers="headers"/>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import VmList from "../../../components/dashboard/servers/VmList";

export default {
  name: "Servers",
  components: {VmList},
  props: {},
  data() {
    return {
      loading:false,
      items: [],
      headers: [
        {text: 'Name', value: 'NAME'},
        {text: 'State', value: 'STATE'},
        {text: 'UID', value: 'UID'},
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['getUserVmList']),
    async init() {
      this.loading = true
      await this.getUserVmList()
      this.items = this.$store.getters.vmList
      this.loading = false
    }
  }
};
</script>

