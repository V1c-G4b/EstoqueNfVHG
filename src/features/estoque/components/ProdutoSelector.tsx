import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Package, Search, X } from "lucide-react";
import { useState } from "react";
import type { Produto } from "../types";

interface ProdutoSelectorProps {
  produtos: Produto[];
  selectedProduto?: Produto;
  onSelect: (produto: Produto) => void;
  onClear: () => void;
}

export function ProdutoSelector({
  produtos,
  selectedProduto,
  onSelect,
  onClear,
}: ProdutoSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (produto: Produto) => {
    onSelect(produto);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleClear = () => {
    onClear();
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {selectedProduto ? (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">{selectedProduto.nome}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      Estoque: {selectedProduto.quantidade}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar produto por nome ou SKU..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(e.target.value.length > 0);
              }}
              onFocus={() => setIsOpen(searchTerm.length > 0)}
              className="pl-10"
            />
          </div>

          {isOpen && filteredProdutos.length > 0 && (
            <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-64 overflow-y-auto">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {filteredProdutos.length} produto(s) encontrado(s)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 p-2">
                {filteredProdutos.map((produto) => (
                  <Button
                    key={produto.id}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleSelect(produto)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div className="text-left flex-1">
                        <div className="font-medium">{produto.nome}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Estoque: {produto.quantidade}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          {isOpen && searchTerm.length > 0 && filteredProdutos.length === 0 && (
            <Card className="absolute top-full left-0 right-0 z-10 mt-1">
              <CardContent className="p-4 text-center text-muted-foreground">
                Nenhum produto encontrado
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
