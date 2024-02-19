export interface UserSession {
  token: string | null;
  id: string | null;
  username: string;
  firstNames: string;
  lastNames: string;
  email: string;
  photoUrl: string;
}
