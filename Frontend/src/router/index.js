import { createRouter, createWebHistory } from 'vue-router'
import RegistrarUsuario from '../components/RegistrarUsuario.vue'

const routes = [
  {
    path: '/',
    name: 'RegistrarUsuario',
    component: RegistrarUsuario
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