const CFOPS_VALIDOS = {
  VENDA_INTERNA: ["5101", "5102", "5103", "5104", "5105"],
  DEVOLUCAO_INTERNA: ["5201", "5202", "5208"],
  TRANSFERENCIA_INTERNA: ["5151", "5152"],

  VENDA_INTERESTADUAL: ["6101", "6102", "6103", "6104", "6105"],
  DEVOLUCAO_INTERESTADUAL: ["6201", "6202", "6208"],
  TRANSFERENCIA_INTERESTADUAL: ["6151", "6152"],

  COMPRA_INTERNA: ["1101", "1102", "1111"],
  COMPRA_INTERESTADUAL: ["2101", "2102", "2111"],
};

const CST_ICMS_VALIDOS = [
  "00",
  "10",
  "20",
  "30",
  "40",
  "41",
  "50",
  "51",
  "60",
  "70",
  "90",
];

const CST_IPI_VALIDOS = ["00", "49", "50", "99"];

const CST_PIS_COFINS_VALIDOS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "99",
];

// CSOSNs válidos (Simples Nacional)
const CSOSN_VALIDOS = [
  "101",
  "102",
  "103",
  "201",
  "202",
  "203",
  "300",
  "400",
  "500",
  "900",
];

/**
 * Valida CFOP
 */
export const validarCFOP = (
  cfop: string
): { valido: boolean; erro?: string } => {
  if (!cfop || cfop.length !== 4) {
    return { valido: false, erro: "CFOP deve ter 4 dígitos" };
  }

  const todosCfops = Object.values(CFOPS_VALIDOS).flat();
  if (!todosCfops.includes(cfop)) {
    return { valido: false, erro: "CFOP inválido" };
  }

  return { valido: true };
};

/**
 * Valida NCM
 */
export const validarNCM = (ncm: string): { valido: boolean; erro?: string } => {
  if (!ncm) {
    return { valido: false, erro: "NCM é obrigatório" };
  }

  // Remove pontos e espaços
  const ncmLimpo = ncm.replace(/[.\s]/g, "");

  if (!/^\d{8}$/.test(ncmLimpo)) {
    return { valido: false, erro: "NCM deve ter 8 dígitos numéricos" };
  }

  return { valido: true };
};

/**
 * Valida CST/CSOSN
 */
export const validarCST = (
  cst: string,
  tipo: "ICMS" | "IPI" | "PIS" | "COFINS" | "CSOSN"
): { valido: boolean; erro?: string } => {
  if (!cst) {
    return { valido: false, erro: `${tipo} é obrigatório` };
  }

  let cstsValidos: string[] = [];

  switch (tipo) {
    case "ICMS":
      cstsValidos = CST_ICMS_VALIDOS;
      break;
    case "IPI":
      cstsValidos = CST_IPI_VALIDOS;
      break;
    case "PIS":
    case "COFINS":
      cstsValidos = CST_PIS_COFINS_VALIDOS;
      break;
    case "CSOSN":
      cstsValidos = CSOSN_VALIDOS;
      break;
  }

  if (!cstsValidos.includes(cst)) {
    return { valido: false, erro: `${tipo} ${cst} é inválido` };
  }

  return { valido: true };
};

/**
 * Valida CPF
 */
export const validarCPF = (cpf: string): { valido: boolean; erro?: string } => {
  const cpfLimpo = cpf.replace(/[^\d]/g, "");

  if (cpfLimpo.length !== 11) {
    return { valido: false, erro: "CPF deve ter 11 dígitos" };
  }

  // Verifica sequências inválidas
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return { valido: false, erro: "CPF inválido" };
  }

  // Algoritmo de validação do CPF
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let dv1 = resto < 2 ? 0 : resto;

  if (dv1 !== parseInt(cpfLimpo.charAt(9))) {
    return { valido: false, erro: "CPF inválido" };
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let dv2 = resto < 2 ? 0 : resto;

  if (dv2 !== parseInt(cpfLimpo.charAt(10))) {
    return { valido: false, erro: "CPF inválido" };
  }

  return { valido: true };
};

/**
 * Valida CNPJ
 */
export const validarCNPJ = (
  cnpj: string
): { valido: boolean; erro?: string } => {
  const cnpjLimpo = cnpj.replace(/[^\d]/g, "");

  if (cnpjLimpo.length !== 14) {
    return { valido: false, erro: "CNPJ deve ter 14 dígitos" };
  }

  // Verifica sequências inválidas
  if (/^(\d)\1{13}$/.test(cnpjLimpo)) {
    return { valido: false, erro: "CNPJ inválido" };
  }

  // Algoritmo de validação do CNPJ
  const calcularDigito = (cnpj: string, posicoes: number[]): number => {
    let soma = 0;
    for (let i = 0; i < posicoes.length; i++) {
      soma += parseInt(cnpj.charAt(i)) * posicoes[i];
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const dv1 = calcularDigito(cnpjLimpo, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const dv2 = calcularDigito(
    cnpjLimpo,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  if (
    dv1 !== parseInt(cnpjLimpo.charAt(12)) ||
    dv2 !== parseInt(cnpjLimpo.charAt(13))
  ) {
    return { valido: false, erro: "CNPJ inválido" };
  }

  return { valido: true };
};

/**
 * Valida valores monetários
 */
export const validarValorMonetario = (
  valor: number,
  campo: string,
  obrigatorio = false,
  minimo = 0
): { valido: boolean; erro?: string } => {
  if (obrigatorio && (valor === undefined || valor === null)) {
    return { valido: false, erro: `${campo} é obrigatório` };
  }

  if (valor < minimo) {
    return {
      valido: false,
      erro: `${campo} deve ser maior ou igual a ${minimo}`,
    };
  }

  if (valor > 999999999.99) {
    return { valido: false, erro: `${campo} muito alto` };
  }

  return { valido: true };
};

/**
 * Valida alíquotas (percentuais)
 */
export const validarAliquota = (
  aliquota: number,
  campo: string,
  maximo = 100
): { valido: boolean; erro?: string } => {
  if (aliquota < 0) {
    return { valido: false, erro: `${campo} não pode ser negativa` };
  }

  if (aliquota > maximo) {
    return {
      valido: false,
      erro: `${campo} não pode ser maior que ${maximo}%`,
    };
  }

  return { valido: true };
};

export const validarItemNotaFiscal = (
  item: any
): { valido: boolean; erros: string[] } => {
  const erros: string[] = [];

  if (!item.descricao?.trim()) {
    erros.push("Descrição do produto é obrigatória");
  }

  const validacaoQtd = validarValorMonetario(
    item.quantidade,
    "Quantidade",
    true,
    0.001
  );
  if (!validacaoQtd.valido) erros.push(validacaoQtd.erro!);

  const validacaoValor = validarValorMonetario(
    item.valorUnitario,
    "Valor unitário",
    true
  );
  if (!validacaoValor.valido) erros.push(validacaoValor.erro!);

  const validacaoCFOP = validarCFOP(item.tributacao?.informacoesFiscais?.cfop);
  if (!validacaoCFOP.valido) erros.push(validacaoCFOP.erro!);

  const validacaoNCM = validarNCM(item.tributacao?.informacoesFiscais?.ncm);
  if (!validacaoNCM.valido) erros.push(validacaoNCM.erro!);

  // Validar CSTs se impostos habilitados
  if (item.tributacao?.icms?.enabled) {
    const validacaoCST = validarCST(
      item.tributacao.informacoesFiscais.cstIcms,
      "ICMS"
    );
    if (!validacaoCST.valido) erros.push(validacaoCST.erro!);

    const validacaoAliq = validarAliquota(
      item.tributacao.icms.aliquota,
      "Alíquota ICMS"
    );
    if (!validacaoAliq.valido) erros.push(validacaoAliq.erro!);
  }

  return {
    valido: erros.length === 0,
    erros,
  };
};
