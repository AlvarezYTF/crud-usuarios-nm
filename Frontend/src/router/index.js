import { createRouter, createWebHistory } from 'vue-router'
// import RegistrarUsuario from '../components/RegistrarUsuario.vue'
// import LoginForm from '@/components/LoginForm.vue';

// tengo comentado esos servicios porque no los estoy usando, pero los voy a dejar por si acaso
// ademas, si los descomentan enviara error porque no estan conectados a la ruta de mostrar usuarios
const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: LoginForm,
  // },
  // {
  //   path: '/registrar',
  //   name: 'RegistrarUsuario',
  //   component: RegistrarUsuario
  // },
  {
    path: '/',
    redirect: '/usuarios'
  },
  {
    path: '/usuarios',
    name: 'MostrarUsuarios',
    component: () => import('../components/MostrarUsuarios.vue')
  },
  {
    path: '/usuarios/:id',
    name: 'VerUsuario',
    component: () => import('@/components/VerUsuario.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router