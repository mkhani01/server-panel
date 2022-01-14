<template>
  <div>
    <v-container>
      <v-card :loading="loading">
        <v-stepper v-model="stepperCounter">
          <v-stepper-header>
            <v-stepper-step
                :complete="stepperCounter > 1"
                step="1">
              OS selection
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :complete="stepperCounter > 1"
                step="2">
              Server configuration
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                step="3">
              VM info
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <os-selection @firstStep="onFirstStepComplete($event)"></os-selection>
            </v-stepper-content>
            <v-stepper-content step="2">
              <server-config @backStepTwo="backStepTwo" @seccondStep="onSecondStepComplete($event)"
                             v-if="stepperCounter > 1" :osInfo="OsInfo"></server-config>
            </v-stepper-content>
            <v-stepper-content step="3">
              <meta-info v-if="stepperCounter > 2" @backStepThree="backStepThree"
                         @createVm="onCreateVm($event)"></meta-info>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import OsSelection from "../../../components/dashboard/servers/addVmSteps/OsSelection";
import serverConfig from "../../../components/dashboard/servers/addVmSteps/serverConfig";
import MetaInfo from "../../../components/dashboard/servers/addVmSteps/MetaInfo";

export default {
  name: "Servers",
  components: {OsSelection, serverConfig, MetaInfo},
  data() {
    return {
      stepperCounter: 1,
      OsInfo: null,
      serverConfig: null,
      metaConfigInfo: null,
      loading: false,
    }
  },
  methods: {
    ...mapActions(['createVm']),
    onFirstStepComplete($event) {
      this.OsInfo = $event
      this.stepperCounter = 2
    },
    onSecondStepComplete($event) {
      this.serverConfig = $event
      this.stepperCounter = 3
    },
    backStepTwo() {
      this.stepperCounter = 1
    },
    backStepThree() {
      this.stepperCounter = 2
    },
    async onCreateVm($event) {
      this.metaConfigInfo = $event
      let payload = {
        template_id: this.OsInfo.ID,
        vm_name: this.metaConfigInfo.vm_name,
        cpu: this.serverConfig.cpuNumbers,
        vcpu: this.serverConfig.vCpuNumbers,
        memory: this.serverConfig.memory,
        disks: [
          {
            IMAGE_ID: this.OsInfo.ID,
          }
        ],
      }
      this.loading = true;
      await this.createVm(payload)
      this.loading = false;
    }
  }
};
</script>
