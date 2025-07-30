import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { useEstoqueStore } from "./useEstoqueStore";
import { useNotasFiscaisStore } from "./useNotasFiscaisStore";

// Tipos para os dados do dashboard
interface MovimentacaoMensal {
  mes: string;
  entradas: number;
  saidas: number;
  faturamento: number;
}

interface AtividadeRecente {
  id: string;
  tipo: "produto" | "nota" | "usuario" | "movimentacao";
  titulo: string;
  descricao: string;
  data: string;
  icone?: string;
}

interface EstatisticasPeriodo {
  periodo: string;
  totalProdutos: number;
  totalNotasFiscais: number;
  totalMovimentacoes: number;
  faturamentoTotal: number;
  produtosMaisVendidos: Array<{
    id: string;
    nome: string;
    quantidade: number;
    valor: number;
  }>;
}

interface AlertaEstoque {
  id: string;
  produtoId: string;
  produtoNome: string;
  quantidadeAtual: number;
  estoqueMinimo: number;
  severidade: "baixo" | "critico" | "zerado";
}

interface DashboardState {
  // Estados principais
  loading: boolean;
  error: string | null;
  ultimaAtualizacao: string | null;

  // Dados agregados
  movimentacoesMensais: MovimentacaoMensal[];
  atividadesRecentes: AtividadeRecente[];
  estatisticasPeriodo: EstatisticasPeriodo | null;
  alertasEstoque: AlertaEstoque[];

  // Resumo geral - dados calculados em tempo real
  resumoGeral: () => {
    totalProdutos: number;
    totalProdutosAtivos: number;
    totalNotasFiscais: number;
    notasAutorizadas: number;
    valorTotalEstoque: number;
    faturamentoMensal: number;
    produtosBaixoEstoque: number;
    usuariosAtivos: number;
  };

  // Métricas de performance
  metricas: () => {
    crescimentoProdutos: number;
    crescimentoFaturamento: number;
    eficienciaEstoque: number;
    ticketMedio: number;
  };

  // Ações
  carregarDadosDashboard: () => Promise<void>;
  atualizarMovimentacoesMensais: () => void;
  adicionarAtividadeRecente: (
    atividade: Omit<AtividadeRecente, "id" | "data">
  ) => void;
  gerarEstatisticasPeriodo: (
    dataInicio: string,
    dataFim: string
  ) => Promise<void>;
  atualizarAlertasEstoque: () => void;

  // Filtros e configurações
  filtrosPeriodo: {
    periodo: "7d" | "30d" | "90d" | "1y";
    dataInicio?: string;
    dataFim?: string;
  };
  setFiltrosPeriodo: (filtros: DashboardState["filtrosPeriodo"]) => void;

  // Ações de estado
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  loading: false,
  error: null,
  ultimaAtualizacao: null,
  movimentacoesMensais: [],
  atividadesRecentes: [],
  estatisticasPeriodo: null,
  alertasEstoque: [],
  filtrosPeriodo: {
    periodo: "30d" as const,
  },
};

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      resumoGeral: () => {
        const estoqueState = useEstoqueStore.getState();
        const notasState = useNotasFiscaisStore.getState();
        const authState = useAuthStore.getState();

        return {
          totalProdutos: estoqueState.produtos.length,
          totalProdutosAtivos: estoqueState.produtosAtivos().length,
          totalNotasFiscais: notasState.notasFiscais.length,
          notasAutorizadas: notasState.notasAutorizadas().length,
          valorTotalEstoque: estoqueState.valorTotalEstoque(),
          faturamentoMensal: notasState.valorTotalFaturado(),
          produtosBaixoEstoque: estoqueState.produtosBaixoEstoque().length,
          usuariosAtivos: authState.user ? 1 : 0, 
        };
      },

      metricas: () => {
        const { movimentacoesMensais } = get();
        const estoqueState = useEstoqueStore.getState();
        const notasState = useNotasFiscaisStore.getState();

        const ultimoMes = movimentacoesMensais[movimentacoesMensais.length - 1];
        const penultimoMes =
          movimentacoesMensais[movimentacoesMensais.length - 2];

        const crescimentoProdutos =
          penultimoMes && ultimoMes
            ? ((ultimoMes.entradas - penultimoMes.entradas) /
                penultimoMes.entradas) *
              100
            : 0;

        const crescimentoFaturamento =
          penultimoMes && ultimoMes
            ? ((ultimoMes.faturamento - penultimoMes.faturamento) /
                penultimoMes.faturamento) *
              100
            : 0;

        const totalProdutos = estoqueState.produtos.length;
        const produtosAtivos = estoqueState.produtosAtivos().length;
        const eficienciaEstoque =
          totalProdutos > 0 ? (produtosAtivos / totalProdutos) * 100 : 0;

        const notasAutorizadas = notasState.notasAutorizadas();
        const faturamentoTotal = notasState.valorTotalFaturado();
        const ticketMedio =
          notasAutorizadas.length > 0
            ? faturamentoTotal / notasAutorizadas.length
            : 0;

        return {
          crescimentoProdutos,
          crescimentoFaturamento,
          eficienciaEstoque,
          ticketMedio,
        };
      },

      carregarDadosDashboard: async () => {
        set(
          { loading: true, error: null },
          false,
          "carregarDadosDashboard:start"
        );

        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mesesMock: MovimentacaoMensal[] = [
            { mes: "Janeiro", entradas: 186, saidas: 80, faturamento: 25000 },
            {
              mes: "Fevereiro",
              entradas: 305,
              saidas: 200,
              faturamento: 38000,
            },
            { mes: "Março", entradas: 237, saidas: 120, faturamento: 31000 },
            { mes: "Abril", entradas: 173, saidas: 190, faturamento: 27000 },
            { mes: "Maio", entradas: 209, saidas: 130, faturamento: 33000 },
            { mes: "Junho", entradas: 214, saidas: 140, faturamento: 35000 },
          ];

          const atividadesMock: AtividadeRecente[] = [
            {
              id: "1",
              tipo: "produto",
              titulo: "Novo produto cadastrado",
              descricao: "Smartphone Samsung Galaxy S24 adicionado ao estoque",
              data: new Date().toISOString(),
            },
            {
              id: "2",
              tipo: "nota",
              titulo: "Nota fiscal emitida",
              descricao: "NF-e 000123 autorizada pela SEFAZ",
              data: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              id: "3",
              tipo: "movimentacao",
              titulo: "Movimentação de estoque",
              descricao: "Entrada de 50 unidades - Notebook Dell",
              data: new Date(Date.now() - 7200000).toISOString(),
            },
          ];

          set(
            {
              movimentacoesMensais: mesesMock,
              atividadesRecentes: atividadesMock,
              ultimaAtualizacao: new Date().toISOString(),
              loading: false,
            },
            false,
            "carregarDadosDashboard:success"
          );

          get().atualizarAlertasEstoque();
        } catch (error) {
          set(
            {
              error: "Erro ao carregar dados do dashboard",
              loading: false,
            },
            false,
            "carregarDadosDashboard:error"
          );
        }
      },

      atualizarMovimentacoesMensais: () => {

        const { movimentacoesMensais } = get();

        set(
          {
            movimentacoesMensais,
            ultimaAtualizacao: new Date().toISOString(),
          },
          false,
          "atualizarMovimentacoesMensais"
        );
      },

      adicionarAtividadeRecente: (atividade) => {
        const novaAtividade: AtividadeRecente = {
          ...atividade,
          id: Math.random().toString(36).substr(2, 9),
          data: new Date().toISOString(),
        };

        set(
          (state) => ({
            atividadesRecentes: [
              novaAtividade,
              ...state.atividadesRecentes,
            ].slice(0, 10),
          }),
          false,
          "adicionarAtividadeRecente"
        );
      },

      gerarEstatisticasPeriodo: async (dataInicio, dataFim) => {
        set({ loading: true }, false, "gerarEstatisticasPeriodo:start");

        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const estoqueState = useEstoqueStore.getState();
          const notasState = useNotasFiscaisStore.getState();

          const estatisticas: EstatisticasPeriodo = {
            periodo: `${dataInicio} - ${dataFim}`,
            totalProdutos: estoqueState.produtos.length,
            totalNotasFiscais: notasState.notasFiscais.length,
            totalMovimentacoes: estoqueState.movimentacoes.length,
            faturamentoTotal: notasState.valorTotalFaturado(),
            produtosMaisVendidos: [
              {
                id: "1",
                nome: "Smartphone Samsung",
                quantidade: 25,
                valor: 24999.9,
              },
              {
                id: "2",
                nome: "Notebook Dell",
                quantidade: 15,
                valor: 35999.9,
              },
              { id: "3", nome: "Mouse Logitech", quantidade: 45, valor: 299.9 },
            ],
          };

          set(
            {
              estatisticasPeriodo: estatisticas,
              loading: false,
            },
            false,
            "gerarEstatisticasPeriodo:success"
          );
        } catch (error) {
          set(
            {
              error: "Erro ao gerar estatísticas do período",
              loading: false,
            },
            false,
            "gerarEstatisticasPeriodo:error"
          );
        }
      },

      atualizarAlertasEstoque: () => {
        const estoqueState = useEstoqueStore.getState();
        const produtosBaixoEstoque = estoqueState.produtosBaixoEstoque();

        const alertas: AlertaEstoque[] = produtosBaixoEstoque.map(
          (produto) => ({
            id: produto.id,
            produtoId: produto.id,
            produtoNome: produto.nome,
            quantidadeAtual: produto.quantidade,
            estoqueMinimo: produto.estoqueMinimo,
            severidade:
              produto.quantidade === 0
                ? "zerado"
                : produto.quantidade <= produto.estoqueMinimo * 0.5
                ? "critico"
                : "baixo",
          })
        );

        set({ alertasEstoque: alertas }, false, "atualizarAlertasEstoque");
      },

      setFiltrosPeriodo: (filtros) => {
        set({ filtrosPeriodo: filtros }, false, "setFiltrosPeriodo");
      },

      setLoading: (loading) => set({ loading }, false, "setLoading"),
      setError: (error) => set({ error }, false, "setError"),

      reset: () => set(initialState, false, "reset"),
    }),
    {
      name: "dashboard-store",
    }
  )
);
