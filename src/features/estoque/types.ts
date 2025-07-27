// Tipagens para produtos
export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  sku: string;
  preco: number;
  custo: number;
  quantidade: number;
  categoria: string;
  fornecedor?: string;
  codigoBarras?: string;
  unidadeMedida: string;
  estoqueMinimo: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MovimentacaoEstoque {
  id: string;
  produtoId: string;
  produto: Produto;
  tipo: "entrada" | "saida" | "ajuste";
  quantidade: number;
  quantidadeAnterior: number;
  motivo: string;
  observacoes?: string;
  usuarioId: string;
  createdAt: string;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}
