export { cn } from "./cn";

export * from "./cn";
export * from "./errorHandler";
export * from "./formatters";
export * from "./lib-utils";
export * from "./xml";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR");
};
