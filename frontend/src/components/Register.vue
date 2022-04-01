<template>
  <div>
    <h2>Register</h2>
    <form v-on:submit="register()">
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
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
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
  methods: {
    async register(e) {
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
          });
      } catch (e) {
        this.error = true;
        this.password = "";
      }
    },
  },
};
</script>