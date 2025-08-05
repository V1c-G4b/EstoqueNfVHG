import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Calculator, Plus, Trash2 } from "lucide-react";

interface ItemNota {
  id: string;
  produtoId: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  tributacao: any;
}

interface ProdutosTabProps {
  items: ItemNota[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: string, value: any) => void;
  valorTotalNota: number;
}

export function ProdutosTab({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  valorTotalNota,
}: ProdutosTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Calculator className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">
              Cálculos Automáticos
            </h4>
            <p className="text-sm text-blue-700">
              Os valores informados aqui são automaticamente sincronizados com a
              aba "Impostos". Qualquer alteração em quantidade ou valor unitário
              recalcula automaticamente todos os impostos.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Produtos/Serviços</CardTitle>
          <Button type="button" onClick={onAddItem} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-4 space-y-2">
                  <Label>Produto/Serviço *</Label>
                  <Input
                    placeholder="Nome do produto ou serviço"
                    value={item.nome}
                    onChange={(e) =>
                      onUpdateItem(item.id, "nome", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Quantidade *</Label>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    value={item.quantidade}
                    onChange={(e) =>
                      onUpdateItem(
                        item.id,
                        "quantidade",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Valor Unitário *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.valorUnitario}
                    onChange={(e) =>
                      onUpdateItem(
                        item.id,
                        "valorUnitario",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Valor Total</Label>
                  <Input
                    value={item.valorTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    disabled
                  />
                </div>
                <div className="md:col-span-2 flex items-center">
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Separator />

          <div className="flex justify-end">
            <div className="text-right space-y-2">
              <div className="text-sm text-muted-foreground">
                Total de itens: {items.length}
              </div>
              <div className="text-lg font-bold">
                Valor Total:{" "}
                {valorTotalNota.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
