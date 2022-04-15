<template>
  <main>
    <h1>Settings</h1>
    <div class="options" :key="currentPage">
      <div id="page-main" v-if="currentPage == 0">
        <div class="option-item" @click="goto(1)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Themes</span>
        </div>
        <div class="option-item" @click="goto(2)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Account Settings</span>
        </div>
      </div>
      <div id="page-themes" v-if="currentPage == 1">
        <div class="option-item" @click="goto(0)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back</span>
        </div>
        <div class="theme-display">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -3 24 24"
            width="24"
            fill="currentColor"
          >
            <path
              d="M6.816 11.556c-1.008.464-1.69 1.003-2.084 1.598a51.574 51.574 0 0 0-1.115 1.756c1.124.244 1.969.127 2.578-.281.852-.57 1.408-1.221 1.717-1.977l-1.096-1.096zm1.395-1.433l1.02 1.02c.742-.382 1.489-.987 2.234-1.832 1.139-1.29 3.061-3.588 5.757-6.88a.211.211 0 0 0-.297-.296c-3.286 2.693-5.583 4.615-6.881 5.758-.849.746-1.454 1.491-1.833 2.23zm-.903 6.168c-1.615 1.081-3.826.982-6.63-.298a58.148 58.148 0 0 1 2.387-3.945c.655-.987 1.712-1.794 3.17-2.422C6.72 8.5 7.55 7.423 8.722 6.39c1.32-1.162 3.632-3.096 6.936-5.803a2.21 2.21 0 0 1 3.111 3.111c-2.71 3.31-4.645 5.621-5.804 6.935-.978 1.108-2 1.911-3.067 2.408-.43 1.298-1.293 2.38-2.59 3.249z"
            ></path>
          </svg>
          <span>Themes</span>
        </div>
        <div class="theme-item">
          <div id="light-theme" class="light-theme theme-preview">
            <input
              type="radio"
              name="theme"
              id="theme1"
              checked
              @click="changeTheme('light')"
            />
            <label for="light-theme">Light Theme</label>
          </div>
          <div id="dim-theme" class="dim-theme theme-preview">
            <input
              type="radio"
              name="theme"
              id="theme2"
              @click="changeTheme('dim')"
            />
            <label for="dim-theme">Dim Theme</label>
          </div>
          <div id="oled-theme" class="oled-theme theme-preview">
            <input
              type="radio"
              name="theme"
              id="theme3"
              @click="changeTheme('oled')"
            />
            <label for="oled-theme">Oled Theme</label>
          </div>
          <div id="dark-theme" class="dark-theme theme-preview">
            <input
              type="radio"
              name="theme"
              id="theme4"
              @click="changeTheme('dark')"
            />
            <label for="dark-theme">Dark Theme</label>
          </div>
        </div>
      </div>
      <div id="page-account" v-if="currentPage == 2">
        <div class="option-item" @click="goto(0)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back</span>
        </div>
        <div class="option-item" @click="goto(3)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 -1 24 24"
            width="24"
            fill="currentColor"
          >
            <path
              d="M8.612 16.337l3.746-3.747 1.027.183a5 5 0 1 0-4.039-4.039l.184 1.028-6.994 6.994.177 2.651 2.651.177 1.833-1.833-.707-.707a1 1 0 0 1 1.415-1.414l.707.707zm.707-13.435a7 7 0 1 1 3.715 11.84L6.137 21.64l-4.43-.295a1 1 0 0 1-.932-.932l-.295-4.43 6.898-6.898a6.992 6.992 0 0 1 1.94-6.183zm4.242 5.656A2 2 0 1 1 16.39 5.73a2 2 0 0 1-2.829 2.828z"
            ></path>
          </svg>
          <span>Change Password</span>
        </div>
      </div>
      <div id="page-change-pw" v-if="currentPage == 3">
        <div class="post-create">
          <form @submit.prevent="onSubmit">
            <input
              type="password"
              v-model="password"
              name="password"
              placeholder="Password"
              id="password"
            />
            <p>{{ errorMsg }}</p>
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  name: "Settings",
  data() {
    return {
      pages: [
        { name: "Main", id: 0 },
        { name: "Themes", id: 1 },
        { name: "Account", id: 2 },
        { name: "Change Password", id: 3 },
      ],
      currentPage: 0,
      password: "",
      error: false,
      errorMsg: "",
      qrcodesecret: "",
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  mounted() {
    if (this.cookies.get("token") !== null) {
    } else {
      this.$router.push({ name: "Login" });
    }
  },

  methods: {
    goto(num) {
      this.currentPage = num;
      /*if (num == 1) {
        const themeButtons = document.querySelectorAll(".theme-preview");

        for (let i = 0; i < themeButtons.length; i++) {
          themeButtons[i].addEventListener("mouseup", () => {
            themeButtons[0].checked = false;
            themeButtons[1].checked = false;
            themeButtons[2].checked = false;
            console.log("clicked");
            $(themeButtons[i].children[0])
              .prop("checked", true)
              .trigger("click");
          });
        }
      }*/
    },

    changeTheme(theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );
    },

    async onSubmit(e) {
      try {
        e.preventDefault();
        this.error = false;
        if (!this.password) {
          this.error = true;
          this.errorMsg = `Please enter a password`;
          return;
        }

        let str = this.password.toString();
        str = str.replace(/\s+/g, "");
        if (str == "" || str == null) {
          this.error = true;
          this.errorMsg = "Please enter a password.";
        }

        axios.defaults.headers.post["x-access-token"] =
          this.cookies.get("token");
        if (this.error !== true) {
          await axios
            .create({ withCredentials: true })
            .post(`http://localhost:8080/api/v1/auth/change-password`, {
              password: this.password,
            });
          this.$router.push({ name: "Posts" });
        }
      } catch (e) {
        this.error = true;
      }
    },
  },
};
</script>
