import { authenticatedApi } from "./config";
import { GetBookingsResponse } from "@/types";

/**
 * GET request to API to get bookings
 */
export const getArrivals = async (): Promise<GetBookingsResponse> => {
  return authenticatedApi.get("/bookings/arrivals").then((response) => response.data);
};
