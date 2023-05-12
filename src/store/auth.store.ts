import { defineStore } from "pinia";
import router from "@/router";
import { Worker } from "@/types";
import { authenticatedApi } from "@/services/config";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    workerIsLoggedIn: false,
    worker: localStorage.getItem("worker")
      ? JSON.parse(localStorage.getItem("worker") as string)
      : null,
  }),
  actions: {
    async login(worker: Worker, rememberMe: boolean) {
        this.worker = worker;
        this.workerIsLoggedIn = true;
        if (rememberMe) {
          localStorage.setItem("worker", JSON.stringify(worker));
        }
        authenticatedApi.defaults.headers.common["Authorization"] = `Bearer ${worker.access_token}`;
        await router.push("/home");
    },
    async logout() {
      this.worker = null;
      this.workerIsLoggedIn = false;
      localStorage.removeItem("worker");
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
      const userInLocalStorage = Boolean(localStorage.getItem("worker"));
      if (userInLocalStorage) {
        this.worker = JSON.parse(localStorage.getItem("worker") as string);
        this.workerIsLoggedIn = true;
        authenticatedApi.defaults.headers.common["Authorization"] = `Bearer ${this.worker.access_token}`;
        await router.push("/home");
      } else {
        await this.logout();
      }
    }
  },
});
