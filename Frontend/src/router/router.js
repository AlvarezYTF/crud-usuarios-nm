import { createRouter, createWebHistory } from 'vue-router'
import RegistrarUsuario from '../components/RegistrarUsuario.vue'
import LoginForm from '@/components/LoginForm.vue';
import PerfilUsuario from '@/components/Perfil.vue';
import MostrarUsuarios from '@/components/MostrarUsuarios.vue';
import VerUsuario from '@/components/VerUsuario.vue';
import ActualizarImagen from '@/components/ActualizarImagen.vue';

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
    path: '/actualizar-imagen/:id',
    name: 'ActualizarImagen',
    component: ActualizarImagen
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router