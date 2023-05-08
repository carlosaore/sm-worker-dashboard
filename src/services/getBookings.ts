import { authenticatedApi } from "./config";
import { AxiosResponse } from "axios";
import { GetBookingsResponse } from "@/types";

/**
 * Calculates the date_ini for the bookings request
 * By default, it will be the current date minus 1 day at 00:00:00
 */
const getDateIni = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

/**
 * Calculates the date_end for the bookings request
 * By default, it will be the current date plus 1 day at 23:59:59
 */
const getDateEnd = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
}

/**
 * GET request to API to get bookings
 * By default, it will get bookings from the current date minus 1 day at 00:00:00 to the current date plus 1 day at 23:59:59
 * @param params.page - Page number to get bookings from (default: 1)
 */
export const getBookings = async (params: { page?: number }): Promise<AxiosResponse<GetBookingsResponse>> => {
    const bookingUrl = "/bookings/worker";

    const queryParams = new URLSearchParams({
      page: params.page ? params.page.toString() : "1",
      date_ini: getDateIni(),
      date_end: getDateEnd(),
    });

    return authenticatedApi.get(`${bookingUrl}?${queryParams.toString()}`);
  };
