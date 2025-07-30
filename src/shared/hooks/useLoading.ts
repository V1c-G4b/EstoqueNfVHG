import { create } from "zustand";

interface LoadingState {
  loadingStates: Record<string, boolean>;
  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;
  isAnyLoading: () => boolean;
  clearAll: () => void;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loadingStates: {},

  setLoading: (key: string, loading: boolean) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: loading,
      },
    })),

  isLoading: (key: string) => get().loadingStates[key] || false,

  isAnyLoading: () => Object.values(get().loadingStates).some(Boolean),

  clearAll: () => set({ loadingStates: {} }),
}));

export function useLoading(key: string) {
  const { setLoading, isLoading } = useLoadingStore();

  return {
    isLoading: isLoading(key),
    setLoading: (loading: boolean) => setLoading(key, loading),
    withLoading: async <T>(promise: Promise<T>): Promise<T> => {
      setLoading(key, true);
      try {
        const result = await promise;
        return result;
      } finally {
        setLoading(key, false);
      }
    },
  };
}
