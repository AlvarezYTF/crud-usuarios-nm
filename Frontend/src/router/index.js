import { createRouter, createWebHistory } from 'vue-router'
import RegistrarUsuario from '../components/RegistrarUsuario.vue'
import LoginForm from '@/components/LoginForm.vue';
import mostrarUsuarios from '../components/MostrarUsuarios.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/registrar',
    name: 'RegistrarUsuario',
    component: RegistrarUsuario
  },
  {
    path: '/usuarios/:id',
    name: 'VerUsuario',
    component: () => import('@/components/VerUsuario.vue')
  },
  {
    path: '/usuarios',
    name: 'MostrarUsuarios',
    component: mostrarUsuarios
  } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router