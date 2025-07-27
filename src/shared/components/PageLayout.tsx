import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  actions,
  children,
  className,
}: PageLayoutProps) {
  return (
    <div
      className={cn(
        "flex-1 space-y-2 p-2 bg-gray-100 rounded-lg shadow-sm",
        className
      )}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-2">{actions}</div>
        )}
      </div>

      {/* Page Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
}

// Layout específico para páginas com grid de cards
interface CardGridLayoutProps extends PageLayoutProps {
  gridCols?: "1" | "2" | "3" | "4";
}

export function CardGridLayout({
  gridCols = "3",
  children,
  ...props
}: CardGridLayoutProps) {
  const gridClasses = {
    "1": "grid gap-6",
    "2": "grid gap-6 md:grid-cols-2",
    "3": "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <PageLayout {...props}>
      <div className={gridClasses[gridCols]}>{children}</div>
    </PageLayout>
  );
}

export function FormLayout({ children, ...props }: PageLayoutProps) {
  return (
    <PageLayout {...props}>
      <div>{children}</div>
    </PageLayout>
  );
}

export function TableLayout({ children, ...props }: PageLayoutProps) {
  return (
    <PageLayout {...props}>
      <div className="space-y-4">{children}</div>
    </PageLayout>
  );
}
