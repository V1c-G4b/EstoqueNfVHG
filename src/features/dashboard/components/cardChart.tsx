import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface CardChartProps {
  title: string;
  value: number;
  description?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  isLoading?: boolean;
}

/**
 * Componente dumb para exibir métricas em formato de card
 * Responsabilidade: Apenas apresentação visual
 */
export function CardChart({
  title,
  value,
  description,
  icon,
  variant = "default",
  isLoading = false,
}: CardChartProps) {
  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toLocaleString();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "danger":
        return "border-red-200 bg-red-50";
      default:
        return "";
    }
  };

  return (
    <Card className={getVariantStyles()}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-20 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-2xl font-bold">{formatValue(value)}</div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
