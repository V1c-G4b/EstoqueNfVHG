import { FormLayout } from "@/shared/components/PageLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useConsultaNF } from "@/shared/hooks/useNotasFiscais";
import { ArrowLeft, Download, Eye, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ConsultarNotaFiscalPage() {
  const navigate = useNavigate();
  const [chaveAcesso, setChaveAcesso] = useState("");

  // Usar Zustand ao invés de estado local
  const { notaConsultada, loading, error, consultarNota, limparConsulta } =
    useConsultaNF();

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    await consultarNota(chaveAcesso);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "autorizada":
        return "default";
      case "cancelada":
        return "destructive";
      case "rejeitada":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "autorizada":
        return "Autorizada";
      case "cancelada":
        return "Cancelada";
      case "rejeitada":
        return "Rejeitada";
      default:
        return status;
    }
  };

  return (
    <FormLayout
      title="Consultar Nota Fiscal"
      description="Consulte o status de uma nota fiscal eletrônica na SEFAZ"
      actions={
        <div className="flex gap-2">
          {notaConsultada && (
            <Button variant="ghost" onClick={limparConsulta}>
              Nova Consulta
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate("/notas-fiscais")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Formulário de Consulta */}
        <Card>
          <CardHeader>
            <CardTitle>Dados para Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConsulta} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chaveAcesso">Chave de Acesso da NF-e *</Label>
                <Input
                  id="chaveAcesso"
                  placeholder="Digite a chave de acesso de 44 dígitos"
                  value={chaveAcesso}
                  onChange={(e) =>
                    setChaveAcesso(e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={44}
                  required
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  A chave de acesso deve conter exatamente 44 dígitos numéricos
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || chaveAcesso.length !== 44}
                className="w-full sm:w-auto"
              >
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Consultando..." : "Consultar na SEFAZ"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Resultado da Consulta */}
        {notaConsultada && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Resultado da Consulta</CardTitle>
              <Badge variant={getStatusVariant(notaConsultada.status)}>
                {getStatusLabel(notaConsultada.status)}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Número da Nota</Label>
                  <p className="text-sm">{notaConsultada.numero}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Série</Label>
                  <p className="text-sm">{notaConsultada.serie}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cliente</Label>
                  <p className="text-sm">{notaConsultada.cliente}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Valor Total</Label>
                  <p className="text-sm font-medium">
                    {notaConsultada.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Data de Emissão</Label>
                  <p className="text-sm">
                    {new Date(notaConsultada.dataEmissao).toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                {notaConsultada.protocoloAutorizacao && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Protocolo de Autorização
                    </Label>
                    <p className="text-sm font-mono">
                      {notaConsultada.protocoloAutorizacao}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Chave de Acesso</Label>
                <p className="text-xs font-mono break-all bg-muted p-2 rounded">
                  {notaConsultada.chaveAcesso}
                </p>
              </div>

              {notaConsultada.status === "autorizada" && (
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar DANFE
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar XML
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Informações sobre a consulta */}
        <Card>
          <CardHeader>
            <CardTitle>Informações sobre a Consulta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • A consulta é feita diretamente na SEFAZ para verificar o status
              atual da nota fiscal
            </p>
            <p className="text-sm text-muted-foreground">
              • Apenas notas fiscais autorizadas podem ser baixadas
            </p>
            <p className="text-sm text-muted-foreground">
              • A chave de acesso pode ser encontrada no XML ou DANFE da nota
              fiscal
            </p>
            <p className="text-sm text-muted-foreground">
              • Este serviço consulta apenas notas fiscais eletrônicas (NF-e)
            </p>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
}
