<script>
import Home from './components/Home.vue'
import Register from './components/Register.vue'
const routes = {
  '/': Home,
  '/register': Register
}

import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      errors: [],
      currentPath: window.location.hash
    }
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
  <a href="#/">Home</a> |
  <a href="#/register">Register</a>
  <component :is="currentView" />
</template>

<style>
body {
  background-color: #f2f2f2;
}
</style>