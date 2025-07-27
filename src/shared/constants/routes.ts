export const configuracoesRoutes = {
  home: "/configuracoes",
  geral: "/configuracoes/geral",
  empresa: "/configuracoes/empresa",
  impostos: "/configuracoes/impostos",
  backup: "/configuracoes/backup",
  usuarios: "/configuracoes/usuarios",
  sistema: "/configuracoes/sistema",
} as const;

export type ConfiguracoesRoute =
  (typeof configuracoesRoutes)[keyof typeof configuracoesRoutes];
