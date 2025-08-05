import { useMemo } from "react";
import { useProdutos } from "./useEstoque";

export interface EstoqueMetrics {
  totalProdutos: number;
  totalAtivos: number;
  totalInativos: number;
  totalBaixoEstoque: number;
  percentualBaixoEstoque: number;
  produtosSemEstoque: number;
}

export function useEstoqueMetrics(): EstoqueMetrics {
  const { produtos, produtosAtivos, produtosBaixoEstoque, totalProdutos } =
    useProdutos();

  return useMemo(() => {
    const totalCount =
      typeof totalProdutos === "number" ? totalProdutos : produtos.length;
    const totalAtivos = produtosAtivos?.length ?? 0;
    const totalBaixoEstoque = produtosBaixoEstoque?.length ?? 0;

    const totalInativos = produtos.filter((produto) => !produto.ativo).length;
    const produtosSemEstoque = produtos.filter(
      (produto) => produto.quantidade === 0
    ).length;

    const percentualBaixoEstoque =
      totalCount > 0 ? Math.round((totalBaixoEstoque / totalCount) * 100) : 0;

    return {
      totalProdutos: totalCount,
      totalAtivos,
      totalInativos,
      totalBaixoEstoque,
      percentualBaixoEstoque,
      produtosSemEstoque,
    };
  }, [produtos, produtosAtivos, produtosBaixoEstoque, totalProdutos]);
}
