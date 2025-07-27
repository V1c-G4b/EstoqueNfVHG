export const authRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;

export type AuthRoute = (typeof authRoutes)[keyof typeof authRoutes];
