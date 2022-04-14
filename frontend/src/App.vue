<template>
  <Nav />
  <router-view class="main-content" />
</template>

<script>
import Nav from "./components/Nav.vue";
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      errors: [],
      userauth: "",
      signedIn: false,
      neednewtoken: false,
    };
  },

  components: {
    Nav,
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  mounted() {
    if (localStorage.getItem("theme") == null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute(
          "data-theme",
          localStorage.getItem("theme")
        );
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute(
          "data-theme",
          localStorage.getItem("theme")
        );
      }
    } else {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );
    }

    // Generate a CSRF token.
    /*
    axios
      .create({ withCredentials: true })
      .get("http://localhost:8080/api/v1/getcsrftoken")
      .then(
        (response) => {
          axios.defaults.headers.common["X-CSRF-TOKEN"] =
            response.data.csrfToken;
          this.cookies.set("_csrf", response.data.csrfToken);
        },
        (err) => {
          console.log(err);
        }
      );
      */

    if (this.cookies.get("token") !== null) {
      axios
        .create({ withCredentials: true })
        .get("http://localhost:8080/api/v1/test/user", {
          headers: { "x-access-token": this.cookies.get("token") },
        })
        .then(
          (response) => {
            this.userauth = response.data;
          },
          (err) => {
            console.log(err);
          }
        );

      axios
        .create({ withCredentials: true })
        .get("http://localhost:8080/api/v1/auth/testtoken", {
          headers: { "x-access-token": this.cookies.get("token") },
        })
        .then(
          (response) => {
            let validToken = response.data.message;
            if (validToken !== "Token is valid.") {
              document.getElementById("logged-in").style.display = "none";
            }
          },
          (err) => {
            axios.defaults.headers.common["x-access-token"] =
              this.cookies.get("token");
            axios
              .create({ withCredentials: true })
              .post("http://localhost:8080/api/v1/auth/refreshtoken", {
                refreshToken: this.cookies.get("refreshToken"),
              })
              .then(
                (response) => {
                  this.cookies.set("token", response.data.accessToken);
                  this.$router.go(0);
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        );
    } else {
    }
  },
};
</script>

<style>
@import "./assets/base.css";
</style>