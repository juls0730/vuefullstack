<template>
  <div>
    <main class="post-display">
      <h1>{{ post.title }}</h1>
      <span class="post-user">By: {{ post.creator }}</span>
      <img v-if="post.img" :src="`${post.img.data}`" alt="{{ post.title }}" />
      <p>{{ post.content }}</p>
    </main>
    <div id="logged-in">
      <form id="form" @submit.prevent="onSubmit">
        <p>
          Reply as
          <a :href="`/user/${curuserinfo._id}`">{{ curuserinfo.username }}</a>
        </p>
        <textarea
          class="reply-input"
          rows="8"
          cols="46"
          type="text"
          id="reply-input"
          v-model="content"
          maxlength="1200"
          placeholder="Comment"
        /><br />
        <p>{{ errorMsg }}</p>
        <input type="submit" value="Submit" />
      </form>
    </div>
    <hr />
    <div v-if="commentsLoading" class="loader">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else>
      <div v-if="comments == null" class="no-comments">
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="no-comments-svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >No comments yet.
        </h1>
      </div>
      <div
        v-else
        v-for="comment in comments"
        :key="comment._id"
        class="comment-div"
      >
        <p class="username">by: {{ comment.creator }}</p>
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  name: "ShowPost",
  data() {
    return {
      post: {},
      error: false,
      errorMsg: ``,
      content: "",
      curuserinfo: "",
      comments: null,
      commentsLoading: true,
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  async created() {
    if (this.cookies.get("token") !== null) {
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
            console.log(err);
          }
        );
    }

    await axios
      .get(`http://localhost:8080/api/v1/posts/${this.$route.params.id}`)
      .then(
        (response) => {
          this.post = response.data;
          console.log(response.data.creator);
        },
        (err) => {
          console.log(err);
        }
      );

    await axios
      .get(
        `http://localhost:8080/api/v1/post/${this.$route.params.id}/comments`
      )
      .then(
        (response) => {
          this.comments = response.data;
          this.commentsLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
  },

  async mounted() {
    if (this.comments == null) {
      this.commentsLoading = false;
    }
    if (this.cookies.get("token") == null) {
      console.log("no token set");
      document.getElementById("logged-in").style.display = "none";
    } else {
      document.getElementById("reply-input").onchange = () => {
        var reply = document.getElementById("reply-input").value;
        var pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;

        if (pattern.test(reply)) {
          this.error = false;
          this.errorMsg = ``;
          let str = this.content.toString();
          str = str.replace(/\s+/g, "");
          if (str == "" || str == null) {
            this.error = true;
            this.errorMsg = "Please enter a reply.";
          }
        } else {
          this.error = true;
          this.errorMsg = `Reply can only contain letters, numbers, and special characters`;
        }
      };

      axios
        .create({ withCredentials: true })
        .get("http://localhost:8080/api/v1/user/username", {
          headers: { "x-access-token": this.cookies.get("token") },
        })
        .then(
          (response) => {
            this.curuserinfo = response.data.user;
          },
          (err) => {
            console.log(err);
          }
        );
    }

    if (this.comments === undefined) {
      this.commentsLoading = true;
    }
  },

  methods: {
    async onSubmit(e) {
      try {
        e.preventDefault();
        if (!this.content) {
          this.error = true;
          this.errorMsg = `Please enter a reply.`;
          return;
        }

        let str = this.content.toString();
        str = str.replace(/\s+/g, "");
        if (str == "" || str == null) {
          this.error = true;
          this.errorMsg = "Please enter a reply.";
        }

        if (this.error) {
          return;
        }

        axios.defaults.headers.post["x-access-token"] =
          this.cookies.get("token");
        await axios
          .create({ withCredentials: true })
          .post(`http://localhost:8080/api/v1/post/reply`, {
            postId: this.$route.params.id,
            content: this.content,
          });
        this.$router.go(0);
      } catch (e) {
        this.error = true;
      }
    },
  },
};
</script>
