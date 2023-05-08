import { unauthenticatedApi } from "./config";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/types";

/**
 * POST request to API to get user details and jwt token
 */
export const login = async (credentials: { email: string; password: string }): Promise<AxiosResponse<LoginResponse>> => {
  return unauthenticatedApi.post("/auth-worker/login", credentials);
};
