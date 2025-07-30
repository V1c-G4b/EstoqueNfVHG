import { FormLayout } from "@/shared/components/PageLayout";
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
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ItemNota {
  id: string;
  produtoId: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export function EmitirNotaFiscalPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemNota[]>([
    {
      id: "1",
      produtoId: "",
      nome: "",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
    },
  ]);

  const addItem = () => {
    const newItem: ItemNota = {
      id: Date.now().toString(),
      produtoId: "",
      nome: "",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof ItemNota, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantidade" || field === "valorUnitario") {
            updatedItem.valorTotal =
              updatedItem.quantidade * updatedItem.valorUnitario;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const valorTotalNota = items.reduce((acc, item) => acc + item.valorTotal, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/notas-fiscais");
    }, 2000);
  };

  return (
    <FormLayout
      title="Emitir Nota Fiscal"
      description="Preencha os dados para emitir uma nova nota fiscal eletrônica"
      actions={
        <Button variant="outline" onClick={() => navigate("/notas-fiscais")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clienteNome">Nome/Razão Social *</Label>
                <Input
                  id="clienteNome"
                  placeholder="Nome do cliente"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clienteDocumento">CPF/CNPJ *</Label>
                <Input
                  id="clienteDocumento"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clienteEmail">Email</Label>
                <Input
                  id="clienteEmail"
                  type="email"
                  placeholder="cliente@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clienteTelefone">Telefone</Label>
                <Input id="clienteTelefone" placeholder="(11) 99999-9999" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endereço do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <Input id="cep" placeholder="00000-000" required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="logradouro">Logradouro *</Label>
                <Input
                  id="logradouro"
                  placeholder="Rua, Avenida, etc."
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numero">Número *</Label>
                <Input id="numero" placeholder="123" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input id="complemento" placeholder="Apto, Sala, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input id="bairro" placeholder="Nome do bairro" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input id="cidade" placeholder="Nome da cidade" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Produtos/Serviços</CardTitle>
            <Button type="button" onClick={addItem} size="sm">
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
                        updateItem(item.id, "nome", e.target.value)
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
                        updateItem(
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
                        updateItem(
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
                        onClick={() => removeItem(item.id)}
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

        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valorFrete">Valor do Frete</Label>
                <Input
                  id="valorFrete"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valorDesconto">Valor do Desconto</Label>
                <Input
                  id="valorDesconto"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <textarea
                id="observacoes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Informações adicionais sobre a nota fiscal..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/notas-fiscais")}
            className="sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading || valorTotalNota === 0}
            className="sm:w-auto"
          >
            {loading ? "Emitindo..." : "Emitir Nota Fiscal"}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
