<template>
  <div>
    <v-card>
      <v-card-title>
        VM info
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                  :rules="requiredRule"
                  dense
                  outlined
                  label="VM Name"
                  v-model="configInfo.vm_name">
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider class="mb-10 mt-10"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="$emit('backStepThree')"
        >
          Back
        </v-btn>
        <v-btn
            :disabled="!form"
            color="primary"
            @click="createVmFunc"
        >
          Finish
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "MetaInfo",
  components: {},
  props: {},
  data() {
    return {
      form: false,
      configInfo: {
        vm_name: '',
      },
      requiredRule: [
        value => !!value || 'This field is required',
      ],
    }
  },
  methods: {
    createVmFunc() {
      let configInfo = {
        vm_name: this.configInfo.vm_name
      }
      this.$emit('createVm', configInfo)
    }
  }
};
</script>
