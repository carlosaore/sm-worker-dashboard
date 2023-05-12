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
    path: "/",
    redirect: "/home",
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

router.beforeEach(async (to) => {
  const { workerIsLoggedIn, logout } = useAuthStore();
  // If the user is not logged in and is not trying to access the login page, logout
  if (!workerIsLoggedIn && to.name !== "login" && to.name !== "resetPassword") {
    await logout();
    return false;
  }
});

export default router;
