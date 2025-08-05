// Tipos base para cálculos
export interface BaseCalculoItem {
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface Desconto {
  valor: number;
  percentual: number;
}

// Impostos específicos
export interface ImpostoICMS {
  enabled: boolean;
  aliquota: number;
  baseCalculo: number;
  valor: number;

  // Substituição Tributária
  mvaSt?: number;
  baseCalculoSt?: number;
  aliquotaSt?: number;
  valorSt?: number;

  // Desoneração
  desonerado?: boolean;
  valorDesonerado?: number;
  motivo?: string;
}

export interface ImpostoIPI {
  enabled: boolean;
  aliquota: number;
  baseCalculo: number;
  valor: number;
  cst: string;
}

export interface ImpostoPIS {
  enabled: boolean;
  aliquota: number;
  baseCalculo: number;
  valor: number;
  cst: string;
}

export interface ImpostoCOFINS {
  enabled: boolean;
  aliquota: number;
  baseCalculo: number;
  valor: number;
  cst: string;
}

// Informações fiscais obrigatórias
export interface InformacoesFiscais {
  cfop: string;
  ncm: string;
  cest?: string;
  origem: string; // 0-8
  cstIcms: string;
  unidadeComercial: string;
  unidadeTributavel?: string;
}

// Interface principal da tributação
export interface TributacaoCompleta {
  base: BaseCalculoItem;
  desconto: Desconto;
  icms: ImpostoICMS;
  ipi: ImpostoIPI;
  pis: ImpostoPIS;
  cofins: ImpostoCOFINS;
  informacoesFiscais: InformacoesFiscais;

  // Outros valores
  valorSeguro: number;
  valorFrete: number;
  outrasDesp: number;

  // Total final do item
  valorTotalItem: number;
}

// Item da nota fiscal
export interface ItemNotaFiscal {
  id: string;
  produtoId?: string;
  descricao: string;
  tributacao: TributacaoCompleta;

  // Validação
  valido: boolean;
  erros: string[];
}

// Configurações de exibição
export interface ConfiguracoesTributacao {
  mostrarICMS: boolean;
  mostrarIPI: boolean;
  mostrarPIS: boolean;
  mostrarCOFINS: boolean;
  mostrarNCM: boolean;
  mostrarCFOP: boolean;
  mostrarCST: boolean;

  // Campos opcionais
  mostrarICMSST: boolean;
  mostrarDesoneracaoICMS: boolean;
  mostrarSeguro: boolean;
  mostrarFrete: boolean;
}

// Legacy interfaces for existing EmitirNotaFiscalPage compatibility
export interface TributacaoItem {
  // Básicos da NF-e
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  desconto: number;
  descontoPerc: number;
  ipi: number;
  ipiPerc: number;
  outrasDesp: number;
  cfop: string;
  cstCsosn: string;
  cstPisCofins: string;
  cstIpi: string;
  bcIcms: number;

  // ICMS
  icms: {
    enabled: boolean;
    aliquota: number;
    valor: number;
    valorIcms: number;
    valorIcmsDesonerado: number;
    mvaSt: number;
    bcIcmsSt: number;
    icmsSt: number;
    icmsStPerc: number;
    valorIcmsSt: number;
    bcFcpSt: number;
    valorFcpSt: number;
  };

  // Outros valores
  valorProdutos: number;
  desconto2: number;
  valorSeguro: number;
  valorRepasse: number;
  impostoImportacao: number;
  outDespesas: number;

  // ICMS Desonerado
  icmsDesonerado: string;
  valorIcmsDesonerado2: number;

  // Total da Nota
  totalNota: number;

  // Campos fiscais
  ncm: string;
}

export interface ItemNota {
  id: string;
  produtoId: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  tributacao: TributacaoItem;
}
