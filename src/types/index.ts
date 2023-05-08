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
