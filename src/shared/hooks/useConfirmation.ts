import { useCallback, useState } from "react";

interface UseConfirmationOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}


export function useConfirmation() {
  const [state, setState] = useState<ConfirmationState | null>(null);

  const confirm = useCallback(
    (
      action: () => void | Promise<void>,
      options: UseConfirmationOptions = {}
    ) => {
      const {
        title = "Confirmar ação",
        message = "Tem certeza que deseja continuar?",
        confirmText = "Confirmar",
        cancelText = "Cancelar",
      } = options;

      return new Promise<boolean>((resolve) => {
        setState({
          isOpen: true,
          title,
          message,
          confirmText,
          cancelText,
          onConfirm: async () => {
            setState(null);
            try {
              await action();
              resolve(true);
            } catch (error) {
              console.error("Erro na ação confirmada:", error);
              resolve(false);
            }
          },
          onCancel: () => {
            setState(null);
            resolve(false);
          },
        });
      });
    },
    []
  );

  const confirmWithNative = useCallback(
    (message: string, action: () => void | Promise<void>) => {
      if (window.confirm(message)) {
        return action();
      }
    },
    []
  );

  return {
    confirmationState: state,
    confirm,
    confirmWithNative,
    closeConfirmation: () => setState(null),
  };
}
