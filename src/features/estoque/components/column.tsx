import { type ColumnDef } from "@tanstack/react-table";
import { type Produto } from "../types";
import { ProductActions } from "./product-actions";

export const columns: ColumnDef<Produto>[] = [
  {
    accessorKey: "nome",
    header: "Nome do Produto",
  },
  {
    accessorKey: "codigoBarras",
    header: "Código de Barras",
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "ativo",
    header: "Status",
    cell: ({ row }) => {
      const ativo = row.getValue("ativo") as boolean;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {ativo ? "Ativo" : "Inativo"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const data = row.getValue("createdAt") as Date;
      return new Date(data).toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Última Atualização",
    cell: ({ row }) => {
      const data = row.getValue("updatedAt") as Date;
      return new Date(data).toLocaleDateString("pt-BR");
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const produto = row.original;
      return <ProductActions produto={produto} />;
    },
  },
];
