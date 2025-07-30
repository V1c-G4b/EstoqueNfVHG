import type {
  AuthResponse,
  LoginCredentials,
  User,
} from "@/features/auth/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
  refreshToken: () => Promise<void>;

  updateUser: (userData: Partial<User>) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  hasRole: (role: User["role"]) => boolean;
  isAdmin: () => boolean;
  isManager: () => boolean;

  reset: () => void;
}

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        login: async (credentials) => {
          set({ isLoading: true, error: null }, false, "login:start");

          try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if (
              credentials.email === "admin@test.com" &&
              credentials.password === "admin"
            ) {
              const user: User = {
                id: "1",
                name: "Administrador",
                email: credentials.email,
                role: "admin",
                avatar: undefined,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              const token = "fake-jwt-token-" + Math.random().toString(36);

              const authResponse: AuthResponse = {
                success: true,
                user,
                token,
                refreshToken:
                  "fake-refresh-token-" + Math.random().toString(36),
              };

              set(
                {
                  user,
                  token,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                },
                false,
                "login:success"
              );

              return authResponse;
            } else {
              throw new Error("Credenciais inválidas");
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Erro ao fazer login";
            set(
              {
                error: errorMessage,
                isLoading: false,
              },
              false,
              "login:error"
            );
            throw error;
          }
        },

        logout: () => {
          set(initialState, false, "logout");
        },

        refreshToken: async () => {
          const { token } = get();
          if (!token) return;

          try {
            // Simular refresh do token
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newToken =
              "refreshed-jwt-token-" + Math.random().toString(36);
            set({ token: newToken }, false, "refreshToken");
          } catch (error) {
            // Se falhar o refresh, fazer logout
            set(initialState, false, "refreshToken:error");
          }
        },

        // Ações de usuário
        updateUser: (userData) =>
          set(
            (state) => ({
              user: state.user ? { ...state.user, ...userData } : null,
            }),
            false,
            "updateUser"
          ),

        // Ações de estado
        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),
        setError: (error) => set({ error }, false, "setError"),

        // Verificações
        hasRole: (role) => {
          const { user } = get();
          return user?.role === role;
        },

        isAdmin: () => {
          const { user } = get();
          return user?.role === "admin";
        },

        isManager: () => {
          const { user } = get();
          return user?.role === "manager" || user?.role === "admin";
        },

        // Reset
        reset: () => set(initialState, false, "reset"),
      }),
      {
        name: "auth-store", // nome para o localStorage
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }), // apenas persistir dados importantes
      }
    ),
    {
      name: "auth-store", // nome para o Redux DevTools
    }
  )
);
