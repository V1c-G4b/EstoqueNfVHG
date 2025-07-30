import { CardChart } from "@/features/dashboard/components/cardChart";
import { useProdutos } from "@/shared/hooks";
import { useEstoqueMetrics } from "@/shared/hooks/useEstoqueMetrics";
import { AlertTriangle, Archive, Package, TrendingUp } from "lucide-react";
import { useMemo } from "react";

type StatCardVariant = "default" | "success" | "warning" | "danger";

interface StatCard {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  variant: StatCardVariant;
}

export function EstoqueStatsContainer() {
  const { loading } = useProdutos();
  const metrics = useEstoqueMetrics();

  const getStockVariant = (
    baixoEstoque: number,
    percentual: number
  ): StatCardVariant => {
    if (baixoEstoque === 0) return "success";
    if (percentual >= 20) return "danger";
    if (percentual >= 10) return "warning";
    return "default";
  };

  const cards: StatCard[] = useMemo(
    () => [
      {
        title: "Total de Produtos",
        value: metrics.totalProdutos,
        description: `${metrics.totalAtivos} ativos, ${metrics.totalInativos} inativos`,
        icon: <Package className="h-4 w-4 text-muted-foreground" />,
        variant: "default",
      },
      {
        title: "Valor Total do Estoque",
        value: metrics.valorTotalEstoque,
        description: `Baseado em ${metrics.totalAtivos} produtos ativos`,
        icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
        variant: metrics.valorTotalEstoque > 0 ? "success" : "default",
      },
      {
        title: "Produtos com Baixo Estoque",
        value: metrics.totalBaixoEstoque,
        description: `${metrics.percentualBaixoEstoque}% do total`,
        icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
        variant: getStockVariant(
          metrics.totalBaixoEstoque,
          metrics.percentualBaixoEstoque
        ),
      },
      {
        title: "Produtos Inativos",
        value: metrics.totalInativos,
        description: "Produtos não disponíveis para venda",
        icon: <Archive className="h-4 w-4 text-muted-foreground" />,
        variant: metrics.totalInativos > 0 ? "warning" : "default",
      },
    ],
    [metrics]
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <CardChart
          key={`estoque-stat-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          variant={card.variant}
          isLoading={loading}
        />
      ))}
    </div>
  );
}
