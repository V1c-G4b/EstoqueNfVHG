// Tipagens para notas fiscais
export interface NotaFiscal {
  id: string;
  numero: string;
  serie: string;
  chaveAcesso: string;
  clienteId: string;
  cliente: Cliente;
  items: ItemNotaFiscal[];
  valorTotal: number;
  valorDesconto: number;
  valorFrete: number;
  valorLiquido: number;
  status: "autorizada" | "cancelada" | "inutilizada" | "rejeitada";
  dataEmissao: string;
  observacoes?: string;
  protocoloAutorizacao?: string;
  motivoCancelamento?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemNotaFiscal {
  id: string;
  notaFiscalId: string;
  produtoId: string;
  produto: {
    id: string;
    nome: string;
    sku: string;
    unidadeMedida: string;
  };
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  desconto: number;
  sequencia: number;
}

export interface Cliente {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  documento: string; // CPF ou CNPJ
  tipoDocumento: "cpf" | "cnpj";
  endereco: Endereco;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}
