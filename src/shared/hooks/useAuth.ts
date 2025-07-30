import type { LoginCredentials, User } from "@/features/auth/types";
import { useCallback } from "react";
import { useAuthStore } from "../stores";

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
    updateUser,
    hasRole,
    isAdmin,
    isManager,
    setError,
  } = useAuthStore();

  const fazerLogin = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await login(credentials);
        return response;
      } catch (error) {
        throw error;
      }
    },
    [login]
  );

  const fazerLogout = useCallback(() => {
    logout();
  }, [logout]);

  const atualizarToken = useCallback(async () => {
    try {
      await refreshToken();
    } catch (error) {
      logout();
    }
  }, [refreshToken, logout]);

  const atualizarPerfil = useCallback(
    (dadosUsuario: Partial<User>) => {
      updateUser(dadosUsuario);
    },
    [updateUser]
  );

  const limparErro = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    usuario: user,
    token,
    isAuthenticated,
    isLoading,
    error,

    temPermissao: hasRole,
    isAdmin: isAdmin(),
    isManager: isManager(),

    fazerLogin,
    fazerLogout,
    atualizarToken,
    atualizarPerfil,
    limparErro,
  };
};
