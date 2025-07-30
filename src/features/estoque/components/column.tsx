import { type ColumnDef } from "@tanstack/react-table";
import type { Produto } from "../types";
import { ProductActions } from "./product-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type { Produto };

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
    accessorKey: "imagemUrl",
    header: "Imagem",
    cell: ({ row }) => {
      const imagemUrl = row.getValue("imagemUrl") as string;
      return imagemUrl ? (
        <img
          src={imagemUrl}
          alt="Produto"
          className="h-10 w-10 object-cover rounded"
        />
      ) : (
        <span className="text-gray-400">Sem imagem</span>
      );
    },
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
    accessorKey: "dataCriacao",
    header: "Data de Criação",
    cell: ({ row }) => {
      const data = row.getValue("dataCriacao") as Date;
      return new Date(data).toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "dataAtualizacao",
    header: "Última Atualização",
    cell: ({ row }) => {
      const data = row.getValue("dataAtualizacao") as Date;
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
