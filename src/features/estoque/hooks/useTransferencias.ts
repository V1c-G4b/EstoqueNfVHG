import { useEffect, useState } from "react";
import type { TransferenciaEstoque } from "../types";

const mockTransferencias: TransferenciaEstoque[] = [
  {
    id: "1",
    produtoId: "1",
    produto: {
      id: "1",
      nome: "Produto A",
      codigoBarras: "PROD-001",
      quantidade: 100,
      imagemUrl: undefined,
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    unidadeOrigemId: "1",
    unidadeOrigem: {
      id: "1",
      nome: "Depósito Central",
      descricao: "Depósito principal da empresa",
      endereco: "Rua Principal, 123",
      responsavel: "João Silva",
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    unidadeDestinoId: "2",
    unidadeDestino: {
      id: "2",
      nome: "Loja Shopping",
      descricao: "Loja no Shopping Center",
      endereco: "Shopping Center, Loja 45",
      responsavel: "Maria Santos",
      ativo: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    quantidade: 10,
    motivo: "Reposição de estoque",
    observacoes: "Transferência urgente",
    status: "pendente",
    usuarioSolicitanteId: "user1",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
];

export function useTransferencias() {
  const [transferencias, setTransferencias] = useState<TransferenciaEstoque[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTransferencias = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTransferencias(mockTransferencias);
    } catch (err) {
      setError("Erro ao carregar transferências");
    } finally {
      setLoading(false);
    }
  };

  const createTransferencia = async (data: Partial<TransferenciaEstoque>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newTransferencia: TransferenciaEstoque = {
        id: Date.now().toString(),
        ...data,
        status: "pendente",
        usuarioSolicitanteId: "current-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as TransferenciaEstoque;

      setTransferencias((prev) => [newTransferencia, ...prev]);
      return newTransferencia;
    } catch (err) {
      setError("Erro ao criar transferência");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const aprovarTransferencia = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTransferencias((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: "aprovada",
                usuarioAprovadorId: "current-user",
                dataAprovacao: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
    } catch (err) {
      setError("Erro ao aprovar transferência");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejeitarTransferencia = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTransferencias((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: "rejeitada",
                usuarioAprovadorId: "current-user",
                dataAprovacao: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
    } catch (err) {
      setError("Erro ao rejeitar transferência");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const concluirTransferencia = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTransferencias((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: "concluida",
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
    } catch (err) {
      setError("Erro ao concluir transferência");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransferencias();
  }, []);

  return {
    transferencias,
    loading,
    error,
    createTransferencia,
    aprovarTransferencia,
    rejeitarTransferencia,
    concluirTransferencia,
    reloadTransferencias: loadTransferencias,
  };
}
