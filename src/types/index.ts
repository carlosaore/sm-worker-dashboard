export type APIError = any;

export interface Worker {
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
  data: Worker;
}

export interface User {
  uuid: string;
  name: string;
  lastname: string;
  email: string;
  email_verified_at: string;
  country_phone_iso2: string;
  language: string;
  phone: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface Berth {
  id: number;
  name: string;
  external_id: string;
  disabled: number; // 0 or 1
  light: number; // 0 or 1
  water: number; // 0 or 1
  closed: number; // 0 or 1
  has_owner: number; // 0 or 1
  port_id: number;
  berth_group_id: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Ship {
  name: string;
  length: string;
  beam: string;
  draft: string;
  type: number; // 1 | 2 | 3
  target: string;
  flag: string;
  mmsi: null | string; // TODO: What is this?
  insurance: string;
  insurance_expires_at: string;
  validated: number; // 0 or 1
  commercial_use: number; // 0 or 1
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
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
  user: User;
  ship: Ship;
  berth: Berth;
}

export interface GetBookingResponse {
  error: boolean;
  errors: APIError[];
  code: number;
  status: number;
  message: string | null;
  data: Booking;
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
  type?: "arrivals" | "departures";
  page?: number;
  limit?: number;
  berth_name?: string;
  ship_name?: string;
  target?: string; // "Matricula" ??
  user_name?: string;
}

/**
 * This is the real interface for the params that will actually be sent to the API as query params
 * Yes, you read that right, the GetBookingsQueryParams type is only to get the correct params for the getBookings function
 * It's a bit different because we need to calculate stuff depending on stuff, and we like the interface design pattern: No logic in the interface, only in the implementation...
 * (Trust me, I watched the tiktoks, and ate the crayons, I know what I'm doing)
 */
export type RealGetBookingsQueryParams = {
  page: string;
  limit?: string;
  berth_name?: string;
  ship_name?: string;
  target?: string; // "Matricula" ??
  user_name?: string;
};

/**
 * An array of Filter objects tied to a form and a display component
 * Intended to ease filter form logic and applied filter display
 * Loosely related to the GetBookingsQueryParams type
 * NOTE: Might not be the best implementation, but I already did it so...
 */
export interface Filter {
  // key to be used in the query string (GetBookingsQueryParams)
  key: keyof GetBookingsQueryParams;
  // value to be used in the query string
  value: string;
  // icon to be displayed in the chip
  icon:
    | "mdi-sail-boat" // for ship name
    | "mdi-account-tie-hat" // for "captain" name
    | "mdi-alphabetical-variant" // for "matricula" name
    | "mdi-pier"; // for berth name
  // value to be displayed in the chip (e.g. `Embarcación "La Ro..."`, `Matricula "1234..."`)
  displayedValue: string;
}
