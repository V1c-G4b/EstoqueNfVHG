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
  ArrowRight,
  Calendar,
  Package,
  Plus,
  Search,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TransferenciaEstoque } from "../types";

// Mock data - em um app real, viria de uma API
const mockTransferencias: TransferenciaEstoque[] = [
  {
    id: "1",
    produtoId: "1",
    produto: {
      id: "1",
      nome: "Produto A",
      codigoBarras: "PROD-001",
      quantidade: 100,
      imagemUrl: undefined,
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    unidadeOrigemId: "1",
    unidadeOrigem: {
      id: "1",
      nome: "Depósito Central",
      descricao: "Depósito principal da empresa",
      endereco: "Rua Principal, 123",
      responsavel: "João Silva",
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    unidadeDestinoId: "2",
    unidadeDestino: {
      id: "2",
      nome: "Loja Shopping",
      descricao: "Loja no Shopping Center",
      endereco: "Shopping Center, Loja 45",
      responsavel: "Maria Santos",
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    quantidade: 10,
    motivo: "Reposição de estoque",
    observacoes: "Transferência urgente",
    status: "pendente",
    usuarioSolicitanteId: "user1",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "2",
    produtoId: "2",
    produto: {
      id: "2",
      nome: "Produto B",
      codigoBarras: "PROD-002",
      quantidade: 50,
      imagemUrl: undefined,
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    unidadeOrigemId: "2",
    unidadeOrigem: {
      id: "2",
      nome: "Loja Shopping",
      descricao: "Loja no Shopping Center",
      endereco: "Shopping Center, Loja 45",
      responsavel: "Maria Santos",
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    unidadeDestinoId: "3",
    unidadeDestino: {
      id: "3",
      nome: "Filial Norte",
      descricao: "Filial da região norte",
      endereco: "Av. Norte, 456",
      responsavel: "Pedro Costa",
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    quantidade: 5,
    motivo: "Abertura de nova loja",
    status: "aprovada",
    usuarioSolicitanteId: "user1",
    usuarioAprovadorId: "admin1",
    dataAprovacao: "2024-01-01T12:00:00Z",
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
  },
];

const getStatusColor = (status: TransferenciaEstoque["status"]) => {
  switch (status) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "aprovada":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "rejeitada":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "concluida":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusLabel = (status: TransferenciaEstoque["status"]) => {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "aprovada":
      return "Aprovada";
    case "rejeitada":
      return "Rejeitada";
    case "concluida":
      return "Concluída";
    default:
      return status;
  }
};

export function TransferenciasListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  const filteredTransferencias = mockTransferencias.filter((transferencia) => {
    const matchesSearch =
      transferencia.produto.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transferencia.produto.codigoBarras
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transferencia.unidadeOrigem.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transferencia.unidadeDestino.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || transferencia.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageLayout
      title="Transferências de Estoque"
      description="Gerencie as transferências de produtos entre unidades"
      actions={
        <Button onClick={() => navigate("/estoque/transferencias/nova")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Transferência
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por produto, SKU ou unidade..."
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
                  <option value="pendente">Pendente</option>
                  <option value="aprovada">Aprovada</option>
                  <option value="rejeitada">Rejeitada</option>
                  <option value="concluida">Concluída</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Transferências */}
        <div className="space-y-4">
          {filteredTransferencias.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhuma transferência encontrada
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchTerm || statusFilter !== "todos"
                    ? "Tente ajustar os filtros de busca"
                    : "Não há transferências cadastradas ainda"}
                </p>
                {!searchTerm && statusFilter === "todos" && (
                  <Button
                    onClick={() => navigate("/estoque/transferencias/nova")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Criar primeira transferência
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTransferencias.map((transferencia) => (
              <Card
                key={transferencia.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            {transferencia.produto.nome}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Código: {transferencia.produto.codigoBarras} |
                            Quantidade: {transferencia.quantidade}
                          </p>
                        </div>
                        <Badge className={getStatusColor(transferencia.status)}>
                          {getStatusLabel(transferencia.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Warehouse className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {transferencia.unidadeOrigem.nome}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center gap-2">
                          <Warehouse className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {transferencia.unidadeDestino.nome}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Criado em: {formatDate(transferencia.createdAt)}
                          </span>
                        </div>
                        {transferencia.dataAprovacao && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Aprovado em:{" "}
                              {formatDate(transferencia.dataAprovacao)}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm">
                        <span className="font-medium">Motivo:</span>{" "}
                        {transferencia.motivo}
                      </p>

                      {transferencia.observacoes && (
                        <p className="text-sm">
                          <span className="font-medium">Observações:</span>{" "}
                          {transferencia.observacoes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 lg:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/estoque/transferencias/${transferencia.id}`
                          )
                        }
                      >
                        Ver Detalhes
                      </Button>
                      {transferencia.status === "pendente" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Aprovar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Rejeitar
                          </Button>
                        </>
                      )}
                      {transferencia.status === "aprovada" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Concluir
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
}
