import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
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