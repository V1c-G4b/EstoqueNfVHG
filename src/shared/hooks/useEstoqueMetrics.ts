import { useMemo } from "react";
import { useProdutos } from "./useEstoque";

export interface EstoqueMetrics {
  totalProdutos: number;
  totalAtivos: number;
  totalInativos: number;
  totalBaixoEstoque: number;
  percentualBaixoEstoque: number;
  valorTotalEstoque: number;
  produtosSemEstoque: number;
  categorias: string[];
  fornecedores: string[];
}

/**
 * Hook para calcular métricas do estoque
 * Centraliza toda a lógica de cálculo e garante consistência
 */
export function useEstoqueMetrics(): EstoqueMetrics {
  const {
    produtos,
    produtosAtivos,
    produtosBaixoEstoque,
    totalProdutos,
    valorTotalEstoque,
  } = useProdutos();

  return useMemo(() => {
    const totalCount =
      typeof totalProdutos === "number" ? totalProdutos : produtos.length;
    const totalAtivos = produtosAtivos?.length ?? 0;
    const totalBaixoEstoque = produtosBaixoEstoque?.length ?? 0;
    const valorTotal =
      typeof valorTotalEstoque === "number" ? valorTotalEstoque : 0;

    const totalInativos = produtos.filter((produto) => !produto.ativo).length;
    const produtosSemEstoque = produtos.filter(
      (produto) => produto.quantidade === 0
    ).length;

    const percentualBaixoEstoque =
      totalCount > 0 ? Math.round((totalBaixoEstoque / totalCount) * 100) : 0;

    const categorias = [...new Set(produtos.map((p) => p.categoria))].filter(
      Boolean
    );
    const fornecedores = [
      ...new Set(produtos.map((p) => p.fornecedor).filter((f): f is string => typeof f === "string" && !!f)),
    ];

    return {
      totalProdutos: totalCount,
      totalAtivos,
      totalInativos,
      totalBaixoEstoque,
      percentualBaixoEstoque,
      valorTotalEstoque: valorTotal,
      produtosSemEstoque,
      categorias,
      fornecedores,
    };
  }, [
    produtos,
    produtosAtivos,
    produtosBaixoEstoque,
    totalProdutos,
    valorTotalEstoque,
  ]);
}
