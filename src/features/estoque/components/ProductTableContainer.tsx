import { TableLoading } from "@/shared/components/ui/Loading";
import { useProdutos } from "@/shared/hooks";
import { useConfirmation } from "@/shared/hooks/useConfirmation";
import { useErrorHandler } from "@/shared/utils/errorHandler";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import {
  createProductColumns,
  type ProdutoTableItem,
} from "./ProductTableColumns";

/**
 * Componente smart para gerenciar a tabela de produtos
 * Responsabilidade: Estado, lógica de negócio, side effects
 */
export function ProductTableContainer() {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();
  const { confirmWithNative } = useConfirmation();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const { produtos, loading, removerProduto } = useProdutos();

  const tableData: ProdutoTableItem[] = useMemo(
    () =>
      produtos.map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        codigoBarras: produto.codigoBarras,
        quantidade: produto.quantidade,
        imagemUrl: produto.imagemUrl || undefined,
        ativo: produto.ativo,
        dataCriacao: new Date(produto.createdAt),
        dataAtualizacao: new Date(produto.updatedAt),
      })),
    [produtos]
  );
  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/estoque/produtos/editar/${id}`);
    },
    [navigate]
  );

  const handleView = useCallback(
    (id: string) => {
      navigate(`/estoque/produtos/${id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const produto = produtos.find((p) => p.id === id);
      if (!produto) return;

      await confirmWithNative(
        `Tem certeza que deseja excluir o produto "${produto.nome}"?`,
        async () => {
          setDeletingIds((prev) => new Set([...prev, id]));

          try {
            await removerProduto(id);
            toast.success("Produto excluído com sucesso");
          } catch (error) {
            handleError(error);
          } finally {
            setDeletingIds((prev) => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        }
      );
    },
    [produtos, removerProduto, handleError, confirmWithNative]
  );

  const columns = useMemo(
    () =>
      createProductColumns(handleEdit, handleView, handleDelete, deletingIds),
    [handleEdit, handleView, handleDelete, deletingIds]
  );

  if (loading) {
    return <TableLoading rows={8} columns={7} />;
  }

  return <DataTable columns={columns} data={tableData} />;
}
