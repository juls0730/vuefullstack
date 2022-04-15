import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Post from '../views/Post.vue'
import Posts from '../views/Posts.vue'
import showPost from '../views/showPost.vue'
import MyUser from '../views/MyUser.vue'
import Settings from '../views/Settings.vue'
import Search from '../views/Search.vue'
import NotFound from '../views/NotFound.vue'
import Messages from '../views/Messages.vue'
import CreateConversation from '../views/CreateConversation.vue'
import ShowConversation from '../views/ShowConversation.vue'
import Logout from '../views/Logout.vue'
const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    name: 'userDetails',
    path: '/user/:id',
    component: User
  },
  {
    name: 'Post',
    path: '/post',
    component: Post
  },
  {
    name: 'Posts',
    path: '/',
    component: Posts
  },
  {
    name: 'PostDetails',
    path: '/post/:id',
    component: showPost
  },
  {
    name: 'MyUser',
    path: '/me',
    component: MyUser
  },
  {
    name: 'Settings',
    path: '/me/settings',
    component: Settings
  },
  {
    name: 'Search',
    path: '/search/:query',
    component: Search
  },
  {
    name: 'Messages',
    path: '/messages',
    component: Messages
  },
  {
    name: 'CreateConversation',
    path: '/messages/create',
    component: CreateConversation
  },
  {
    name: 'ShowConversation',
    path: '/messages/:id',
    component: ShowConversation
  },
  {
    name: 'Logout',
    path: '/logout',
    component: Logout
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router