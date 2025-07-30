export { useAuthStore } from "./useAuthStore";
export { useDashboardStore } from "./useDashboardStore";
export { useEstoqueStore } from "./useEstoqueStore";
export { useNotasFiscaisStore } from "./useNotasFiscaisStore";

export type {
  AuthResponse,
  LoginCredentials,
  User,
} from "@/features/auth/types";
export type { MovimentacaoEstoque, Produto } from "@/features/estoque/types";
export type { Cliente, NotaFiscal } from "@/features/notasFiscais/types";
