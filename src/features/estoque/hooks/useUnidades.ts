import { useEffect, useState } from "react";
import type { UnidadeEstoque } from "../types";

const mockUnidades: UnidadeEstoque[] = [
  {
    id: "1",
    nome: "Depósito Central",
    descricao: "Depósito principal da empresa",
    endereco: "Rua Principal, 123 - Centro - São Paulo/SP",
    responsavel: "João Silva",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    nome: "Loja Shopping",
    descricao: "Loja no Shopping Center",
    endereco: "Shopping Center, Loja 45 - Zona Sul - São Paulo/SP",
    responsavel: "Maria Santos",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    nome: "Filial Norte",
    descricao: "Filial da região norte",
    endereco: "Av. Norte, 456 - Zona Norte - São Paulo/SP",
    responsavel: "Pedro Costa",
    ativo: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

interface CreateUnidadeData {
  nome: string;
  descricao?: string;
  endereco: string;
  responsavel: string;
  ativo: boolean;
}

export function useUnidades() {
  const [unidades, setUnidades] = useState<UnidadeEstoque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUnidades = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUnidades(mockUnidades);
    } catch (err) {
      setError("Erro ao carregar unidades");
    } finally {
      setLoading(false);
    }
  };

  const createUnidade = async (data: CreateUnidadeData) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newUnidade: UnidadeEstoque = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setUnidades((prev) => [newUnidade, ...prev]);
      return newUnidade;
    } catch (err) {
      setError("Erro ao criar unidade");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUnidade = async (
    id: string,
    data: Partial<CreateUnidadeData>
  ) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUnidades((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : u
        )
      );
    } catch (err) {
      setError("Erro ao atualizar unidade");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUnidade = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUnidades((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError("Erro ao deletar unidade");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUnidadeById = (id: string) => {
    return unidades.find((u) => u.id === id);
  };

  const getUnidadesAtivas = () => {
    return unidades.filter((u) => u.ativo);
  };

  useEffect(() => {
    loadUnidades();
  }, []);

  return {
    unidades,
    loading,
    error,
    createUnidade,
    updateUnidade,
    deleteUnidade,
    getUnidadeById,
    getUnidadesAtivas,
    reloadUnidades: loadUnidades,
  };
}
