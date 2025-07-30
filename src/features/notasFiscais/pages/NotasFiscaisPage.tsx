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
import { useNotasFiscais } from "@/shared/hooks";
import { CheckCircle, DollarSign, FileText, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "../components/column";
import { DataTable } from "../components/data-table";
import { TableToolbar } from "../components/table-toolbar";

export function NotasFiscaisPage() {
  const {
    notasFiscais: data,
    loading,
    carregarNotasFiscais,
  } = useNotasFiscais();

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "autorizada" | "cancelada" | "rejeitada"
  >("all");
  const navigate = useNavigate();

  useEffect(() => {
    carregarNotasFiscais();
  }, [carregarNotasFiscais]);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (searchValue) {
      filtered = filtered.filter(
        (nota) =>
          nota.numero.toLowerCase().includes(searchValue.toLowerCase()) ||
          nota.cliente.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
          nota.chaveAcesso.includes(searchValue)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((nota) => nota.status === statusFilter);
    }

    return filtered;
  }, [data, searchValue, statusFilter]);

  const totalNotas = data.length;
  const totalNotasAutorizadas = data.filter(
    (nota) => nota.status === "autorizada"
  ).length;
  const totalNotasCanceladas = data.filter(
    (nota) => nota.status === "cancelada"
  ).length;
  const totalValorFaturado = data
    .filter((nota) => nota.status === "autorizada")
    .reduce((acc, nota) => acc + nota.valorLiquido, 0);

  return (
    <TableLayout
      title="Gestão de Notas Fiscais"
      description="Controle e monitoramento das suas notas fiscais eletrônicas"
      size="full"
      actions={
        <>
          <Button
            variant="outline"
            onClick={() => navigate("/notas-fiscais/consultar")}
          >
            Consultar NF-e
          </Button>
          <Button
            variant="default"
            onClick={() => navigate("/notas-fiscais/emitir")}
            className="ml-2"
          >
            Emitir NF-e
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Notas
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{totalNotas}</div>
                <p className="text-xs text-muted-foreground">notas emitidas</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autorizadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-green-600">
                  {totalNotasAutorizadas}
                </div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {totalNotas > 0
                      ? Math.round((totalNotasAutorizadas / totalNotas) * 100)
                      : 0}
                    %
                  </Badge>{" "}
                  do total
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-28" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-red-600">
                  {totalNotasCanceladas}
                </div>
                <p className="text-xs text-muted-foreground">
                  notas canceladas
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor Faturado
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {totalValorFaturado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  em vendas autorizadas
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <TableToolbar
        onSearchChange={setSearchValue}
        onStatusFilter={setStatusFilter}
        searchValue={searchValue}
        statusFilter={statusFilter}
        resultsCount={filteredData.length}
        totalCount={totalNotas}
      />

      <div className="rounded-lg border bg-card">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </TableLayout>
  );
}
