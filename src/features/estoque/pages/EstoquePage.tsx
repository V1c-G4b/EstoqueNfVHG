import { TableLayout } from "@/shared/components/PageLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useProdutos } from "@/shared/hooks";
import { AlertTriangle, Package, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "../components/column";
import { DataTable } from "../components/data-table";
import { XMLImportDialog } from "../components/dialogProduct";
import { TableToolbar } from "../components/table-toolbar";

export function EstoquePage() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "no-stock"
  >("all");
  const navigate = useNavigate();

  const {
    produtos,
    loading,
    error,
    produtosAtivos,
    produtosBaixoEstoque,
    totalProdutos,
    carregarProdutos,
    buscarProdutos,
  } = useProdutos();

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const filteredData = useMemo(() => {
    let filtered = produtos;

    if (searchValue) {
      filtered = buscarProdutos(searchValue);
    }

    switch (statusFilter) {
      case "active":
        filtered = filtered.filter((produto) => produto.ativo);
        break;
      case "inactive":
        filtered = filtered.filter((produto) => !produto.ativo);
        break;
      case "no-stock":
        filtered = filtered.filter((produto) => produto.quantidade === 0);
        break;
      default:
        break;
    }

    return filtered.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      codigoBarras: produto.codigoBarras,
      quantidade: produto.quantidade,
      imagemUrl: produto.imagemUrl,
      ativo: produto.ativo,
      createdAt: produto.createdAt,
      updatedAt: produto.updatedAt,
    }));
  }, [produtos, searchValue, statusFilter, buscarProdutos]);

  const stats = useMemo(() => {
    return {
      total: totalProdutos,
      ativos: produtosAtivos.length,
      baixoEstoque: produtosBaixoEstoque.length,
    };
  }, [totalProdutos, produtosAtivos.length, produtosBaixoEstoque.length]);

  if (error) {
    return (
      <TableLayout
        title="Estoque"
        description="Gerencie seus produtos e controle o estoque"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold">Erro ao carregar produtos</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={carregarProdutos}>Tentar Novamente</Button>
        </div>
      </TableLayout>
    );
  }

  return (
    <TableLayout
      title="Estoque"
      description="Gerencie seus produtos e controle o estoque"
      size="full"
      actions={
        <div className="flex gap-2">
          <XMLImportDialog />
          <Button
            variant={"secondary"}
            onClick={() => navigate("/estoque/produtos/novo")}
          >
            Consultar Chave
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => navigate("/estoque/produtos/novo")}
          >
            Consultar lista...
          </Button>
          <Button onClick={() => navigate("/estoque/produtos/novo")}>
            Novo Produto
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Produtos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.total}</div>
              )}
              <p className="text-xs text-muted-foreground">
                +{stats.ativos} ativos no estoque
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produtos Ativos
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats.ativos}</div>
              )}
              <p className="text-xs text-muted-foreground">
                Disponíveis para venda
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Baixo Estoque
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{stats.baixoEstoque}</div>
                  {stats.baixoEstoque > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      Atenção necessária
                    </Badge>
                  )}
                </>
              )}
              <p className="text-xs text-muted-foreground">
                Abaixo do estoque mínimo
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <TableToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            statusFilter={statusFilter}
            onStatusFilter={setStatusFilter}
            resultsCount={filteredData.length}
            totalCount={totalProdutos}
          />

          <div className="rounded-md border">
            <DataTable columns={columns} data={filteredData} />
          </div>
        </div>
      </div>
    </TableLayout>
  );
}
