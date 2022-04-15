<template>
  <div>
    <nav class="large-nav">
      <!--old-nav-bar
    <a href="/">Home</a> |
    <a href="/posts">Posts</a>
    <div class="notsigned" v-if="!this.signedIn">
      |
      <a href="/register">Register</a> |
      <a href="/login">Login</a>
    </div>
    ----->
      <ul>
        <li class="post">
          <router-link to="/post">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -2 24 24"
              width="18"
              fill="currentColor"
            >
              <path
                d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm7 11v4a1 1 0 0 1-2 0v-4H5a1 1 0 0 1 0-2h4V5a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2h-4z"
              ></path>
            </svg>
          </router-link>
        </li>
        <li><router-link to="/">Home</router-link></li>
        <div id="search" class="search-box">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2.5 -2.5 24 24"
              width="20"
              fill="currentColor"
            >
              <path
                d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"
              ></path></svg
            ><span>Search</span>
            <span class="search-keys">
              <span>Ctrl</span>
              <span>/</span>
            </span>
          </li>
        </div>
        <div class="navhide" v-if="!this.signedIn">
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
        </div>
        <div class="end">
          <li v-if="this.signedIn" id="messages">
            <router-link to="/messages"
              ><svg
                width="20"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                style="margin-right: 0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6643C3.71421 21.1072 3 20.8567 3 20.2895Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </router-link>
          </li>
          <li v-if="this.signedIn">
            <router-link to="/logout">Logout</router-link>
          </li>
          <li v-if="this.signedIn">
            <router-link to="/me">Profile</router-link>
          </li>
          <a href="https://github.com/juls0730">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="social-icon"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <a href="https://twitter.com/julie4055_">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -4 24 24"
              width="20"
              fill="currentColor"
              class="social-icon"
            >
              <path
                d="M20 1.907a8.292 8.292 0 0 1-2.356.637A4.07 4.07 0 0 0 19.448.31a8.349 8.349 0 0 1-2.607.98A4.12 4.12 0 0 0 13.846.015c-2.266 0-4.103 1.81-4.103 4.04 0 .316.036.625.106.92A11.708 11.708 0 0 1 1.393.754a3.964 3.964 0 0 0-.554 2.03c0 1.403.724 2.64 1.824 3.363A4.151 4.151 0 0 1 .805 5.64v.05c0 1.958 1.415 3.591 3.29 3.963a4.216 4.216 0 0 1-1.08.141c-.265 0-.522-.025-.773-.075a4.098 4.098 0 0 0 3.832 2.807 8.312 8.312 0 0 1-5.095 1.727c-.332 0-.658-.02-.979-.056a11.727 11.727 0 0 0 6.289 1.818c7.547 0 11.673-6.157 11.673-11.496l-.014-.523A8.126 8.126 0 0 0 20 1.907z"
              ></path>
            </svg>
          </a>
        </div>
      </ul>
    </nav>
    <nav class="small-nav">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          id="menu-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
    <hr />
    <div id="search-box" class="search-bar-box">
      <span>Search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-6 -6 24 24"
        width="24"
        fill="currentColor"
        class="close-button"
        id="close-button"
      >
        <path
          d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"
        ></path>
      </svg>
      <hr />
      <form @submit.prevent="onSubmit">
        <input
          id="search-bar"
          type="text"
          placeholder="Search"
          v-model="search"
          style="width: 100%"
          maxlength="50"
        />
        <input type="submit" value="Search" style="width: 100%" />
      </form>
    </div>
    <div id="slideover-nav" class="slideover-nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <hr />
        <div v-if="!this.signedIn">
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Signup</router-link></li>
        </div>
        <div v-if="this.signedIn">
          <li><router-link to="/me">Profile</router-link></li>
          <li><router-link to="/logout">Logout</router-link></li>
          <li><router-link to="/messages">Messages</router-link></li>
        </div>
        <hr />
        <li><a href="https://github.com/juls0730">Github</a></li>
        <li><a href="https://twitter.com/julie4055_">Twitter</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  data() {
    return {
      errors: [],
      signedIn: false,
      search: "",
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  mounted() {
    if (this.cookies.get("token") !== null) {
      this.signedIn = true;
    }

    screen.orientation.onchange = function () {
      document.getElementById("search-box").classList.remove("show");
      document
        .getElementById("slideover-nav")
        .classList.remove("slideover-show");
    };

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "/") {
        document.getElementById("search-box").classList.toggle("show");
      }
    });

    document.getElementById("menu-icon").addEventListener("click", function () {
      document
        .getElementById("slideover-nav")
        .classList.toggle("slideover-show");
    });

    document.getElementById("search").addEventListener("click", () => {
      document.getElementById("search-box").classList.toggle("show");
    });

    document.getElementById("close-button").addEventListener("click", () => {
      document.getElementById("search-box").classList.toggle("show");
    });
  },

  methods: {
    onSubmit() {
      this.search = document.getElementById("search-bar").value;
      window.location.href = "/search/" + this.search;
    },
  },
};
</script>
