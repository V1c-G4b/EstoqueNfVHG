export const APP_CONFIG = {
  NAME: "VHG Estoque NF",
  VERSION: "1.0.0",
  DESCRIPTION: "Sistema de Gestão de Estoque e Notas Fiscais",
} as const;

export { authRoutes, type AuthRoute } from "@/features/auth/routes";
export {
  dashboardRoutes,
  type DashboardRoute,
} from "@/features/dashboard/routes";
export { estoqueRoutes, type EstoqueRoute } from "@/features/estoque/routes";
export {
  notasFiscaisRoutes,
  type NotasFiscaisRoute,
} from "@/features/notasFiscais/routes";
export { usuariosRoutes, type UsuariosRoute } from "@/features/usuarios/routes";
export { configuracoesRoutes, type ConfiguracoesRoute } from "./routes";

export const appRoutes = {
  root: "/",
  suporte: "/suporte",
  feedback: "/feedback",
  relatorios: "/relatorios",
  analiseVendas: "/analise-vendas",
  qualidade: "/qualidade",
} as const;

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes];
