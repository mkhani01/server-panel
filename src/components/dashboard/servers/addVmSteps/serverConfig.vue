<template>
  <div>
    <v-card>
      <v-card-title>
        Config server
      </v-card-title>
      <v-card-text>
        <v-form v-model="form">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                  outlined
                  type="number"
                  dense
                  :rules="[rules.required, rules.cpuNumbers]"
                  label="Number of CPU's"
                  v-model="cpuNumbers"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  outlined
                  type="number"
                  dense
                  :rules="[rules.required, rules.cpuNumbers]"
                  label="Number of VCPU's"
                  v-model="vCpuNumbers"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  outlined
                  type="number"
                  dense
                  :rules="[rules.required, rules.memory]"
                  label="Memory"
                  v-model="memory"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="$emit('backStepTwo')"
        >
          Back
        </v-btn>
        <v-btn
            :disabled="!form"
            color="primary"
            @click="continueFunc"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>

export default {
  name: "serverConfig",
  props: ["osInfo"],
  data() {
    return {
      form: false,
      cpuNumbers: null,
      vCpuNumbers: null,
      memory: null,
      rules: {
        required: value => !!value || 'This field is required',
        cpuNumbers: value => parseFloat(value) >= this.osInfo.MIN_CPU || 'This value is lower than minimum requirement',
        vCpuNumbers: value => parseFloat(value) >= 1 || 'This value is lower than minimum requirement',
        memory: value => parseFloat(value) >= this.osInfo.MIN_MEMORY || 'This value is lower than minimum requirement',
      }
    }
  },
  methods: {
    continueFunc() {
      let config = {
        cpuNumbers: this.cpuNumbers,
        vCpuNumbers: this.vCpuNumbers,
        memory: this.memory,
      }
      this.$emit('seccondStep', config)
    }
  }
};
</script>
