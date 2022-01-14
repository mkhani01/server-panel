<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items">
         <template v-slot:item.STATE="{ item }">
        <v-chip
          color="orange"
          outlined
          small
          v-if="item.STATE === 'PENDING'"
          dark
        >
          {{item.STATE }}
        </v-chip>
         <v-chip
          color="orange"
          outlined
          small
          v-else
          dark
        >
          {{item.STATE }}
        </v-chip>
      </template>
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
