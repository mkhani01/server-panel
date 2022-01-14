<template>
  <div>
    <v-container fluid style="height: 100vh;background-color: #7f5a83;
                              background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);">
      <v-row class="pa-0">
        <v-col cols="12" class="d-flex justify-center align-center" style="height: 100vh">
          <v-card width="350" height="60vh" class="d-flex flex-column align-center justify-center">
            <LoginForm/>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import LoginForm from "../../components/auth/LoginForm";

export default {
  name: "Login",
  components: {LoginForm},
  props: {},
};
</script>

