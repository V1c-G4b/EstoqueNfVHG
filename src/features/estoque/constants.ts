export const ESTOQUE_ROUTES = {
  PRODUTOS: "/estoque/produtos",
  PRODUTO_NOVO: "/estoque/produtos/novo",
  PRODUTO_EDITAR: "/estoque/produtos/:id/editar",
  MOVIMENTACOES: "/estoque/movimentacoes",
  CATEGORIAS: "/estoque/categorias",
  FORNECEDORES: "/estoque/fornecedores",
} as const;

export const TIPOS_MOVIMENTACAO = {
  ENTRADA: "entrada",
  SAIDA: "saida",
  AJUSTE: "ajuste",
} as const;

export const STATUS_ESTOQUE = {
  CRITICO: "critico",
  BAIXO: "baixo",
  NORMAL: "normal",
  ALTO: "alto",
} as const;
