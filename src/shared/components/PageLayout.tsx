import { cn } from "@/shared/utils";
import type { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "minimal" | "bordered" | "elevated";
}

export function PageLayout({
  title,
  description,
  actions,
  children,
  className,
  containerClassName,
  headerClassName,
  contentClassName,
  size = "lg",
  variant = "default",
}: PageLayoutProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  };

  const variantClasses = {
    default: "bg-gray-50/50 border border-gray-200/60",
    minimal: "bg-transparent",
    bordered: "bg-white border border-gray-200 shadow-sm",
    elevated: "bg-white border border-gray-200/60 shadow-lg",
  };

  return (
    <div
      className={cn(
        "flex-1 min-h-0 p-4 sm:p-6 lg:p-8 rounded-xl transition-all duration-200",
        variantClasses[variant],
        className
      )}
    >
      <div
        className={cn("mx-auto w-full", sizeClasses[size], containerClassName)}
      >
        <div
          className={cn(
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8",
            headerClassName
          )}
        >
          <div className="space-y-2 min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 truncate">
              {title}
            </h1>
            {description && (
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>

        <div className={cn("space-y-6 lg:space-y-8 min-h-0", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface CardGridLayoutProps extends PageLayoutProps {
  gridCols?: "1" | "2" | "3" | "4" | "5" | "6";
  gap?: "sm" | "md" | "lg" | "xl";
  autoFit?: boolean;
  minCardWidth?: string;
}

export function CardGridLayout({
  gridCols = "3",
  gap = "md",
  autoFit = false,
  minCardWidth = "280px",
  children,
  ...props
}: CardGridLayoutProps) {
  const gapClasses = {
    sm: "gap-3",
    md: "gap-4 lg:gap-6",
    lg: "gap-6 lg:gap-8",
    xl: "gap-8 lg:gap-10",
  };

  const gridClasses = {
    "1": "grid",
    "2": "grid sm:grid-cols-2",
    "3": "grid sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    "5": "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    "6": "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  };

  const gridClass = autoFit
    ? `grid grid-cols-[repeat(auto-fit,minmax(${minCardWidth},1fr))]`
    : gridClasses[gridCols];

  return (
    <PageLayout {...props}>
      <div className={cn(gridClass, gapClasses[gap])}>{children}</div>
    </PageLayout>
  );
}

interface FormLayoutProps extends PageLayoutProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centered?: boolean;
}

export function FormLayout({
  maxWidth = "full",
  centered = true,
  children,
  variant = "elevated",
  ...props
}: FormLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-none",
  };

  return (
    <PageLayout variant={variant} size="full" {...props}>
      <div
        className={cn(
          "w-full",
          maxWidthClasses[maxWidth],
          centered && "mx-auto"
        )}
      >
        {children}
      </div>
    </PageLayout>
  );
}

interface TableLayoutProps extends PageLayoutProps {
  tableActions?: ReactNode;
  showHeader?: boolean;
}

export function TableLayout({
  tableActions,
  showHeader = true,
  children,
  variant = "default",
  ...props
}: TableLayoutProps) {
  return (
    <PageLayout variant={variant} {...props}>
      <div className="space-y-4 lg:space-y-6">
        {showHeader && tableActions && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg b">
            {tableActions}
          </div>
        )}
        <div className="overflow-hidden rounded-lg  bg-white">{children}</div>
      </div>
    </PageLayout>
  );
}

interface DashboardLayoutProps extends PageLayoutProps {
  stats?: ReactNode;
  charts?: ReactNode;
  quickActions?: ReactNode;
}

export function DashboardLayout({
  stats,
  charts,
  quickActions,
  children,
  variant = "minimal",
  ...props
}: DashboardLayoutProps) {
  return (
    <PageLayout variant={variant} {...props}>
      <div className="space-y-6 lg:space-y-8">
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats}
          </div>
        )}

        {quickActions && (
          <div className="flex flex-wrap gap-3">{quickActions}</div>
        )}

        {charts && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {charts}
          </div>
        )}

        {children}
      </div>
    </PageLayout>
  );
}

interface DetailLayoutProps extends PageLayoutProps {
  sidebar?: ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "sm" | "md" | "lg";
}

export function DetailLayout({
  sidebar,
  sidebarPosition = "right",
  sidebarWidth = "md",
  children,
  variant = "bordered",
  ...props
}: DetailLayoutProps) {
  return (
    <PageLayout variant={variant} size="full" {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div
          className={cn(
            "space-y-6",
            sidebar
              ? sidebarPosition === "left"
                ? "lg:col-span-8 lg:order-2"
                : "lg:col-span-8"
              : "lg:col-span-12"
          )}
        >
          {children}
        </div>

        {sidebar && (
          <div
            className={cn(
              "lg:col-span-4 space-y-6",
              sidebarPosition === "left" && "lg:order-1"
            )}
          >
            <div className="sticky top-6">{sidebar}</div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
