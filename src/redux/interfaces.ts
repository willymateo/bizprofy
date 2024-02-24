export interface Store {
  userSession: UserSession;
  navigation: Navigation;
  language: Language;
}

export interface UserSession {
  token: string | null;
  id: string | null;
  username: string;
  firstNames: string;
  lastNames: string;
  email: string;
  photoUrl: string;
}

export interface Language {
  imgUrl: string;
  value: string;
  label: string;
}

export interface Navigation {
  isDrawerOpen: boolean;
}
