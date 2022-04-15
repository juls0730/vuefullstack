<template>
    <h1>{{ userdata }}</h1>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  userdata: "Login",
  data() {
    return {
      userdata: ``,
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  
  mounted() {
    axios.create({ withCredentials: true }).get(`http://localhost:8080/api/v1/user/${this.$route.params.id}`).then((response) => {
      this.userdata = response.data.user.username
    }, (err) => {
      console.log(err)
    })
  }
}
</script>