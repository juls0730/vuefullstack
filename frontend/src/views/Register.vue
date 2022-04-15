<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="username"
      /><br/>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
      /><br/>
      <p>{{ errorMsg }}</p>
      <input type="submit" value="Sign Up" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  name: "Register",
  data() {
    return {
      password: "",
      username: "",
      error: false,
      errorMsg: ``,
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  methods: {
    async onSubmit(e) {
      try {
        e.preventDefault();
        if(!this.username || !this.password) {
          this.error = true;
          this.errorMsg = `Please enter a username and password`;
          return;
        }
        await axios.create({ withCredentials: true }).post(`http://localhost:8080/api/v1/auth/signup`, {
            password: this.password,
            username: this.username,
          }).then(response => {
            axios.create({ withCredentials: true }).post(`http://localhost:8080/api/v1/auth/signin`, {
              password: this.password,
              username: this.username,
            }).then(response => {
              this.cookies.set('token',response.data.accessToken);
              this.cookies.set('refreshToken',response.data.refreshToken);
              window.location.href = "/";
            })
          })
      } catch (e) {
        this.error = true;
        this.password = "";
      }
    },
  },
};
</script>