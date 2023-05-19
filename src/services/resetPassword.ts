import { authenticatedApi } from "./config";

/**
 * POST request to API to reset password
 */
export const resetPassword = async ({ current_password, new_password }: { current_password: string; new_password: string }) => {
  return authenticatedApi.post("/auth-worker/reset-password", {
    current_password,
    new_password,
  });
};
