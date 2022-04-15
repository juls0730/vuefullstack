<template>
  <div>
    <router-link to="/messages/create">create conversation</router-link>
    <hr />
    <div v-if="this.loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-for="conversations in conversations" :key="conversations._id">
        <div class="conversation-div">
          <div class="conversation-header">
            <router-link :to="`/messages/${conversations._id}`">{{
              conversations.participants[1]
            }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  Name: "Conversations",
  data() {
    return {
      conversations: [],
      loading: true,
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  async mounted() {
    await axios
      .create({ withCredentials: true })
      .get("http://localhost:8080/api/v1/conversations", {
        headers: { "x-access-token": this.cookies.get("token") },
      })
      .then(
        (response) => {
          console.log(response.data.conversations);
          this.conversations = response.data.conversations;
          this.loading = false;
          console.log(this.conversations);
        },
        (err) => {
          console.log(err);
        }
      );
  },
};
</script>