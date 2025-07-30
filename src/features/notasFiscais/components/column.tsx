import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Edit, Eye, MoreHorizontal, X } from "lucide-react";
import type { NotaFiscal } from "../types";

const getStatusVariant = (status: NotaFiscal["status"]) => {
  switch (status) {
    case "autorizada":
      return "default";
    case "cancelada":
      return "destructive";
    case "rejeitada":
      return "secondary";
    case "inutilizada":
      return "outline";
    default:
      return "secondary";
  }
};

const getStatusLabel = (status: NotaFiscal["status"]) => {
  switch (status) {
    case "autorizada":
      return "Autorizada";
    case "cancelada":
      return "Cancelada";
    case "rejeitada":
      return "Rejeitada";
    case "inutilizada":
      return "Inutilizada";
    default:
      return status;
  }
};

export const columns: ColumnDef<NotaFiscal>[] = [
  {
    accessorKey: "numero",
    header: "Número",
    cell: ({ row }) => {
      const nota = row.original;
      return (
        <div className="font-medium">
          <div>{nota.numero}</div>
          <div className="text-xs text-muted-foreground">
            Série: {nota.serie}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "cliente.nome",
    header: "Cliente",
    cell: ({ row }) => {
      const cliente = row.original.cliente;
      return (
        <div>
          <div className="font-medium">{cliente.nome}</div>
          <div className="text-xs text-muted-foreground">
            {cliente.documento}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "valorLiquido",
    header: "Valor",
    cell: ({ getValue }) => {
      const valor = getValue() as number;
      return (
        <div className="text-right font-medium">
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as NotaFiscal["status"];
      return (
        <Badge variant={getStatusVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dataEmissao",
    header: "Data Emissão",
    cell: ({ getValue }) => {
      const data = getValue() as string;
      return new Date(data).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "chaveAcesso",
    header: "Chave de Acesso",
    cell: ({ getValue }) => {
      const chave = getValue() as string;
      return (
        <div className="font-mono text-xs max-w-[200px] truncate" title={chave}>
          {chave}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const nota = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(nota.chaveAcesso)}
            >
              Copiar chave de acesso
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Baixar XML
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </DropdownMenuItem>
            {nota.status === "autorizada" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Emitir Carta de Correção
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <X className="mr-2 h-4 w-4" />
                  Cancelar NF-e
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export type { NotaFiscal };
