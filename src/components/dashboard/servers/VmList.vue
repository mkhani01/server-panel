<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items">
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: "Servers",
  components: {},
  props: ["items", "headers"],
};
</script>
s
