// Constantes do módulo de autenticação
export const AUTH_STORAGE_KEYS = {
  TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "auth_user",
} as const;

// Constantes do módulo de autenticação - versão inicial
export const AUTH_ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;
