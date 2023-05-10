export type APIError = any;

export interface User {
  access_token: string; // JWT token
  token_type: string;
  expires_at: string;
  profile_type: string;
  profile: {
    id: number;
    name: string;
    lastname: string;
    country_phone_iso2: string | null;
    phone: string | null;
    email: string;
    type: number;
    email_verified_at: string | null;
    is_admin: number;
    language: string | null;
    port_id: number;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
    port: {
      id: number;
      name: string;
      images: string[] | null;
      logo: string | null;
      map: string | null;
      country_iso_2: string | null;
      city: string | null;
      latitude: string | null;
      longitude: string | null;
      email: string | null;
      phone: string | null;
      web: string | null;
      description: string | null;
      address_1: string | null;
      address_2: string | null;
      created_at: string | null;
      updated_at: string | null;
      deleted_at: string | null;
      map_url: string | null;
      logo_url: string | null;
      gallery_root: string | null;
    };
  };
}

export interface LoginResponse {
  error: boolean;
  errors: APIError[];
  code: number;
  status: number;
  message: string | null;
  data: User;
}

export interface Booking {
  id: number;
  is_subscription: number; // 0 or 1
  is_subscription_active: number; // 0 or 1
  berth_id: number;
  berth_id_2: number | null;
  ship_id: number;
  user_id: number;
  worker_id: string | null;
  port_id: number;
  date_ini: string;
  date_end: string;
  arrived_at: string | null;
  departured_at: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface GetBookingsResponse {
  error: boolean;
  errors: APIError[];
  code: number;
  status: number;
  message: string | null;
  data: Booking[];
  next: null;
  prev: null;
  items: number;
}

/**
 * Query params for getBookings function in services/getBookings.ts
 * May also be used for a filter component in the UI but not for the actual request
 */
export interface GetBookingsQueryParams {
  type?: 'arrivals' | 'departures';
  page?: number;
  limit?: number;
  sort_by?: 'date_ini' | 'date_end' | 'created_at' | 'updated_at' | 'deleted_at';
  sort_order?: 'asc' | 'desc';
  berth_type?: string; // Enum? 'short' | 'long'
  ship_type?: string; // Enum? 'catamaran' | 'sailboat' | 'motorboat'
}

/**
 * This is the real interface for the params that will actually be sent to the API as query params
 * Yes, you read that right, the GetBookingsQueryParams type is only to get the correct params for the getBookings function
 * It's a bit different because we need to calculate stuff depending on stuff, and we like the interface design pattern: No logic in the interface, only in the implementation...
 * (Trust me, I watched the tiktoks, and ate the crayons, I know what I'm doing)
 */
export type RealGetBookingsQueryParams = {
  page: string;
  date_ini?: string;
  date_end?: string;
  limit?: string;
  sort_by?: 'date_ini' | 'date_end' | 'created_at' | 'updated_at' | 'deleted_at';
  sort_order?: 'asc' | 'desc';
  berth_type?: string;
  ship_type?: string;
}

export interface Filter {
  key: keyof GetBookingsQueryParams; // key to be used in the query string
  value: GetBookingsQueryParams[keyof GetBookingsQueryParams]; // value to be used in the query string
  icon: string; // icon to be displayed in the chip
  displayedValue: string; // value to be displayed in the chip (could be different from value for legibility)
}
