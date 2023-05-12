import { AxiosResponse } from "axios";
import { authenticatedApi } from "@/services/config";
import { GetBookingResponse } from "@/types";

/**
 * GET request to API to get one booking by id
 */
export const getBookingById = async (id: string): Promise<AxiosResponse<GetBookingResponse>> => {
  const bookingUrl = `/booking/worker/${id}`;
  return authenticatedApi.get(bookingUrl);
};
