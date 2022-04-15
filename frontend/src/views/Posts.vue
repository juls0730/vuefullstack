<template>
  <div id="posts">
    <h1>Posts</h1>
    <router-link v-if="loggedIn" to="/post">New Post</router-link>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else v-for="posts in posts" :key="posts._id" class="post-div">
      <h2>
        <router-link :to="`/post/${posts._id}`">{{ posts.title }}</router-link>
      </h2>
      <span class="posts-user">By: {{ posts.creator }}</span>
      <p class="text-overflow">{{ posts.content }}</p>
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      error: false,
      errorMsg: ``,
      loading: true,
      loggedIn: false,
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  async mounted() {
    await axios.get("http://localhost:8080/api/v1/posts").then(
      (response) => {
        console.log(response.data);
        this.posts = response.data;
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );

    await axios
      .create({ withCredentials: true })
      .get("http://localhost:8080/api/v1/auth/testtoken", {
        headers: { "x-access-token": this.cookies.get("token") },
      })
      .then(
        (response) => {
          this.loggedIn = true;
        },
        (err) => {
          console.log(err);
        }
      );
  },
};
</script>