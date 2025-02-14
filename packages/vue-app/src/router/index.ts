import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/about/index.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});