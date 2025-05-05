import { createRouter, createWebHistory } from 'vue-router'
import RegistrarUsuario from '../components/RegistrarUsuario.vue'
import LoginForm from '@/components/LoginForm.vue';
import PerfilUsuario from '@/components/Perfil.vue';
import MostrarUsuarios from '@/components/MostrarUsuarios.vue';
import VerUsuario from '@/components/VerUsuario.vue';
import EditarUsuario from '@/components/EditarUsuario.vue';

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
    path: '/verUsuario/:id',
    name: 'VerUsuario',
    component: VerUsuario
  },
  {
    path: '/usuarios',
    name: 'MostrarUsuarios',
    component: MostrarUsuarios
  },
  {
    path: '/perfil',
    name: 'PerfilUsuario',
    component: PerfilUsuario
  },
  {
    path:'/editarUsuario/:id',
    name: 'EditarUsuario',
    component: EditarUsuario
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router