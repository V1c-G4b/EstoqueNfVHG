import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

interface TableToolbarProps {
  onSearchChange: (value: string) => void;
  onStatusFilter: (status: "all" | "active" | "inactive" | "no-stock") => void;
  searchValue: string;
  statusFilter: "all" | "active" | "inactive" | "no-stock";
  resultsCount: number;
  totalCount: number;
}

export function TableToolbar({
  onSearchChange,
  onStatusFilter,
  searchValue,
  statusFilter,
  resultsCount,
  totalCount,
}: TableToolbarProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const clearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  const clearFilters = () => {
    setLocalSearch("");
    onSearchChange("");
    onStatusFilter("all");
  };

  const hasActiveFilters = searchValue || statusFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-center gap-2 max-w-sm"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 pr-10"
            />
            {localSearch && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button type="submit" size="sm">
            Buscar
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Status
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    1
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter === "all"}
                onCheckedChange={() => onStatusFilter("all")}
              >
                Todos os produtos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "active"}
                onCheckedChange={() => onStatusFilter("active")}
              >
                Apenas ativos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "inactive"}
                onCheckedChange={() => onStatusFilter("inactive")}
              >
                Apenas inativos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "no-stock"}
                onCheckedChange={() => onStatusFilter("no-stock")}
              >
                Sem estoque
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 lg:px-3"
            >
              Limpar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Mostrando {resultsCount} de {totalCount} produto
          {totalCount !== 1 ? "s" : ""}
          {hasActiveFilters && (
            <span className="ml-1">
              (filtrado{resultsCount !== 1 ? "s" : ""})
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span>Filtros ativos:</span>
            {searchValue && (
              <Badge variant="secondary" className="text-xs">
                Busca: {searchValue}
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Status:{" "}
                {statusFilter === "active"
                  ? "Ativos"
                  : statusFilter === "inactive"
                  ? "Inativos"
                  : statusFilter === "no-stock"
                  ? "Sem estoque"
                  : ""}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
