import { PageLayout } from "@/shared/components";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";
import { FileText, Package, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import CardChart from "@/features/dashboard/components/cardChart";
import CardChartContainer from "../components/cardChartContainer";

const chartData = [
  { month: "Janeiro", entradas: 186, saidas: 80 },
  { month: "Fevereiro", entradas: 305, saidas: 200 },
  { month: "Março", entradas: 237, saidas: 120 },
  { month: "Abril", entradas: 73, saidas: 190 },
  { month: "Maio", entradas: 209, saidas: 130 },
  { month: "Junho", entradas: 214, saidas: 140 },
];

const chartConfig = {
  entradas: {
    label: "Entradas",
    color: "hsl(var(--chart-1))",
  },
  saidas: {
    label: "Saídas",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function EstoqueChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
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
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardChart
        icon={<Package />}
        title="Produtos"
        value={0}
        description="cadastrados"
      />

      <CardChart
        icon={<FileText />}
        title="Notas Fiscais"
        value={0}
        description="registradas"
      />

      <CardChart
        icon={<Users />}
        title="Usuários Ativos"
        value={1}
        description="no sistema"
      />

      <CardChart
        icon={<TrendingUp />}
        title="Movimentações"
        value={0}
        description="neste mês"
      />
    </div>
  );
}

function ChartsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <CardChartContainer
        title={"Movimentação de Estoque"}
        description={"Entradas e saídas de produtos nos últimos 6 meses"}
      >
        <EstoqueChart />
      </CardChartContainer>

      <CardChartContainer
        title={"Atividades Recentes"}
        description={"Últimas movimentações do sistema"}
        colSpan={3}
      >
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Sistema inicializado
              </p>
              <p className="text-sm text-muted-foreground">
                Aguardando primeiras movimentações
              </p>
            </div>
          </div>
        </div>
      </CardChartContainer>
    </div>
  );
}

export function DashboardPage() {
  return (
    <PageLayout
      title="Dashboard"
      description="Bem-vindo ao Sistema de Estoque e Notas Fiscais VHG"
    >
      <StatsCards />
      <ChartsSection />
    </PageLayout>
  );
}
