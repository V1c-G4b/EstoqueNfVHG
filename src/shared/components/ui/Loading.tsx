import { Skeleton } from "@/shared/components/ui/skeleton";

interface TableLoadingProps {
  rows?: number;
  columns?: number;
}

/**
 * Componente dumb para loading de tabelas
 * Responsabilidade: Apenas UI de loading
 */
export function TableLoading({ rows = 5, columns = 6 }: TableLoadingProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="rounded-md border">
        <div className="p-4 space-y-3">
          <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton key={`header-${index}`} className="h-4 flex-1" />
            ))}
          </div>

          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="h-8 flex-1"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CardLoadingProps {
  count?: number;
}

/**
 * Componente dumb para loading de cards
 */
export function CardLoading({ count = 4 }: CardLoadingProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`card-loading-${index}`}
          className="p-6 border rounded-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}
