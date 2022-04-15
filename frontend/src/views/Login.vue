<template>
  <div>
    <h2>Login</h2>
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
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";
export default {
  name: "Login",
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
          axios.create({ withCredentials: true }).post(`http://localhost:8080/api/v1/auth/signin`, {
            password: this.password,
            username: this.username,
          })
        .then(response => {
            this.cookies.set('token',response.data.accessToken);
            this.cookies.set('refreshToken',response.data.refreshToken);
            window.location.href = "/";
        })
        .catch(err => {
          this.error = true;
          this.errorMsg = `Invalid username or password`;
        });
        this.$router.push({name: 'Posts'});
      } catch (e) {
        this.error = true;
        console.log(e)
        this.password = "";
      }
    },
  },
};
</script>