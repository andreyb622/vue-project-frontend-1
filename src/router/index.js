import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    name: "main",
    path: "/main",
    meta: { needsAuth: true },
    component: () => import("../pages/Main.vue"),
  },
  {
    name: "board",
    path: "/board/:id",
    meta: { needsAuth: true },
    props: true,
    component: () => import("../pages/Board.vue"),
  },
  {
    name: "profile",
    path: "/profile",
    meta: { needsAuth: true },
    component: () => import("../pages/Profile.vue"),
  },
  {
    name: "select-demo",
    path: "/select-demo",
    meta: { needsAuth: false },
    component: () => import("../components/ui/CustomSelectDemo.vue"),
  },
  {
    name: "auth",
    path: "/auth",
    meta: { needsAuth: false },
    component: () => import("../pages/Auth.vue"),
  },
  {
    path: "/:notFound(.*)",
    component: () => import("../components/nav/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function(to, _from, next) {
  const token = localStorage.getItem("token");
  if (to.meta.needsAuth) {
    if (!token) {
      next({ name: "auth" });
    } else {
      next();
    }
  } else if (!to.meta.needsAuth) {
    if (token) {
      next({ name: "main" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
