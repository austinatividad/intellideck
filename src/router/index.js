import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";
import MainPage from "../views/MainPage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/deck/:_id",
    name: "deck",
    component: () =>
      import(/* webpackChunkName: "deck" */ "../views/DeckView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/CreateView.vue"),
  },
  {
    path: "/deck/:_id/practice",
    name: "practice",
    component: () =>
      import(/* webpackChunkName: "practice" */ "../views/PracticeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
