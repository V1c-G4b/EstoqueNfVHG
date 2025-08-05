import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Calculator } from "lucide-react";

interface ResumoFinanceiroProps {
  valorTotalProdutos: number;
  valorTotalIcms: number;
  valorTotalIpi: number;
  valorTotalIcmsSt: number;
  valorTotalDesconto: number;
  valorTotalNota: number;
  items: any[];
}

export function ResumoFinanceiro({
  valorTotalProdutos,
  valorTotalIcms,
  valorTotalIpi,
  valorTotalIcmsSt,
  valorTotalDesconto,
  valorTotalNota,
  items,
}: ResumoFinanceiroProps) {
  if (items.length === 0) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Calculator className="h-5 w-5" />
          Resumo Financeiro da Nota Fiscal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-blue-600 font-medium">
              Valor dos Produtos
            </Label>
            <p className="text-2xl font-bold text-blue-800">
              {valorTotalProdutos.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-orange-600 font-medium">
              Total ICMS
            </Label>
            <p className="text-2xl font-bold text-orange-800">
              {valorTotalIcms.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-purple-600 font-medium">
              Total IPI
            </Label>
            <p className="text-2xl font-bold text-purple-800">
              {valorTotalIpi.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-green-600 font-medium">
              Total da Nota
            </Label>
            <p className="text-3xl font-bold text-green-800">
              {valorTotalNota.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">ICMS ST</Label>
            <p className="text-lg font-semibold">
              {valorTotalIcmsSt.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Total Descontos
            </Label>
            <p className="text-lg font-semibold text-red-600">
              -
              {valorTotalDesconto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Qtd. Itens</Label>
            <p className="text-lg font-semibold">
              {items.length} {items.length === 1 ? "item" : "itens"}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Base ICMS</Label>
            <p className="text-lg font-semibold">
              {items
                .reduce((acc, item) => acc + (item.tributacao.bcIcms || 0), 0)
                .toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
