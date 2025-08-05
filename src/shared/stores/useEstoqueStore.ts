import type { MovimentacaoEstoque, Produto } from "@/features/estoque/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EstoqueState {
  produtos: Produto[];
  movimentacoes: MovimentacaoEstoque[];
  loading: boolean;
  error: string | null;

  filters: {
    categoria?: string;
    fornecedor?: string;
    ativo?: boolean;
    search?: string;
  };

  produtosAtivos: () => Produto[];
  produtosBaixoEstoque: () => Produto[];
  totalProdutos: () => number;

  setProdutos: (produtos: Produto[]) => void;
  addProduto: (produto: Produto) => void;
  updateProduto: (id: string, dados: Partial<Produto>) => void;
  removeProduto: (id: string) => void;

  setMovimentacoes: (movimentacoes: MovimentacaoEstoque[]) => void;
  addMovimentacao: (movimentacao: MovimentacaoEstoque) => void;

  setFilters: (filters: Partial<EstoqueState["filters"]>) => void;
  clearFilters: () => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  buscarProdutos: (query: string) => Produto[];
  filtrarPorCategoria: (categoria: string) => Produto[];

  reset: () => void;
}

const initialState = {
  produtos: [],
  movimentacoes: [],
  loading: false,
  error: null,
};

export const useEstoqueStore = create<EstoqueState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      produtosAtivos: () => get().produtos.filter((produto) => produto.ativo),

      produtosBaixoEstoque: () =>
        get().produtos.filter(
          (produto) => produto.ativo && produto.quantidade <= 10 
        ),

      totalProdutos: () => get().produtos.length,

      setProdutos: (produtos) => set({ produtos }, false, "setProdutos"),

      addProduto: (produto) =>
        set(
          (state) => ({ produtos: [...state.produtos, produto] }),
          false,
          "addProduto"
        ),

      updateProduto: (id, dados) =>
        set(
          (state) => ({
            produtos: state.produtos.map((produto) =>
              produto.id === id ? { ...produto, ...dados } : produto
            ),
          }),
          false,
          "updateProduto"
        ),

      removeProduto: (id) =>
        set(
          (state) => ({
            produtos: state.produtos.filter((produto) => produto.id !== id),
          }),
          false,
          "removeProduto"
        ),

      setMovimentacoes: (movimentacoes) =>
        set({ movimentacoes }, false, "setMovimentacoes"),

      addMovimentacao: (movimentacao) =>
        set(
          (state) => ({
            movimentacoes: [movimentacao, ...state.movimentacoes],
          }),
          false,
          "addMovimentacao"
        ),

      setLoading: (loading) => set({ loading }, false, "setLoading"),
      setError: (error) => set({ error }, false, "setError"),

      buscarProdutos: (query) => {
        const { produtos } = get();
        const queryLower = query.toLowerCase();
        console.log("Produtos disponíveis:", produtos);
        return produtos.filter(
          (produto) =>
            produto.nome.toLowerCase().includes(queryLower) ||
            produto.codigoBarras.toLowerCase().includes(queryLower)
        );
      },

      filtrarPorCategoria: (_categoria) => {
        const { produtos } = get();
        return produtos;
      },

      reset: () => set(initialState, false, "reset"),
    }),
    {
      name: "estoque-store",
    }
  )
);
