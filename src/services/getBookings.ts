import { authenticatedApi } from "./config";
import { AxiosResponse } from "axios";
import { GetBookingsQueryParams, GetBookingsResponse, RealGetBookingsQueryParams } from "@/types";

// /**
//  * Calculates a date string for the bookings request
//  * It's the current date (execution time) minus 1 day at 00:00:00
//  * @returns date string as YYYY-MM-DDTHH
//  */
// const getDateMinusOneDay = () => {
//   const date = new Date();
//   date.setDate(date.getDate() - 1);
//   date.setHours(0, 0, 0, 0);
//   return date.toISOString().split("T")[0];
// };
//
// /**
//  * Calculates a date string for the bookings request
//  * It's the current date (execution time) plus 1 day at 23:59:59
//  * @returns date string as YYYY-MM-DDTHH
//  */
// const getDatePlusOneDay = () => {
//   const date = new Date();
//   date.setDate(date.getDate() + 1);
//   date.setHours(23, 59, 59, 999);
//   return date.toISOString().split("T")[0];
// };

/**
 * GET request to API to get bookings
 * By default, it will get bookings from the current date minus 1 day at 00:00:00 to the current date plus 1 day at 23:59:59
 * If a type of booking is provided, it will get bookings of that type (arrivals or departures) and override the default date filters
 * - Arrivals means date_ini between yesterday at 00:00:00 and tomorrow at 23:59:59, and no date_end (TODO: unknown api behaviour, so we can't implement this yet)
 * - Departures means date_end between yesterday at 00:00:00 and tomorrow at 23:59:59, and no date_ini (TODO: unknown api behaviour, so we can't implement this yet)
 */
export const getBookings = async (params: GetBookingsQueryParams): Promise<AxiosResponse<GetBookingsResponse>> => {
  const bookingUrl = "/bookings/worker";

  const queryParams: RealGetBookingsQueryParams = {
    page: params.page ? params.page.toString() : "1",
    // date_ini: getDateMinusOneDay(), // default date_ini
    // date_end: getDatePlusOneDay(), // default date_end
  };

  // if (params.type === "arrivals") {
  //   queryParams.date_ini = getDateMinusOneDay();
  //   delete queryParams.date_end;
  // }
  //
  // if (params.type === "departures") {
  //   queryParams.date_end = getDatePlusOneDay();
  //   delete queryParams.date_ini;
  // }

  // TODO: We could destruct the params object after removing the type property, but not until the api behaviour is known)
  if (params.limit) queryParams.limit = params.limit.toString();

  const queryParamsString = new URLSearchParams(queryParams).toString();

  return authenticatedApi.get(`${bookingUrl}?${queryParamsString}`);
};
