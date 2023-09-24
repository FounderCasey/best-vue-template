import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ServicesView from "../views/ServicesView.vue";
import TeamView from "../views/TeamView.vue";
import StatusView from "../views/StatusView.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/services",
      name: "services",
      component: ServicesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/team",
      name: "team",
      component: TeamView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/status",
      name: "status",
      component: StatusView,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (useAuthStore().isAuthenticated) {
      next();
      return;
    } else {
      next("/login");
    }
  } else if (to.matched.some((record) => !record.meta.requiresAuth)) {
    if (to.name === "status") return next();

    if (useAuthStore().isAuthenticated) {
      next("/");
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
