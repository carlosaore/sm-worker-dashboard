import { authenticatedApi } from "./config";
import { GetBookingsResponse } from "@/types";

/**
 * GET request to API to get bookings
 */
export const getFreeBerths = async (): Promise<GetBookingsResponse> => {
  return authenticatedApi.get("/bookings/worker/berths").then((response) => response.data);
};
