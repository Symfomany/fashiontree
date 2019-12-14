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
    path: '/login',
    name: 'login',
    component: () => import('../containers/LoginContainer.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.name != "login" && to.name != "logout" && !localStorage.getItem('token')) next('/login');
  else next()
})

export default router;
