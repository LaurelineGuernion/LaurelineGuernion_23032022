import { createRouter, createWebHistory } from 'vue-router'

const routes = [
{
  path: '/',
  name: 'Accueil',
  component: () => import("../views/Accueil")
},
{
  path: '/', 
  name: 'SliderHome',
  component: () => import("../components/SliderHome")
},
{
  path: '/login',
  name: 'Connexion',
  component: () => import("../components/LoginForm")
},
{
  path: '/signup',
  name: 'Inscription',
  component: () => import("../components/SignupForm")
},
{
  path: '/posts',
  name: 'Posts',
  component: () => import("../views/Posts")
},
{
  path: '/:id',
  name: 'Profil',
  component: () => import("../views/Profil")
},
{
  path: '/members',
  name: 'Members',
  component: () => import("../views/Members"),
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
