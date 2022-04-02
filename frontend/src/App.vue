<script>
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login
}

import { useCookies } from "vue3-cookies";
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      errors: [],
      userauth: '',
      currentPath: window.location.hash
    }
  },

  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },

  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})

    if (this.cookies.get('token') !== undefined) {
      axios.create({ withCredentials: true }).get('http://localhost:8080/api/v1/test/user', {
        'headers': { 'x-access-token': this.cookies.get('token') }
      }).then((response) => {
        console.log(response.data)
        this.userauth = response.data
      }, (err) => {
        console.log(err)
      })
    } else {
      this.userauth = 'all'
    }

    if (this.userauth !== 'all') {
      document.getElementById('notsigned').style= 'display: none;'
    }
  },

  // Fetches data when the component is created.
  created() {
    // Generate a CSRF token.
    axios.create({withCredentials: true}).get('http://localhost:8080/api/v1/getcsrftoken').then((response) => {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
    }, (err) => {
      console.log(err)
    })
  }
}
</script>

<template>
  <a href="#/">Home</a>
  <div id="notsigned">
    |
    <a href="#/register">Register</a> |
    <a href="#/login">Login</a>
  </div>
  <component :is="currentView" />
</template>

<style>
body {
  background-color: #f2f2f2;
}
</style>