import { type ElementCompact } from "xml-js";

// =============================================================================
// 1. DEFINIÇÃO DAS INTERFACES (MODELS)
// =============================================================================

interface IEndereco {
  logradouro: string;
  numero: string;
  bairro: string;
  codigoMunicipio: number;
  municipio: string;
  uf: string;
  cep: string;
  codigoPais: number;
  pais: string;
  fone: string;
}

interface IEmitente {
  cnpj: string;
  nome: string;
  endereco: IEndereco;
  inscricaoEstadual: string;
  crt: string;
}

interface IDestinatario {
  cpf: string;
  nome: string;
  endereco: IEndereco;
  indicadorIEDest: string;
}

interface IImposto {
  valorBaseCalculoICMS: number;
  valorICMS: number;
  valorBaseCalculoPIS: number;
  valorPIS: number;
  valorBaseCalculoCOFINS: number;
  valorCOFINS: number;
}

interface IProduto {
  item: number;
  codigo: string;
  ean: string;
  descricao: string;
  ncm: string;
  cfop: string;
  unidadeComercial: string;
  quantidadeComercial: number;
  valorUnitarioComercial: number;
  valorTotalBruto: number;
  impostos: IImposto;
}

interface ITotais {
  valorBaseCalculoICMS: number;
  valorICMS: number;
  valorTotalProdutos: number;
  valorFrete: number;
  valorSeguro: number;
  valorDesconto: number;
  valorPIS: number;
  valorCOFINS: number;
  valorTotalNota: number;
}

interface IPagamento {
  indicadorPagamento: string;
  meioPagamento: string;
  valorPagamento: number;
}

interface IInfNFe {
  versao: string;
  id: string;
  dataEmissao: Date;
  numeroNota: number;
  naturezaOperacao: string;
  identificadorDestino: string;
  finalidadeNFe: string;
  emitente: IEmitente;
  destinatario: IDestinatario;
  produtos: IProduto[];
  total: ITotais;
  pagamentos: IPagamento[];
  informacoesComplementares: string;
}

interface INFe {
  infNFe: IInfNFe;
}


export function mapNFe(nfeObj: ElementCompact): INFe {
  const infNFe = nfeObj.enviNFe.NFe.infNFe;

  // O parser pode retornar um único item como objeto e múltiplos como array.
  // Garantimos que 'det' (produtos) e 'detPag' (pagamentos) sejam sempre arrays.
  const detalhesProdutos = Array.isArray(infNFe.det)
    ? infNFe.det
    : [infNFe.det];
  const detalhesPagamentos = Array.isArray(infNFe.pag.detPag)
    ? infNFe.pag.detPag
    : [infNFe.pag.detPag];

  const mappedNFe: INFe = {
    infNFe: {
      versao: infNFe._attributes.versao,
      id: infNFe._attributes.Id,
      numeroNota: parseInt(infNFe.ide.nNF._text, 10),
      dataEmissao: new Date(infNFe.ide.dhEmi._text),
      naturezaOperacao: infNFe.ide.natOp._text,
      identificadorDestino: infNFe.ide.idDest._text,
      finalidadeNFe: infNFe.ide.finNFe._text,
      informacoesComplementares: infNFe.infAdic?.infCpl?._text || "",
      emitente: {
        cnpj: infNFe.emit.CNPJ._text,
        nome: infNFe.emit.xNome._text,
        inscricaoEstadual: infNFe.emit.IE._text,
        crt: infNFe.emit.CRT._text,
        endereco: {
          logradouro: infNFe.emit.enderEmit.xLgr._text,
          numero: infNFe.emit.enderEmit.nro._text,
          bairro: infNFe.emit.enderEmit.xBairro._text,
          codigoMunicipio: parseInt(infNFe.emit.enderEmit.cMun._text, 10),
          municipio: infNFe.emit.enderEmit.xMun._text,
          uf: infNFe.emit.enderEmit.UF._text,
          cep: infNFe.emit.enderEmit.CEP._text,
          codigoPais: parseInt(infNFe.emit.enderEmit.cPais._text, 10),
          pais: infNFe.emit.enderEmit.xPais._text,
          fone: infNFe.emit.enderEmit.fone._text,
        },
      },
      destinatario: {
        cpf: infNFe.dest.CPF._text,
        nome: infNFe.dest.xNome._text,
        indicadorIEDest: infNFe.dest.indIEDest._text,
        endereco: {
          logradouro: infNFe.dest.enderDest.xLgr._text,
          numero: infNFe.dest.enderDest.nro._text,
          bairro: infNFe.dest.enderDest.xBairro._text,
          codigoMunicipio: parseInt(infNFe.dest.enderDest.cMun._text, 10),
          municipio: infNFe.dest.enderDest.xMun._text,
          uf: infNFe.dest.enderDest.UF._text,
          cep: infNFe.dest.enderDest.CEP._text,
          codigoPais: parseInt(infNFe.dest.enderDest.cPais._text, 10),
          pais: infNFe.dest.enderDest.xPais._text,
          fone: infNFe.dest.enderDest.fone._text,
        },
      },
      produtos: detalhesProdutos.map((det: any) => ({
        item: parseInt(det._attributes.nItem, 10),
        codigo: det.prod.cProd._text,
        ean: det.prod.cEAN._text,
        descricao: det.prod.xProd._text,
        ncm: det.prod.NCM._text,
        cfop: det.prod.CFOP._text,
        unidadeComercial: det.prod.uCom._text,
        quantidadeComercial: parseFloat(det.prod.qCom._text),
        valorUnitarioComercial: parseFloat(det.prod.vUnCom._text),
        valorTotalBruto: parseFloat(det.prod.vProd._text),
        impostos: {
          valorBaseCalculoICMS: parseFloat(det.imposto.ICMS.ICMS00.vBC._text),
          valorICMS: parseFloat(det.imposto.ICMS.ICMS00.vICMS._text),
          valorBaseCalculoPIS: parseFloat(det.imposto.PIS.PISAliq.vBC._text),
          valorPIS: parseFloat(det.imposto.PIS.PISAliq.vPIS._text),
          valorBaseCalculoCOFINS: parseFloat(
            det.imposto.COFINS.COFINSAliq.vBC._text
          ),
          valorCOFINS: parseFloat(det.imposto.COFINS.COFINSAliq.vCOFINS._text),
        },
      })),
      total: {
        valorBaseCalculoICMS: parseFloat(infNFe.total.ICMSTot.vBC._text),
        valorICMS: parseFloat(infNFe.total.ICMSTot.vICMS._text),
        valorTotalProdutos: parseFloat(infNFe.total.ICMSTot.vProd._text),
        valorFrete: parseFloat(infNFe.total.ICMSTot.vFrete._text),
        valorSeguro: parseFloat(infNFe.total.ICMSTot.vSeg._text),
        valorDesconto: parseFloat(infNFe.total.ICMSTot.vDesc._text),
        valorPIS: parseFloat(infNFe.total.ICMSTot.vPIS._text),
        valorCOFINS: parseFloat(infNFe.total.ICMSTot.vCOFINS._text),
        valorTotalNota: parseFloat(infNFe.total.ICMSTot.vNF._text),
      },
      pagamentos: detalhesPagamentos.map((pag: any) => ({
        indicadorPagamento: pag.indPag._text,
        meioPagamento: pag.tPag._text,
        valorPagamento: parseFloat(pag.vPag._text),
      })),
    },
  };

  return mappedNFe;
}
