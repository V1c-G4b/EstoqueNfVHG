export const estoqueRoutes = {
  list: "/estoque",
  create: "/estoque/novo",
  edit: "/estoque/:id/editar",
  view: "/estoque/:id",
  movimentacoes: "/estoque/movimentacoes",
  relatorios: "/estoque/relatorios",
} as const;

export type EstoqueRoute = (typeof estoqueRoutes)[keyof typeof estoqueRoutes];
