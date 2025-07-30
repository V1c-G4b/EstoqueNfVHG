import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { isLowStock } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";

export interface ProdutoTableItem {
  id: string;
  nome: string;
  codigoBarras: string;
  quantidade: number;
  imagemUrl?: string;
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

interface ProductActionsProps {
  produto: ProdutoTableItem;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

/**
 * Componente dumb para ações do produto
 * Responsabilidade: Apenas UI e chamada de callbacks
 */
function ProductActions({
  produto,
  onEdit,
  onView,
  onDelete,
  isDeleting,
}: ProductActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => onView(produto.id)}
        variant="ghost"
        size="sm"
        className="size-8 p-0"
        title="Visualizar produto"
      >
        <Eye className="size-4" />
      </Button>
      <Button
        onClick={() => onEdit(produto.id)}
        variant="ghost"
        size="sm"
        className="size-8 p-0"
        title="Editar produto"
      >
        <Edit className="size-4" />
      </Button>
      <Button
        onClick={() => onDelete(produto.id)}
        variant="ghost"
        size="sm"
        className="size-8 p-0"
        title="Excluir produto"
        disabled={isDeleting}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

/**
 * Factory function para criar colunas da tabela
 * Recebe callbacks como parâmetros para manter componente dumb
 */
export function createProductColumns(
  onEdit: (id: string) => void,
  onView: (id: string) => void,
  onDelete: (id: string) => void,
  deletingIds: Set<string> = new Set()
): ColumnDef<ProdutoTableItem>[] {
  return [
    {
      accessorKey: "nome",
      header: "Nome do Produto",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("nome")}</div>
      ),
    },
    {
      accessorKey: "codigoBarras",
      header: "Código de Barras",
      cell: ({ row }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          {row.getValue("codigoBarras")}
        </code>
      ),
    },
    {
      accessorKey: "quantidade",
      header: "Quantidade",
      cell: ({ row }) => {
        const quantidade = row.getValue("quantidade") as number;
        const isLow = isLowStock(quantidade, 10);
        return (
          <div className={`font-medium ${isLow ? "text-red-600" : ""}`}>
            {quantidade}
            {isLow && (
              <Badge variant="destructive" className="ml-2 text-xs">
                Baixo
              </Badge>
            )}
          </div>
        );
      },
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
          <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
            <span className="text-xs text-muted-foreground">N/A</span>
          </div>
        );
      },
    },
    {
      accessorKey: "ativo",
      header: "Status",
      cell: ({ row }) => {
        const ativo = row.getValue("ativo") as boolean;
        return (
          <Badge variant={ativo ? "default" : "secondary"}>
            {ativo ? "Ativo" : "Inativo"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <ProductActions
          produto={row.original}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
          isDeleting={deletingIds.has(row.original.id)}
        />
      ),
    },
  ];
}
