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
            console.log(axios.defaults.headers.common['X-ACCESS-TOKEN'])
            console.log('-------Start Response-------')
            console.log(response)
            console.log(res.data.accessToken)
            console.log(response.data)
            console.log(this.cookies.get('token'))
            console.log('--------End Response--------')
            this.$router.push({name: 'Home'});
        })
        .catch(error => error);
        this.$router.push({name: 'Home'});
      } catch (e) {
        this.error = true;
        this.password = "";
      }
    },
  },
};
</script>