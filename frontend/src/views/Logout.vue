<template></template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  Name: "Logout",

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted() {
    axios
      .create({ withCredentials: true })
      .post("http://localhost:8080/api/v1/auth/logout", {
        refreshToken: this.cookies.get("refreshToken"),
      })
      .then(
        (response) => {
          console.log(response.data);
          this.cookies.remove("token");
          this.cookies.remove("refreshToken");
          window.location.href = "/";
        },
        (err) => {
          console.log(err);
        }
      );
  },
};
</script>

<style>
</style>