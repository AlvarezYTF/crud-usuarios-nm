import { createRouter, createWebHistory } from 'vue-router';
import ListaUsuarios from '@/components/ListaUsuarios.vue';
import FormularioUsuario from '@/components/FormularioUsuario.vue';

const routes = [
  {
    path: '/',
    name: 'ListaUsuarios',
    component: ListaUsuarios
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;