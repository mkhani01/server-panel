<template>
  <div>
    <v-card :loading="loading">
      <v-card-title>
        Select OS
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" v-for="(template,index) in templates" :key="index" style="cursor: pointer"
                 @click="selectTemplate(template,index)">
            <v-card :class="[(index === selectedTemplateIndex) ? 'active' : '']"
                    :elevation="(index === selectedTemplateIndex) ? 5 : 2">
              <v-img
                  height="250"
                  :src="`https://odev.abrnoc.com/${template.logo_url}`"
              ></v-img>
              <v-card-title>
                {{ template.os_name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-divider v-if="selectedTemplate" class="mt-12 mb-12"></v-divider>
        <v-row v-if="selectedTemplate">
          <h3 class="text-left" v-if="selectedTemplate" style="width:100%">OS Versions</h3>
          <v-col cols="12" md="6" v-for="(version,index) in selectedTemplate.versions" :key="index"
                 style="cursor: pointer"
                 @click="selectTemplateVersion(version,index)">
            <v-card :class="[(index === selectedVersionIndex) ? 'active' : '']"
                    :elevation="(index === selectedVersionIndex) ? 5 : 2">
              <v-card-text>
                <ul>
                  <li>ARCH: {{ version.ARCH }}</li>
                  <li>SSH_SUPPORT: {{ version.SSH_SUPPORT }}</li>
                  <li>MIN_CPU: {{ version.MIN_CPU }}</li>
                  <li>MIN_SIZE: {{ version.MIN_SIZE }}</li>
                  <li>MIN_MEMORY: {{ version.MIN_MEMORY }}</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mt-6">
        <v-spacer></v-spacer>
        <v-btn
            :disabled="!selectedVersion"
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
import {mapActions} from 'vuex';

export default {
  name: "OsSelection",
  components: {},
  props: {},
  data() {
    return {
      templates: [],
      selectedTemplate: null,
      selectedTemplateIndex: null,
      selectedVersion: null,
      selectedVersionIndex: null,
      loading: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['getTemplateList']),
    async init() {
      this.loading = true
      await this.getTemplateList()
      this.templates = this.$store.getters.templates
      this.loading = false
    },
    selectTemplate(template, index) {
      this.selectedTemplate = template;
      this.selectedTemplateIndex = index;
      this.selectedVersion = null;
      this.selectedVersionIndex = null;
    },
    selectTemplateVersion(version, index) {
      this.selectedVersion = version
      this.selectedVersionIndex = index
    },
    continueFunc() {
      this.$emit("firstStep", this.selectedVersion)
    }
  }
};
</script>
<style>
.active {
  border: 2px solid #7f5a83 !important;
}
</style>