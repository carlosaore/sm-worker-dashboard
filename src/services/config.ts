import axios from "axios";

const baseURL = "http://localhost:5000";
const userInLocalStorage = Boolean(localStorage.getItem("user"));
console.log(userInLocalStorage);

/**
 * Axios instance for the initial login request or any other unauthenticated requests with base url
 */
export const unauthenticatedApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios instance for authenticated requests with base url
 * This instance will automatically include the JWT token in the Authorization header of each request
 * It pulls the token from auth store on first request, and/or will be updated if needed during the session (see auth.store.ts actions login and logout)
 */
export const authenticatedApi = axios.create({
  baseURL,
  headers: userInLocalStorage
    // type assertion to tell TS that localStorage.getItem("user") is not null since we checked for it above (userInLocalStorage)
    ? { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") as string).access_token}` }
    : {},
});
