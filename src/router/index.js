import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'listing',
    component: () => import('../containers/ListingContainer.vue'),
  },
  {
    path: '/',
    name: 'registration',
    component: () => import('../containers/RegistrationContainer.vue'),
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: () => import('../containers/ConfirmationContainer.vue'),
  },
  {
    path: '/recommandation',
    name: 'recommandation',
    component: () => import('../containers/RecommandationContainer.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
