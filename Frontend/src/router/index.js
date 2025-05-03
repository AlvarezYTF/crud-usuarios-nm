import { createRouter, createWebHistory } from 'vue-router';
import ListaUsuarios from '@/components/ListaUsuarios.vue';
import FormularioUsuario from '@/components/FormularioUsuario.vue';
import ImagenUsuarios from '@/components/ImagenUsuarios.vue';

const routes = [
  {
    path: '/',
    name: 'ListaUsuarios',
    component: ListaUsuarios
  },
  {
    path: '/galeria',
    name: 'ImagenUsuarios',
    component: ImagenUsuarios
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;