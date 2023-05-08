import { defineStore } from "pinia";
import router from "@/router";
import { User } from "@/types";
import { authenticatedApi } from "@/services/config";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userIsLoggedIn: false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  }),
  actions: {
    async login(user: User, rememberMe: boolean) {
        this.user = user;
        this.userIsLoggedIn = true;
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        authenticatedApi.defaults.headers.common["Authorization"] = `Bearer ${user.access_token}`;
        await router.push("/home");
    },
    async logout() {
      this.user = null;
      this.userIsLoggedIn = false;
      localStorage.removeItem("user");
      authenticatedApi.defaults.headers.common["Authorization"] = "";
      // Should we clear localStorage here? localStorage.clear() ? Should we clear the router history too?
      await router.push("/login");
    },
    async resetPassword() {
      // TODO
    },
    /**
     * Checks if user is already logged in by checking if there is a user in localStorage
     * If there is a user in localStorage, it updates the user and userIsLoggedIn states, and sets the Authorization header for authenticated requests
     * If there is no user in localStorage, calls logout() to do all the necessary cleanup and redirect to login page
     */
    async checkAuth() {
      const userInLocalStorage = Boolean(localStorage.getItem("user"));
      if (userInLocalStorage) {
        this.user = JSON.parse(localStorage.getItem("user") as string);
        this.userIsLoggedIn = true;
        authenticatedApi.defaults.headers.common["Authorization"] = `Bearer ${this.user.access_token}`;
      } else {
        await this.logout();
      }
    }
  },
});
