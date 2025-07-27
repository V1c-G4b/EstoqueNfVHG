import type { LoginFormData, RegisterFormData } from "../schema";
import type { AuthResponse, User } from "../types";

// Simulação de API - substituir por chamadas reais
export class AuthService {
  static async login(data: LoginFormData): Promise<AuthResponse> {
    // Simulação de delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulação de resposta da API
    if (data.email === "admin@vhg.com" && data.password === "123456") {
      return {
        success: true,
        user: {
          id: "1",
          name: "Administrador",
          email: data.email,
          role: "admin",
        },
        token: "fake-jwt-token",
      };
    }

    throw new Error("Credenciais inválidas");
  }

  static async register(data: RegisterFormData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      user: {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: "user",
      },
      token: "fake-jwt-token",
    };
  }

  static async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
  }

  static async refreshToken(): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const token = localStorage.getItem("auth-token");
    const user = localStorage.getItem("auth-user");

    if (!token || !user) {
      throw new Error("Token inválido");
    }

    return {
      success: true,
      user: JSON.parse(user),
      token: "new-fake-jwt-token",
    };
  }

  static async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem("auth-user");
    return userStr ? JSON.parse(userStr) : null;
  }
}
