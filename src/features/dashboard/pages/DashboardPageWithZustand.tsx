import { PageLayout } from "@/shared/components";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  AlertTriangle,
  Calendar,
  FileText,
  Package,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {CardChart} from "@/features/dashboard/components/cardChart";
import {
  useAlertasDashboard,
  useDashboard,
  useEstatisticasDashboard,
} from "@/shared/hooks";
import CardChartContainer from "../components/cardChartContainer";

const chartConfig = {
  entradas: {
    label: "Entradas",
    color: "hsl(var(--chart-1))",
  },
  saidas: {
    label: "Saídas",
    color: "hsl(var(--chart-2))",
  },
  faturamento: {
    label: "Faturamento",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

function EstoqueChart() {
  const { movimentacoesMensais, loading } = useDashboard();

  if (loading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={movimentacoesMensais}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="mes"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="entradas" fill="var(--color-entradas)" radius={4} />
        <Bar dataKey="saidas" fill="var(--color-saidas)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

function StatsCards() {
  const { cards } = useEstatisticasDashboard();
  const { loading } = useDashboard();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Package":
        return <Package />;
      case "FileText":
        return <FileText />;
      case "TrendingUp":
        return <TrendingUp />;
      case "AlertTriangle":
        return <AlertTriangle />;
      default:
        return <Package />;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <CardChart
          key={index}
          icon={getIcon(card.icone)}
          title={card.titulo}
          value={loading ? 0 : card.valor}
          description={card.descricao}
        />
      ))}
    </div>
  );
}

function AtividadesRecentes() {
  const { atividadesRecentes, loading } = useDashboard();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (atividadesRecentes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
        <Calendar className="h-8 w-8 mb-2" />
        <p className="text-sm">Nenhuma atividade recente</p>
      </div>
    );
  }

  const getIconForActivity = (tipo: string) => {
    switch (tipo) {
      case "produto":
        return <Package className="h-4 w-4" />;
      case "nota":
        return <FileText className="h-4 w-4" />;
      case "movimentacao":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}min atrás`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h atrás`;
    } else {
      return date.toLocaleDateString("pt-BR");
    }
  };

  return (
    <div className="space-y-4">
      {atividadesRecentes.map((atividade) => (
        <div key={atividade.id} className="flex items-start space-x-4">
          <div className="mt-1 p-2 bg-muted rounded-full">
            {getIconForActivity(atividade.tipo)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-none">
              {atividade.titulo}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {atividade.descricao}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(atividade.data)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AlertasSection() {
  const { alertas, temAlertas, alertasCriticos } = useAlertasDashboard();

  if (!temAlertas) {
    return null;
  }

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-muted">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Alertas de Estoque
          {alertasCriticos > 0 && (
            <Badge variant="destructive">{alertasCriticos} críticos</Badge>
          )}
        </h3>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {alertas.slice(0, 6).map((alerta) => (
          <div
            key={alerta.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div>
              <p className="font-medium text-sm">{alerta.produtoNome}</p>
              <p className="text-xs text-muted-foreground">
                {alerta.quantidadeAtual} / {alerta.estoqueMinimo} unidades
              </p>
            </div>
            <Badge
              variant={
                alerta.severidade === "zerado"
                  ? "destructive"
                  : alerta.severidade === "critico"
                  ? "destructive"
                  : "secondary"
              }
              className="text-xs"
            >
              {alerta.severidade === "zerado"
                ? "Zerado"
                : alerta.severidade === "critico"
                ? "Crítico"
                : "Baixo"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartsSection() {
  const { ultimaAtualizacao, atualizarDados, loading } = useDashboard();

  const formatLastUpdate = (dateString: string | null) => {
    if (!dateString) return "Nunca";
    return new Date(dateString).toLocaleString("pt-BR");
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <CardChartContainer
        title="Movimentação de Estoque"
        description="Entradas e saídas de produtos nos últimos 6 meses"
      >
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={atualizarDados}
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
          </div>
          <EstoqueChart />
          <div className="mt-2 text-xs text-muted-foreground">
            Última atualização: {formatLastUpdate(ultimaAtualizacao)}
          </div>
        </div>
      </CardChartContainer>

      <CardChartContainer
        title="Atividades Recentes"
        description="Últimas movimentações do sistema"
        colSpan={3}
      >
        <AtividadesRecentes />
      </CardChartContainer>
    </div>
  );
}

export function DashboardPageWithZustand() {
  const { inicializarDashboard, error } = useDashboard();

  useEffect(() => {
    inicializarDashboard();
  }, [inicializarDashboard]);

  if (error) {
    return (
      <PageLayout
        title="Dashboard"
        description="Bem-vindo ao Sistema de Estoque e Notas Fiscais VHG"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold">Erro ao carregar dashboard</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={inicializarDashboard}>Tentar Novamente</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Dashboard"
      description="Bem-vindo ao Sistema de Estoque e Notas Fiscais VHG"
      size="full"
    >
      <div className="space-y-6">
        <AlertasSection />
        <StatsCards />
        <ChartsSection />
      </div>
    </PageLayout>
  );
}

// Export da versão original para manter compatibilidade
export { DashboardPage } from "./DashboardPage";
