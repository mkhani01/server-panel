<template>
  <div>
    <v-col>
      <h3 class="text-center mb-7">Login</h3>
      <v-form @submit.prevent="onSignInFunc" v-model="formValidation">
        <v-text-field
            dense
            label="Email"
            v-model="loginInfo.email"
            outlined
            :rules="[loginRules.required, loginRules.email]"
            append-icon="mdi-email"
        >
        </v-text-field>
        <v-text-field
            dense
            label="Password"
            type="password"
            v-model="loginInfo.password"
            :rules="[loginRules.required]"
            append-icon="mdi-lock"
            outlined
        >
        </v-text-field>
        <v-btn
            color="primary"
            block
            type="submit"
            :disabled="!formValidation"
            :loading="loading">Sign in</v-btn>

      </v-form>
    </v-col>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "LoginForm",
  props: {},
  data(){
    return {
      formValidation:false,
      loginRules:{
        required:value => !!value || 'This field is required',
        email:value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
      loginInfo:{
        email:'',
        password:''
      },
      loading:false,
    }
  },
  methods:{
    ...mapActions(["userLogin"]),
    async onSignInFunc(){
      let payload = {
        email:this.loginInfo.email,
        password:this.loginInfo.password
      }
      this.loading = true
      await this.userLogin(payload)
      this.loading = false
    }
  }
};
</script>
