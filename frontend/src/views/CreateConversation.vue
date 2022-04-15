<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      name="partner"
      id="partner"
      v-model="partner"
      placeholder="Recipient"
    /><br />
    <input type="submit" value="Start chat" />
  </form>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  Name: "Create Conversation",
  data() {
    return {
      partner: "",
      errorMsg: "",
      error: "",
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  async mounted() {},

  methods: {
    onSubmit() {
      if (document.getElementById("partner").value == "") {
        this.errorMsg = "Please enter a recipient";
        this.error = true;
      } else {
        this.error = false;
        this.errorMsg = "";
        axios
        .create({ withCredentials: true })
          .post(
            "http://localhost:8080/api/v1/conversation",
            {
              partner: this.partner,
            },
            {
              headers: {
                "x-access-token": this.cookies.get("token"),
              },
            }
          )
          .then(
            (response) => {
              console.log(response.data);
              this.$router.push(`/messages/${response.data.id}`);
            },
            (err) => {
              console.log(err);
            }
          );
      }
    },
  },
};
</script>

<style>
</style>