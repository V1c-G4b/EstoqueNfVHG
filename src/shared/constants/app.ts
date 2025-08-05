export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "EstoqueNF VHG",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    debug: import.meta.env.VITE_ENABLE_DEBUG === "true",
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  SKU_PATTERN: /^[A-Z0-9-]+$/,
} as const;

export const MESSAGES = {
  LOADING: "Carregando...",
  NO_DATA: "Nenhum dado encontrado",
  ERROR_GENERIC: "Ocorreu um erro inesperado",
  SUCCESS_SAVE: "Dados salvos com sucesso",
  SUCCESS_DELETE: "Item removido com sucesso",
  CONFIRM_DELETE: "Tem certeza que deseja remover este item?",
} as const;

export const STATUS = {
  PRODUTO: {
    ATIVO: "ativo",
    INATIVO: "inativo",
  },
  MOVIMENTACAO: {
    ENTRADA: "entrada",
    SAIDA: "saida",
    AJUSTE: "ajuste",
  },
} as const;
