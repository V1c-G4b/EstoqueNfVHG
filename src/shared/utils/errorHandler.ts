import { toast } from "sonner";

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

export class ErrorHandler {
  static handle(error: unknown, showToast = true): AppError {
    const appError = this.normalize(error);

    if (showToast) {
      this.showErrorToast(appError);
    }

    if (import.meta.env.DEV) {
      console.error("Error handled:", appError);
    }

    return appError;
  }

  private static normalize(error: unknown): AppError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: "GENERIC_ERROR",
      };
    }

    if (typeof error === "string") {
      return {
        message: error,
        code: "STRING_ERROR",
      };
    }

    if (error && typeof error === "object" && "message" in error) {
      return {
        message: (error as any).message,
        code: (error as any).code || "OBJECT_ERROR",
        status: (error as any).status,
        details: (error as any).details,
      };
    }

    return {
      message: "Erro desconhecido",
      code: "UNKNOWN_ERROR",
    };
  }

  private static showErrorToast(error: AppError) {
    const title = this.getErrorTitle(error.code);
    toast.error(title, {
      description: error.message,
    });
  }

  private static getErrorTitle(code?: string): string {
    const titles: Record<string, string> = {
      NETWORK_ERROR: "Erro de Conexão",
      VALIDATION_ERROR: "Dados Inválidos",
      AUTH_ERROR: "Erro de Autenticação",
      PERMISSION_ERROR: "Sem Permissão",
      NOT_FOUND_ERROR: "Não Encontrado",
      SERVER_ERROR: "Erro do Servidor",
    };

    return titles[code || ""] || "Erro";
  }
}

export function useErrorHandler() {
  return {
    handleError: (error: unknown) => ErrorHandler.handle(error),
    handleErrorSilent: (error: unknown) => ErrorHandler.handle(error, false),
  };
}
