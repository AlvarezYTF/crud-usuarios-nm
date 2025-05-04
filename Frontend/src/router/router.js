import { createRouter, createWebHistory } from 'vue-router'
import RegistrarUsuario from '../components/RegistrarUsuario.vue'
import LoginForm from '@/components/LoginForm.vue';
import PerfilUsuario from '@/components/Perfil.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'RegistrarUsuario',
    component: RegistrarUsuario
  },
  {
    path: '/perfil',
    name: 'PerfilUsuario',
    component: PerfilUsuario
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router