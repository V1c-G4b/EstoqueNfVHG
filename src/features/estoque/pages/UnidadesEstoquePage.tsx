import { PageLayout } from "@/shared/components/PageLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Edit,
  MapPin,
  Plus,
  Search,
  Trash2,
  User,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UnidadeEstoque } from "../types";

const mockUnidades: UnidadeEstoque[] = [
  {
    id: "1",
    nome: "Depósito Central",
    descricao: "Depósito principal da empresa",
    endereco: "Rua Principal, 123 - Centro - São Paulo/SP",
    responsavel: "João Silva",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    nome: "Loja Shopping",
    descricao: "Loja no Shopping Center",
    endereco: "Shopping Center, Loja 45 - Zona Sul - São Paulo/SP",
    responsavel: "Maria Santos",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    nome: "Filial Norte",
    descricao: "Filial da região norte",
    endereco: "Av. Norte, 456 - Zona Norte - São Paulo/SP",
    responsavel: "Pedro Costa",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "4",
    nome: "Depósito Auxiliar",
    descricao: "Depósito secundário para overflow",
    endereco: "Rua Industrial, 789 - Distrito Industrial - São Paulo/SP",
    responsavel: "Ana Lima",
    ativo: false,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

export function UnidadesEstoquePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  const filteredUnidades = mockUnidades.filter((unidade) => {
    const matchesSearch =
      unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.responsavel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.endereco?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" ||
      (statusFilter === "ativo" && unidade.ativo) ||
      (statusFilter === "inativo" && !unidade.ativo);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <PageLayout
      title="Unidades de Estoque"
      description="Gerencie as unidades e locais de armazenamento"
      actions={
        <Button onClick={() => navigate("/estoque/unidades/nova")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Unidade
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, descrição, responsável ou endereço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos os status</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnidades.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Warehouse className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Nenhuma unidade encontrada
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm || statusFilter !== "todos"
                      ? "Tente ajustar os filtros de busca"
                      : "Não há unidades cadastradas ainda"}
                  </p>
                  {!searchTerm && statusFilter === "todos" && (
                    <Button onClick={() => navigate("/estoque/unidades/nova")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar primeira unidade
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredUnidades.map((unidade) => (
              <Card
                key={unidade.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Warehouse className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{unidade.nome}</CardTitle>
                    </div>
                    <Badge
                      variant={unidade.ativo ? "default" : "secondary"}
                      className={
                        unidade.ativo
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {unidade.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {unidade.descricao && (
                    <p className="text-sm text-muted-foreground">
                      {unidade.descricao}
                    </p>
                  )}

                  {unidade.endereco && (
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>{unidade.endereco}</span>
                    </div>
                  )}

                  {unidade.responsavel && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <span className="font-medium">Responsável:</span>{" "}
                        {unidade.responsavel}
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Criado em: {formatDate(unidade.createdAt)}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        navigate(`/estoque/unidades/editar/${unidade.id}`)
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredUnidades.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {mockUnidades.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total de Unidades
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {mockUnidades.filter((u) => u.ativo).length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Unidades Ativas
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-600">
                    {mockUnidades.filter((u) => !u.ativo).length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Unidades Inativas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
