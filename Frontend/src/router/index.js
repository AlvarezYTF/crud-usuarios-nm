import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/',
    redirect: '/login', // Redirige la raíz (/) a /login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;