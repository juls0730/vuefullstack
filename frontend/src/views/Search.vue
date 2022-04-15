<template>
  <div>
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
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  name: "Search",
  data() {
    return {
      posts: [],
      loading: true,
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  async mounted() {
      console.log(this.$route.params.query);
    await axios.get(`http://localhost:8080/api/v1/post/find/${this.$route.params.query}`).then((response) => {
      console.log(response.data);
      this.posts = response.data;
    }, (err) => {
      console.log(err);
    });

    this.loading = false;
  },
};
</script>