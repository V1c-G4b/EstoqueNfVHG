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
import { ArrowLeft, ArrowRight, Package, Warehouse } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Produto, UnidadeEstoque } from "../types";

// Mock data - em um app real, viria de uma API
const mockUnidades: UnidadeEstoque[] = [
  {
    id: "1",
    nome: "Depósito Central",
    descricao: "Depósito principal da empresa",
    endereco: "Rua Principal, 123",
    responsavel: "João Silva",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    nome: "Loja Shopping",
    descricao: "Loja no Shopping Center",
    endereco: "Shopping Center, Loja 45",
    responsavel: "Maria Santos",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    nome: "Filial Norte",
    descricao: "Filial da região norte",
    endereco: "Av. Norte, 456",
    responsavel: "Pedro Costa",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

const mockProdutos: Produto[] = [
  {
    id: "1",
    nome: "Produto A",
    codigoBarras: "PROD-001",
    quantidade: 100,
    imagemUrl: undefined,
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    nome: "Produto B",
    codigoBarras: "PROD-002",
    quantidade: 50,
    imagemUrl: undefined,
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

export function TransferenciaEstoquePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    produtoId: "",
    unidadeOrigemId: "",
    unidadeDestinoId: "",
    quantidade: 1,
    motivo: "",
    observacoes: "",
  });

  const produtoSelecionado = mockProdutos.find(
    (p) => p.id === formData.produtoId
  );
  const unidadeOrigem = mockUnidades.find(
    (u) => u.id === formData.unidadeOrigemId
  );
  const unidadeDestino = mockUnidades.find(
    (u) => u.id === formData.unidadeDestinoId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular API call
    setTimeout(() => {
      setLoading(false);
      navigate("/estoque/transferencias");
    }, 2000);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.produtoId &&
      formData.unidadeOrigemId &&
      formData.unidadeDestinoId &&
      formData.unidadeOrigemId !== formData.unidadeDestinoId &&
      formData.quantidade > 0 &&
      formData.motivo.trim()
    );
  };

  return (
    <FormLayout
      title="Nova Transferência de Estoque"
      description="Transfira produtos entre diferentes unidades de estoque"
      actions={
        <Button
          variant="outline"
          onClick={() => navigate("/estoque/transferencias")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="produto">Selecione o Produto *</Label>
              <select
                id="produto"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.produtoId}
                onChange={(e) => handleInputChange("produtoId", e.target.value)}
                required
              >
                <option value="">Escolha um produto</option>
                {mockProdutos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} - Código: {produto.codigoBarras} | Estoque:{" "}
                    {produto.quantidade}
                  </option>
                ))}
              </select>
            </div>

            {produtoSelecionado && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Informações do Produto</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nome:</span>
                    <p className="font-medium">{produtoSelecionado.nome}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Estoque Atual:
                    </span>
                    <p className="font-medium">
                      {produtoSelecionado.quantidade}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Código:</span>
                    <p className="font-medium">
                      {produtoSelecionado.codigoBarras}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Unidades de Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="unidadeOrigem">Unidade de Origem *</Label>
                <select
                  id="unidadeOrigem"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.unidadeOrigemId}
                  onChange={(e) =>
                    handleInputChange("unidadeOrigemId", e.target.value)
                  }
                  required
                >
                  <option value="">Selecione a origem</option>
                  {mockUnidades.map((unidade) => (
                    <option
                      key={unidade.id}
                      value={unidade.id}
                      disabled={unidade.id === formData.unidadeDestinoId}
                    >
                      {unidade.nome} - {unidade.descricao}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unidadeDestino">Unidade de Destino *</Label>
                <select
                  id="unidadeDestino"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.unidadeDestinoId}
                  onChange={(e) =>
                    handleInputChange("unidadeDestinoId", e.target.value)
                  }
                  required
                >
                  <option value="">Selecione o destino</option>
                  {mockUnidades.map((unidade) => (
                    <option
                      key={unidade.id}
                      value={unidade.id}
                      disabled={unidade.id === formData.unidadeOrigemId}
                    >
                      {unidade.nome} - {unidade.descricao}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {unidadeOrigem && unidadeDestino && (
              <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <Warehouse className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium text-sm">{unidadeOrigem.nome}</p>
                    <p className="text-xs text-muted-foreground">Origem</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <Warehouse className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium text-sm">{unidadeDestino.nome}</p>
                    <p className="text-xs text-muted-foreground">Destino</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Transferência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade *</Label>
                <Input
                  id="quantidade"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.quantidade}
                  onChange={(e) =>
                    handleInputChange(
                      "quantidade",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="Quantidade a transferir"
                  required
                />
                {produtoSelecionado && (
                  <p className="text-sm text-muted-foreground">
                    Disponível: {produtoSelecionado.quantidade}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo da Transferência *</Label>
                <Input
                  id="motivo"
                  value={formData.motivo}
                  onChange={(e) => handleInputChange("motivo", e.target.value)}
                  placeholder="Ex: Reposição de estoque, transferência entre lojas"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <textarea
                id="observacoes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.observacoes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("observacoes", e.target.value)
                }
                placeholder="Informações adicionais sobre a transferência..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/estoque/transferencias")}
            className="sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading || !isFormValid()}
            className="sm:w-auto"
          >
            {loading ? "Solicitando..." : "Solicitar Transferência"}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
