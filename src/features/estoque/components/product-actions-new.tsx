import { Button } from "@/shared/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import type { Produto } from "./column";

interface ProductActionsProps {
  produto: Produto;
}

export function ProductActions({ produto }: ProductActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => alert(`Visualizar produto: ${produto.nome}`)}
        variant="ghost"
        size="sm"
        className="size-8 p-0"
      >
        <Eye className="size-4" />
      </Button>
      <Button
        onClick={() => alert(`Deletar produto: ${produto.nome}`)}
        variant="ghost"
        size="sm"
        className="size-8 p-0 text-destructive hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
