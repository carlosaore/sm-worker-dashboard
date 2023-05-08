import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth.store";
import Home from "@/views/Home.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "reset-password",
        name: "ResetPassword",
        component: ResetPassword,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// This is a global guard that will be called for all routes
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  // If the user is not logged in and is not trying to access the login page, logout
  if (!authStore.userIsLoggedIn && to.name !== "Login") {
    console.log("User is not logged in and is not trying to access the login page, logout");
    await authStore.logout();
    return false;
  }
});

export default router;
