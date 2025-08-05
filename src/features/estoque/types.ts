export interface Produto {
  id: string;
  nome: string;
  codigoBarras: string; 
  quantidade: number;
  imagemUrl?: string; 
  ativo: boolean;
  createdAt: string; 
  updatedAt: string; 
}

export interface MovimentacaoEstoque {
  id: string;
  produtoId: string;
  produto: Produto;
  tipo: "entrada" | "saida" | "ajuste" | "transferencia";
  quantidade: number;
  quantidadeAnterior: number;
  motivo: string;
  observacoes?: string;
  usuarioId: string;
  unidadeOrigemId?: string;
  unidadeDestinoId?: string;
  createdAt: string;
}

export interface UnidadeEstoque {
  id: string;
  nome: string;
  descricao?: string;
  endereco?: string;
  responsavel?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TransferenciaEstoque {
  id: string;
  produtoId: string;
  produto: Produto;
  unidadeOrigemId: string;
  unidadeOrigem: UnidadeEstoque;
  unidadeDestinoId: string;
  unidadeDestino: UnidadeEstoque;
  quantidade: number;
  motivo: string;
  observacoes?: string;
  status: "pendente" | "aprovada" | "rejeitada" | "concluida";
  usuarioSolicitanteId: string;
  usuarioAprovadorId?: string;
  dataAprovacao?: string;
  createdAt: string;
  updatedAt: string;
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
