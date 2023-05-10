import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth.store";
import Home from "@/views/Home.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Login from "@/views/Login.vue";
import IncomingAll from "@/views/IncomingAll.vue";
import OutgoingAll from "@/views/OutgoingAll.vue";
import Notifications from "@/views/Notifications.vue";
import Profile from "@/views/Profile.vue";
import BerthsAll from "@/views/BerthsAll.vue";
import IncomingOne from "@/views/IncomingOne.vue";
import OutgoingOne from "@/views/OutgoingOne.vue";

const routes = [
  {
    path: "/", // you shouldn't be able to access this route, but if you do, redirect to home
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/entradas",
    name: "incomingAll",
    component: IncomingAll,
  },
  {
    path: "/entradas/:id",
    name: "incomingOne",
    component: IncomingOne,
  },
  {
    path: "/salidas",
    name: "outgoingAll",
    component: OutgoingAll,
  },
  {
    path: "/salidas/:id",
    name: "outgoingOne",
    component: OutgoingOne,
  },
  {
    path: "/amarres",
    name: "berthsAll",
    component: BerthsAll,
  },
  {
    path: "/notificaciones",
    name: "notifications",
    component: Notifications,
  },
  {
    path: "/perfil",
    name: "profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    component: ResetPassword,
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
