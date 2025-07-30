import { useDashboard, useEstatisticasDashboard } from "@/shared/hooks";
import { AlertTriangle, FileText, Package, TrendingUp } from "lucide-react";
import { CardChart } from "./cardChart";

/**
 * Componente smart que gerencia lógica e dados para os cards de estatísticas
 * Responsabilidade: Buscar dados, processar lógica, mapear para UI
 */
export function StatsCardsContainer() {
  const { cards } = useEstatisticasDashboard();
  const { loading } = useDashboard();

  const iconMap = {
    Package: Package,
    FileText: FileText,
    TrendingUp: TrendingUp,
    AlertTriangle: AlertTriangle,
  } as const;

  const getVariantByType = (
    titulo: string
  ): "default" | "success" | "warning" | "danger" => {
    const tituloLower = titulo.toLowerCase();
    if (tituloLower.includes("vendas") || tituloLower.includes("lucro")) {
      return "success";
    }
    if (tituloLower.includes("alerta") || tituloLower.includes("baixo")) {
      return "warning";
    }
    if (tituloLower.includes("erro") || tituloLower.includes("pendente")) {
      return "danger";
    }
    return "default";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const IconComponent =
          iconMap[card.icone as keyof typeof iconMap] || Package;

        return (
          <CardChart
            key={`${card.titulo}-${index}`}
            icon={<IconComponent className="h-4 w-4 text-muted-foreground" />}
            title={card.titulo}
            value={card.valor}
            description={card.descricao}
            variant={getVariantByType(card.titulo)}
            isLoading={loading}
          />
        );
      })}
    </div>
  );
}
