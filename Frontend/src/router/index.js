import { createRouter, createWebHistory } from 'vue-router'
import RegistrarUsuario from '../components/RegistrarUsuario.vue'
import LoginForm from '@/components/LoginForm.vue';
import ImagenUsuarios from '@/components/ImagenUsuarios.vue';

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
    path: '/galeria',
    name: 'ImagenUsuarios',
    component: ImagenUsuarios
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router