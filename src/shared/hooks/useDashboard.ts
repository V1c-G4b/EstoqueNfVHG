import { useCallback } from "react";
import { useDashboardStore } from "../stores";

/**
 * Hook customizado para gerenciar dados do dashboard
 */
export const useDashboard = () => {
  const {
    loading,
    error,
    ultimaAtualizacao,
    movimentacoesMensais,
    atividadesRecentes,
    estatisticasPeriodo,
    alertasEstoque,
    filtrosPeriodo,
    resumoGeral,
    metricas,
    carregarDadosDashboard,
    atualizarMovimentacoesMensais,
    adicionarAtividadeRecente,
    gerarEstatisticasPeriodo,
    atualizarAlertasEstoque,
    setFiltrosPeriodo,
    setError,
  } = useDashboardStore();

  const inicializarDashboard = useCallback(async () => {
    try {
      await carregarDadosDashboard();
    } catch (error) {
      console.error("Erro ao inicializar dashboard:", error);
    }
  }, [carregarDadosDashboard]);

  const atualizarDados = useCallback(() => {
    atualizarMovimentacoesMensais();
    atualizarAlertasEstoque();
  }, [atualizarMovimentacoesMensais, atualizarAlertasEstoque]);

  const registrarAtividade = useCallback(
    (
      tipo: "produto" | "nota" | "usuario" | "movimentacao",
      titulo: string,
      descricao: string
    ) => {
      adicionarAtividadeRecente({ tipo, titulo, descricao });
    },
    [adicionarAtividadeRecente]
  );

  const obterEstatisticasPeriodo = useCallback(
    async (dataInicio: string, dataFim: string) => {
      try {
        await gerarEstatisticasPeriodo(dataInicio, dataFim);
      } catch (error) {
        console.error("Erro ao gerar estatísticas:", error);
      }
    },
    [gerarEstatisticasPeriodo]
  );

  const alterarPeriodo = useCallback(
    (
      periodo: "7d" | "30d" | "90d" | "1y",
      dataInicio?: string,
      dataFim?: string
    ) => {
      setFiltrosPeriodo({ periodo, dataInicio, dataFim });
      atualizarDados();
    },
    [setFiltrosPeriodo, atualizarDados]
  );

  const limparErro = useCallback(() => {
    setError(null);
  }, [setError]);

  const dadosResumo = resumoGeral();
  const dadosMetricas = metricas();

  return {

    loading,
    error,
    ultimaAtualizacao,

 
    movimentacoesMensais,
    atividadesRecentes,
    estatisticasPeriodo,
    alertasEstoque,
    filtrosPeriodo,

    resumo: dadosResumo,
    metricas: dadosMetricas,

    inicializarDashboard,
    atualizarDados,
    registrarAtividade,
    obterEstatisticasPeriodo,
    alterarPeriodo,
    limparErro,
  };
};


export const useEstatisticasDashboard = () => {
  const { resumo, metricas } = useDashboard();

  return {
    cards: [
      {
        titulo: "Produtos",
        valor: resumo.totalProdutos,
        descricao: `${resumo.totalProdutosAtivos} ativos`,
        icone: "Package",
        cor: "blue",
        variacao: metricas.crescimentoProdutos,
      },
      {
        titulo: "Notas Fiscais",
        valor: resumo.totalNotasFiscais,
        descricao: `${resumo.notasAutorizadas} autorizadas`,
        icone: "FileText",
        cor: "green",
        variacao: metricas.crescimentoFaturamento,
      },
      {
        titulo: "Faturamento",
        valor: resumo.faturamentoMensal,
        descricao: "Este mês",
        icone: "TrendingUp",
        cor: "emerald",
        formato: "currency",
        variacao: metricas.crescimentoFaturamento,
      },
      {
        titulo: "Alertas",
        valor: resumo.produtosBaixoEstoque,
        descricao: "Produtos baixo estoque",
        icone: "AlertTriangle",
        cor: resumo.produtosBaixoEstoque > 0 ? "red" : "gray",
        variacao: 0,
      },
    ],

    metricas: {
      eficienciaEstoque: metricas.eficienciaEstoque,
      ticketMedio: metricas.ticketMedio,
      valorTotalEstoque: resumo.valorTotalEstoque,
    },
  };
};


export const useAlertasDashboard = () => {
  const { alertasEstoque, resumo } = useDashboard();

  const alertasPorSeveridade = {
    critico: alertasEstoque.filter((a) => a.severidade === "critico"),
    baixo: alertasEstoque.filter((a) => a.severidade === "baixo"),
    zerado: alertasEstoque.filter((a) => a.severidade === "zerado"),
  };

  const temAlertas = alertasEstoque.length > 0;
  const alertasCriticos = alertasPorSeveridade.critico.length;

  return {
    alertas: alertasEstoque,
    alertasPorSeveridade,
    temAlertas,
    alertasCriticos,
    totalAlertas: alertasEstoque.length,

    resumoAlertas: {
      total: alertasEstoque.length,
      criticos: alertasCriticos,
      percentualBaixoEstoque:
        resumo.totalProdutos > 0
          ? (resumo.produtosBaixoEstoque / resumo.totalProdutos) * 100
          : 0,
    },
  };
};
