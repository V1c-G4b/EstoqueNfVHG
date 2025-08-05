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
import { Switch } from "@/shared/components/ui/switch";
import { ArrowLeft, Warehouse } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UnidadeFormData {
  nome: string;
  descricao: string;
  endereco: string;
  responsavel: string;
  ativo: boolean;
}

export function NovaUnidadeEstoquePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UnidadeFormData>({
    nome: "",
    descricao: "",
    endereco: "",
    responsavel: "",
    ativo: true,
  });

  useEffect(() => {
    if (isEdit && id) {
      setFormData({
        nome: "Depósito Central",
        descricao: "Depósito principal da empresa",
        endereco: "Rua Principal, 123 - Centro - São Paulo/SP",
        responsavel: "João Silva",
        ativo: true,
      });
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/estoque/unidades");
    }, 2000);
  };

  const handleInputChange = (field: keyof UnidadeFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.nome.trim() &&
      formData.endereco.trim() &&
      formData.responsavel.trim()
    );
  };

  return (
    <FormLayout
      title={isEdit ? "Editar Unidade de Estoque" : "Nova Unidade de Estoque"}
      description={
        isEdit
          ? "Atualize as informações da unidade de estoque"
          : "Cadastre uma nova unidade para armazenamento de produtos"
      }
      actions={
        <Button variant="outline" onClick={() => navigate("/estoque/unidades")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Unidade *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Ex: Depósito Central, Loja Shopping"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável *</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) =>
                    handleInputChange("responsavel", e.target.value)
                  }
                  placeholder="Nome do responsável pela unidade"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <textarea
                id="descricao"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                placeholder="Descrição da unidade e sua finalidade..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço Completo *</Label>
              <textarea
                id="endereco"
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="Rua, número, bairro, cidade/estado, CEP"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="ativo"
                checked={formData.ativo}
                onCheckedChange={(checked) =>
                  handleInputChange("ativo", checked)
                }
              />
              <Label htmlFor="ativo" className="text-sm font-medium">
                Unidade ativa
              </Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {formData.ativo
                ? "A unidade estará disponível para operações de estoque"
                : "A unidade ficará indisponível para novas operações"}
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/estoque/unidades")}
            className="sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading || !isFormValid()}
            className="sm:w-auto"
          >
            {loading
              ? isEdit
                ? "Atualizando..."
                : "Salvando..."
              : isEdit
              ? "Atualizar Unidade"
              : "Salvar Unidade"}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
