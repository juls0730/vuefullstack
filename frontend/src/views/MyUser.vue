<template>
  <main>
    <h1>You are {{ name }}</h1>

    <div class="options">
      <div class="option-item">
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
        <span>Settings</span>
      </div>
    </div>
  </main>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  name: "MyUser",
  data() {
    return {
      name: ``,
    };
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  mounted() {
    if (this.cookies.get("token") !== null) {
      axios
        .create({ withCredentials: true })
        .get("http://localhost:8080/api/v1/user/username", {
          headers: { "x-access-token": this.cookies.get("token") },
        })
        .then(
          (response) => {
            console.log(response.data.user);
            this.name = response.data.user.username;
          },
          (err) => {
            console.log(err);
          }
        );

        const optionbuttons = document.querySelectorAll(".option-item");
        for (let i = 0; i < optionbuttons.length; i++) {
          optionbuttons[i].addEventListener("mousedown", function () {
            optionbuttons[i].classList.add("option-item-active");
          });

          optionbuttons[i].addEventListener("mouseleave", function () {
            optionbuttons[i].classList.remove("option-item-active");
          });

          optionbuttons[i].addEventListener("mouseup", function () {
            window.location.href = `/me/settings`;
            optionbuttons[i].classList.remove("option-item-active");
          });
        }
    } else {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>