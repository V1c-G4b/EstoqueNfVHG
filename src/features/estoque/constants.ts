// Constantes do módulo de estoque
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

export const UNIDADES_MEDIDA = [
  "UN", // Unidade
  "PC", // Peça
  "KG", // Quilograma
  "G", // Grama
  "L", // Litro
  "ML", // Mililitro
  "M", // Metro
  "CM", // Centímetro
  "CX", // Caixa
  "PCT", // Pacote
] as const;

export const STATUS_ESTOQUE = {
  CRITICO: "critico",
  BAIXO: "baixo",
  NORMAL: "normal",
  ALTO: "alto",
} as const;
