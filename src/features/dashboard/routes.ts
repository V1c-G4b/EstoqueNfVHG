export const dashboardRoutes = {
  home: "/dashboard",
  relatorios: "/dashboard/relatorios",
  analises: "/dashboard/analises",
  vendas: "/dashboard/vendas",
  estoque: "/dashboard/estoque",
} as const;

export type DashboardRoute =
  (typeof dashboardRoutes)[keyof typeof dashboardRoutes];
