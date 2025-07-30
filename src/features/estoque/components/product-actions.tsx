import { Button } from "@/shared/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Produto } from "./column";

interface ProductActionsProps {
  produto: Produto;
}

export function ProductActions({ produto }: ProductActionsProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/estoque/produtos/editar/${produto.id}`);
  };

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja deletar o produto: ${produto.nome}?`)) {
      alert(`Produto deletado: ${produto.nome}`);
    }
  };

  // const handleView = () => {
  //   alert(`Visualizando produto: ${produto.nome}`);
  // };

  return (
    <div className="flex items-center gap-1">
      {/* <Button
        onClick={handleView}
        variant="ghost"
        size="sm"
        className="size-8 p-0"
        title="Visualizar produto"
      >
        <View className="size-4" />
      </Button> */}
      <Button
        onClick={handleEdit}
        variant="ghost"
        size="sm"
        className="size-8 p-0"
        title="Editar produto"
      >
        <Edit className="size-4" />
      </Button>
      <Button
        onClick={handleDelete}
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-destructive hover:text-destructive"
        title="Deletar produto"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
