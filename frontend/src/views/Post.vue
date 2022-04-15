<template>
  <div class="post-create">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="title"
        name="title"
        placeholder="Title"
        id="title"
        maxlength="50"
      /><br />
      <textarea
        v-model="body"
        name="body"
        id="body"
        placeholder="Body"
        maxlength="1800"
      ></textarea
      ><br />
      <input
        type="file"
        id="image"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
        name="image"
      />
      <p>{{ errorMsg }}</p>
      <input type="submit" value="Post" />
    </form>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  name: "Post",
  data() {
    return {
      title: "",
      body: "",
      imageUrl: null,
      image: null,
      error: false,
      errorMsg: ``,
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  mounted() {
    document.getElementById("title").onchange = () => {
      var reply = document.getElementById("title").value;
      var pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;

      if (pattern.test(reply)) {
        this.error = false;
        this.errorMsg = ``;
      } else {
        this.error = true;
        this.errorMsg = `Reply can only contain letters, numbers, and special characters`;
      }
    };

    document.getElementById("body").onchange = () => {
      var reply = document.getElementById("body").value;
      var pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;

      if (pattern.test(reply)) {
        this.error = false;
        this.errorMsg = ``;
        let titlestr = this.title.toString();
        titlestr = titlestr.replace(/\s+/g, "");
        let bodystr = this.body.toString();
        bodystr = bodystr.replace(/\s+/g, "");
        if (titlestr == "" || titlestr == null) {
          this.error = true;
          this.errorMsg = "Please enter a title and body.";
        }

        if (bodystr == "" || bodystr == null) {
          this.error = true;
          this.errorMsg = "Please enter a title and body.";
        }

      } else {
        this.error = true;
        this.errorMsg = `Reply can only contain letters, numbers, and special characters`;
      }
    };

    if (this.cookies.get("token") == null) {
      console.log("no token set");
      this.$router.push({ name: "Login" });
    }

    axios
      .create({ withCredentials: true })
      .get("http://localhost:8080/api/v1/auth/testtoken", {
        headers: { "x-access-token": this.cookies.get("token") },
      })
      .then(
        (response) => {
          let validToken = response.data.message;
          if (validToken !== "Token is valid.") {
            this.$router.push({ name: "Login" });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  },

  methods: {
    async onSubmit(e) {
      try {
        e.preventDefault();
        if (!this.title || !this.body) {
          this.error = true;
          this.errorMsg = `Please enter a title and body`;
          return;
        }

        let titlestr = this.title.toString();
        titlestr = titlestr.replace(/\s+/g, "");
        let bodystr = this.body.toString();
        bodystr = bodystr.replace(/\s+/g, "");
        if (
          titlestr == "" ||
          titlestr == null ||
          bodystr == "" ||
          bodystr == null
        ) {
          this.error = true;
          this.errorMsg = "Please enter a title and body.";
        }

        axios.defaults.headers.post["x-access-token"] =
          this.cookies.get("token");
        if (this.imageUrl !== null) {
          await axios
            .create({ withCredentials: true })
            .post(`http://localhost:8080/api/v1/post`, {
              title: this.title,
              content: this.body,
              image: {
                data: this.imageUrl,
                contentType: this.image.type,
              },
            });
          this.$router.push({ name: "Posts" });
        } else {
          await axios
            .create({ withCredentials: true })
            .post(`http://localhost:8080/api/v1/post`, {
              title: this.title,
              content: this.body,
            });
          this.$router.push({ name: "Posts" });
        }
      } catch (e) {
        this.error = true;
      }
    },

    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
        console.log(this.imageUrl);
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      console.log(this.image);
    },
  },
};
</script>
