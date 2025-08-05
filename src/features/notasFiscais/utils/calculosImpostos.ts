import {
  Desconto,
  ImpostoCOFINS,
  ImpostoICMS,
  ImpostoIPI,
  ImpostoPIS,
} from "../types/tributacao";

/**
 * Classe responsável por todos os cálculos de impostos
 * Implementa as regras fiscais brasileiras
 */
export class CalculadoraImpostos {
  /**
   * Aplica desconto sobre um valor
   */
  static aplicarDesconto(valorBase: number, desconto: Desconto): number {
    let valorComDesconto = valorBase - desconto.valor;
    valorComDesconto = valorComDesconto * (1 - desconto.percentual / 100);
    return Math.max(0, Number(valorComDesconto.toFixed(2)));
  }

  /**
   * Calcula ICMS simples
   */
  static calcularICMS(baseCalculo: number, aliquota: number): number {
    const valor = (baseCalculo * aliquota) / 100;
    return Number(valor.toFixed(2));
  }

  /**
   * Calcula ICMS Substituição Tributária
   */
  static calcularICMSST(
    baseCalculo: number,
    mva: number,
    aliquotaST: number,
    aliquotaInterna: number
  ): { baseCalculoST: number; valorST: number } {
    const baseCalculoST = baseCalculo * (1 + mva / 100);
    const icmsInterno = this.calcularICMS(baseCalculo, aliquotaInterna);
    const icmsST = this.calcularICMS(baseCalculoST, aliquotaST);

    return {
      baseCalculoST: Number(baseCalculoST.toFixed(2)),
      valorST: Math.max(0, Number((icmsST - icmsInterno).toFixed(2))),
    };
  }

  /**
   * Calcula IPI
   */
  static calcularIPI(valorProdutos: number, aliquota: number): number {
    const valor = (valorProdutos * aliquota) / 100;
    return Number(valor.toFixed(2));
  }

  /**
   * Calcula PIS
   */
  static calcularPIS(baseCalculo: number, aliquota: number): number {
    const valor = (baseCalculo * aliquota) / 100;
    return Number(valor.toFixed(2));
  }

  /**
   * Calcula COFINS
   */
  static calcularCOFINS(baseCalculo: number, aliquota: number): number {
    const valor = (baseCalculo * aliquota) / 100;
    return Number(valor.toFixed(2));
  }

  /**
   * Recalcula todos os impostos de uma vez
   */
  static recalcularTodosImpostos(
    valorProdutos: number,
    desconto: Desconto,
    icms: ImpostoICMS,
    ipi: ImpostoIPI,
    pis: ImpostoPIS,
    cofins: ImpostoCOFINS
  ) {
    // 1. Aplicar desconto
    const valorComDesconto = this.aplicarDesconto(valorProdutos, desconto);

    // 2. Calcular ICMS
    const icmsAtualizado = { ...icms };
    if (icms.enabled) {
      icmsAtualizado.baseCalculo = valorComDesconto;
      icmsAtualizado.valor = this.calcularICMS(valorComDesconto, icms.aliquota);

      // ICMS ST se configurado
      if (icms.mvaSt && icms.aliquotaSt) {
        const icmsST = this.calcularICMSST(
          valorComDesconto,
          icms.mvaSt,
          icms.aliquotaSt,
          icms.aliquota
        );
        icmsAtualizado.baseCalculoSt = icmsST.baseCalculoST;
        icmsAtualizado.valorSt = icmsST.valorST;
      }
    }

    // 3. Calcular IPI
    const ipiAtualizado = { ...ipi };
    if (ipi.enabled) {
      ipiAtualizado.baseCalculo = valorProdutos; // IPI incide sobre valor dos produtos
      ipiAtualizado.valor = this.calcularIPI(valorProdutos, ipi.aliquota);
    }

    // 4. Base para PIS/COFINS (geralmente valor com IPI)
    const basePisCofins = valorProdutos + (ipiAtualizado.valor || 0);

    // 5. Calcular PIS
    const pisAtualizado = { ...pis };
    if (pis.enabled) {
      pisAtualizado.baseCalculo = basePisCofins;
      pisAtualizado.valor = this.calcularPIS(basePisCofins, pis.aliquota);
    }

    // 6. Calcular COFINS
    const cofinsAtualizado = { ...cofins };
    if (cofins.enabled) {
      cofinsAtualizado.baseCalculo = basePisCofins;
      cofinsAtualizado.valor = this.calcularCOFINS(
        basePisCofins,
        cofins.aliquota
      );
    }

    return {
      valorComDesconto,
      icms: icmsAtualizado,
      ipi: ipiAtualizado,
      pis: pisAtualizado,
      cofins: cofinsAtualizado,
    };
  }
}

/**
 * Classe para calcular totais da nota fiscal
 */
export class CalculadoraTotaisNF {
  private items: any[];

  constructor(items: any[]) {
    this.items = items;
  }

  calcular() {
    const totais = this.items.reduce(
      (acc, item) => {
        const tributacao = item.tributacao;

        return {
          valorProdutos: acc.valorProdutos + (item.valorTotal || 0),
          valorDesconto: acc.valorDesconto + (tributacao.desconto?.valor || 0),
          valorICMS: acc.valorICMS + (tributacao.icms?.valor || 0),
          valorICMSST: acc.valorICMSST + (tributacao.icms?.valorSt || 0),
          valorIPI: acc.valorIPI + (tributacao.ipi?.valor || 0),
          valorPIS: acc.valorPIS + (tributacao.pis?.valor || 0),
          valorCOFINS: acc.valorCOFINS + (tributacao.cofins?.valor || 0),
          valorFrete: acc.valorFrete + (tributacao.valorFrete || 0),
          valorSeguro: acc.valorSeguro + (tributacao.valorSeguro || 0),
          outrasDesp: acc.outrasDesp + (tributacao.outrasDesp || 0),
        };
      },
      {
        valorProdutos: 0,
        valorDesconto: 0,
        valorICMS: 0,
        valorICMSST: 0,
        valorIPI: 0,
        valorPIS: 0,
        valorCOFINS: 0,
        valorFrete: 0,
        valorSeguro: 0,
        outrasDesp: 0,
      }
    );

    // Valor total da nota
    totais.valorTotalNota =
      totais.valorProdutos +
      totais.valorIPI +
      totais.valorFrete +
      totais.valorSeguro +
      totais.outrasDesp -
      totais.valorDesconto;

    return totais;
  }
}
