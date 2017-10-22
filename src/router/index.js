import Vue from 'vue';
import Router from 'vue-router';
import ToDo from '@/components/ToDo';
import ToDoStats from '@/components/ToDoStats';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'To-Do',
      component: ToDo,
    },
    {
      path: '/stats',
      name: 'Stats',
      component: ToDoStats,
    },
  ],
});
