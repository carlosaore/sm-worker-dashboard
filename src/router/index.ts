import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store";
import Home from "@/views/Home.vue";
import ResetPasswordView from "@/views/ForgotPasswordView.vue";
import Login from "@/views/Login.vue";
import ArrivalsAll from "@/views/ArrivalsAll.vue";
import DeparturesAll from "@/views/DeparturesAll.vue";
import Notifications from "@/views/Notifications.vue";
import Profile from "@/views/Profile.vue";
import BerthsAll from "@/views/BerthsAll.vue";
import ArrivalsOne from "@/views/ArrivalsOne.vue";
import DeparturesOne from "@/views/DeparturesOne.vue";

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
    name: "arrivalsAll",
    component: ArrivalsAll,
  },
  {
    path: "/entradas/:id",
    name: "arrivalsOne",
    component: ArrivalsOne,
  },
  {
    path: "/salidas",
    name: "departuresAll",
    component: DeparturesAll,
  },
  {
    path: "/salidas/:id",
    name: "departuresOne",
    component: DeparturesOne,
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
    component: ResetPasswordView,
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
