export interface AuthResponse {
  accessToken: string;
  refreshToken: string | null;
  email: string;
  name: string;
  status: boolean;
}
