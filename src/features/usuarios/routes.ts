export const usuariosRoutes = {
  list: "/usuarios",
  gerenciar: "/usuarios/gerenciar",
  permissoes: "/usuarios/permissoes",
  auditoria: "/usuarios/auditoria",
  create: "/usuarios/novo",
  edit: "/usuarios/:id/editar",
  view: "/usuarios/:id",
} as const;

export type UsuariosRoute =
  (typeof usuariosRoutes)[keyof typeof usuariosRoutes];
