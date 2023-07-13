import { authenticatedApi } from "./config";
import { GetBookingsResponse } from "@/types";

/**
 * GET request to API to get bookings
 */
export const getDepartures = async (): Promise<GetBookingsResponse> => {
  return authenticatedApi.get("/bookings/departures").then((response) => response.data);
};
