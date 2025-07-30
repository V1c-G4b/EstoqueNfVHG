
/**
 * Formatar valores monetários para BRL
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Formatar números grandes com sufixos
 */
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString("pt-BR");
};

/**
 * Formatar datas para formato brasileiro
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR");
};

/**
 * Formatar datas para formato brasileiro com horário
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString("pt-BR");
};

/**
 * Truncar texto com ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalizar primeira letra
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Verificar se um produto está com estoque baixo
 */
export const isLowStock = (
  quantidade: number,
  estoqueMinimo: number
): boolean => {
  return quantidade <= estoqueMinimo;
};

/**
 * Obter classe CSS baseada no status do estoque
 */
export const getStockStatusClass = (
  quantidade: number,
  estoqueMinimo: number
): string => {
  if (quantidade === 0) return "text-red-600";
  if (isLowStock(quantidade, estoqueMinimo)) return "text-yellow-600";
  return "text-green-600";
};

/**
 * Gerar cor aleatória para avatars/badges
 */
export const generateColor = (seed: string): string => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-gray-500",
  ];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};
