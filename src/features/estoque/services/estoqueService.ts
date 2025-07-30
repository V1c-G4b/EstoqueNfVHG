import { BaseApiService, type PaginatedResponse } from "@/shared/services";
import type { MovimentacaoEstoque, Produto } from "../types";

export interface ProdutoFilters {
  categoria?: string;
  fornecedor?: string;
  ativo?: boolean;
  baixoEstoque?: boolean;
  search?: string;
}

export interface MovimentacaoFilters {
  produtoId?: string;
  tipo?: "entrada" | "saida" | "ajuste";
  dataInicio?: string;
  dataFim?: string;
}

class EstoqueServiceClass extends BaseApiService {
  constructor() {
    super("/api/estoque");
  }

  // Produtos
  async getProdutos(
    page = 1,
    limit = 10,
    filters?: ProdutoFilters
  ): Promise<PaginatedResponse<Produto>> {
    const params = new URLSearchParams(
      Object.entries({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      })
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, typeof v === "boolean" ? String(v) : v as string])
    );

    const response = await this.request<PaginatedResponse<Produto>>(
      `/produtos?${params}`
    );
    return response.data;
  }

  async getProdutoById(id: string): Promise<Produto> {
    const response = await this.request<Produto>(`/produtos/${id}`);
    return response.data;
  }

  async createProduto(
    produto: Omit<Produto, "id" | "createdAt" | "updatedAt">
  ): Promise<Produto> {
    const response = await this.request<Produto>("/produtos", {
      method: "POST",
      body: JSON.stringify(produto),
    });
    return response.data;
  }

  async updateProduto(id: string, produto: Partial<Produto>): Promise<Produto> {
    const response = await this.request<Produto>(`/produtos/${id}`, {
      method: "PUT",
      body: JSON.stringify(produto),
    });
    return response.data;
  }

  async deleteProduto(id: string): Promise<void> {
    await this.request<void>(`/produtos/${id}`, {
      method: "DELETE",
    });
  }

  // Movimentações
  async getMovimentacoes(
    page = 1,
    limit = 10,
    filters?: MovimentacaoFilters
  ): Promise<PaginatedResponse<MovimentacaoEstoque>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });

    const response = await this.request<PaginatedResponse<MovimentacaoEstoque>>(
      `/movimentacoes?${params}`
    );
    return response.data;
  }

  async createMovimentacao(
    movimentacao: Omit<
      MovimentacaoEstoque,
      "id" | "createdAt" | "produto" | "quantidadeAnterior"
    >
  ): Promise<MovimentacaoEstoque> {
    const response = await this.request<MovimentacaoEstoque>("/movimentacoes", {
      method: "POST",
      body: JSON.stringify(movimentacao),
    });
    return response.data;
  }

  // Relatórios
  async getRelatorioEstoque(): Promise<{
    totalProdutos: number;
    valorTotal: number;
    produtosBaixoEstoque: number;
    movimentacoesMes: number;
  }> {
    const response = await this.request<any>("/relatorios/estoque");
    return response.data;
  }
}

export const EstoqueService = new EstoqueServiceClass();
