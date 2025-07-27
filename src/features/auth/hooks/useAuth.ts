import { useCallback, useEffect, useState } from "react";
import { AuthService } from "../services/authService";
import type { AuthState, LoginCredentials, RegisterData } from "../types";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Verificar se usuário está logado ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        if (token) {
          const user = await AuthService.getCurrentUser();
          if (user) {
            setAuthState({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return;
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await AuthService.login(credentials);

      // Salvar no localStorage
      localStorage.setItem("auth-token", response.token);
      localStorage.setItem("auth-user", JSON.stringify(response.user));

      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao fazer login";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await AuthService.register(data);

      // Salvar no localStorage
      localStorage.setItem("auth-token", response.token);
      localStorage.setItem("auth-user", JSON.stringify(response.user));

      setAuthState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao registrar";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
  };
}
