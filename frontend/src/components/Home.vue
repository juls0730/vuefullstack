<template>
  <h1>Hello, {{ name }}</h1>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      name: ``,
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  mounted() {
    if (this.cookies.get("token") !== null) {
      axios
        .create({ withCredentials: true })
        .get("http://localhost:8080/api/v1/user/username", {
          headers: { "x-access-token": this.cookies.get("token") },
        })
        .then(
          (response) => {
            console.log(response.data.user);
            this.name = response.data.user.username;
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.name = "User";
    }
  },
};
</script>