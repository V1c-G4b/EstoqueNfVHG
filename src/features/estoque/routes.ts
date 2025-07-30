export const estoqueRoutes = {
  list: "/estoque",
  create: "/estoque/produtos/novo",
  edit: "/estoque/produtos/editar/:id",
  view: "/estoque/produtos/:id",
  transferencias: "/estoque/transferencias",
  transferenciasNova: "/estoque/transferencias/nova",
  transferenciasView: "/estoque/transferencias/:id",
  unidades: "/estoque/unidades",
  unidadesNova: "/estoque/unidades/nova",
  unidadesEdit: "/estoque/unidades/editar/:id",
} as const;

export type EstoqueRoute = (typeof estoqueRoutes)[keyof typeof estoqueRoutes];
