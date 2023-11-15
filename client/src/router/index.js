// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  //rotas admin
  
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/Home.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'HomeAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/admin/HomeAdmin.vue'),
      },
    ],
  },
  {
    path: '/newpost',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'NovaPostagem',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/admin/NovaPostagem.vue'),
      },
    ],
  },
  {
    path: '/posts',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Postagem',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/admin/Postagem.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Conta',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/admin/Conta.vue'),
      },
    ],
  },
  {
    path: '/post',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Post',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/admin/Post.vue'),
      },
    ],
  },

  //rotas pra ambos, admin e client

  {
    path: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/LoginCad.vue'),
      },
    ],
  },

  //rotas client

  //aleatoriedades

  {
    path: '/aleatoriedades',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Aleatoriedades',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/AleatoriedadePost.vue'),
      },
    ],
  },
  
  // comidas

  {
    path: '/comidas',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Comidas',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/ComidasPost.vue'),
      },
    ],
  },
  
  //Filmes & Séries

  {
    path: '/filmeserie',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'FilmeSerie',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/FilmeSeriePost.vue'),
      },
    ],
  },  

  // Livros

  {
    path: '/livros',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Livros',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/LivrosPost.vue'),
      },
    ],
  },  
  
  // Musica

  {
    path: '/musica',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Musica',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/MusicaPost.vue'),
      },
    ],
  },

  // Favoritos

  {
    path: '/favoritos',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'FavsView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/FavsView.vue'),
      },
    ],
  },

  // Likes

  {
    path: '/curtidas',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'LikeView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/client/LikesView.vue'),
      },
    ],
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

let redirected = false
router.beforeEach((to, from, next) => {
  if (to.name === 'Home' && !redirected) {
    redirected = true
    next({ name: 'Login' }) // Redireciona apenas na primeira vez que "/" é acessado
  } else {
    next()
  }
})

export default router
