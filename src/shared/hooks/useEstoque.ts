import type { Produto } from "@/features/estoque/types";
import { useCallback } from "react";
import { useEstoqueStore } from "../stores";

export const useProdutos = () => {
  const {
    produtos,
    loading,
    error,
    setProdutos,
    addProduto,
    updateProduto,
    removeProduto,
    buscarProdutos,
    filtrarPorCategoria,
    produtosAtivos,
    produtosBaixoEstoque,
    totalProdutos,
  } = useEstoqueStore();

  const carregarProdutos = useCallback(async () => {
    useEstoqueStore.getState().setLoading(true);
    try {
      // Simular carregamento de produtos
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const produtosMock: Produto[] = [
        {
          id: "1",
          nome: "Smartphone Samsung Galaxy S24",
          codigoBarras: "SMSG-S24-128",
          quantidade: 45,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          nome: "Notebook Dell Inspiron 15",
          codigoBarras: "DELL-INS15-8GB",
          quantidade: 25,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          nome: "Mouse Gamer Logitech G502",
          codigoBarras: "LOG-G502-RGB",
          quantidade: 120,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "4",
          nome: "Teclado Mecânico Corsair K70",
          codigoBarras: "COR-K70-MEC",
          quantidade: 8,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "5",
          nome: "Monitor LG UltraWide 29",
          codigoBarras: "LG-UW29-IPS",
          quantidade: 3,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "6",
          nome: "SSD Kingston NV2 1TB",
          codigoBarras: "KING-NV2-1TB",
          quantidade: 0,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "7",
          nome: "Headset HyperX Cloud II",
          codigoBarras: "HYP-CL2-BLK",
          quantidade: 35,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "8",
          nome: "Webcam Logitech C920",
          codigoBarras: "LOG-C920-HD",
          quantidade: 18,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "9",
          nome: "Cabo HDMI 4K Premium 2m",
          codigoBarras: "HDMI-4K-2M",
          quantidade: 150,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "10",
          nome: "Fonte Corsair 750W 80+ Gold",
          codigoBarras: "COR-750W-GOLD",
          quantidade: 12,
          imagemUrl: undefined,
          ativo: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      setProdutos(produtosMock);
    } catch (error) {
      useEstoqueStore.getState().setError("Erro ao carregar produtos");
    } finally {
      useEstoqueStore.getState().setLoading(false);
    }
  }, [setProdutos]);

  return {
    produtos,
    loading,
    error,

    produtosAtivos: produtosAtivos(),
    produtosBaixoEstoque: produtosBaixoEstoque(),
    totalProdutos: totalProdutos(),

    carregarProdutos,
    adicionarProduto: addProduto,
    atualizarProduto: updateProduto,
    removerProduto: removeProduto,
    buscarProdutos,
    filtrarPorCategoria,
  };
};

export const useMovimentacoes = () => {
  const { movimentacoes, loading, error, setMovimentacoes, addMovimentacao } =
    useEstoqueStore();

  const carregarMovimentacoes = useCallback(async () => {
    useEstoqueStore.getState().setLoading(true);
    try {
      // Simular carregamento de movimentações
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMovimentacoes([]);
    } catch (error) {
      useEstoqueStore.getState().setError("Erro ao carregar movimentações");
    } finally {
      useEstoqueStore.getState().setLoading(false);
    }
  }, [setMovimentacoes]);

  return {
    // Estado
    movimentacoes,
    loading,
    error,

    // Ações
    carregarMovimentacoes,
    adicionarMovimentacao: addMovimentacao,
  };
};
