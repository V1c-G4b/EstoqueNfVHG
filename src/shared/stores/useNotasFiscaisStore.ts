import type { Cliente, NotaFiscal } from "@/features/notasFiscais/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface NotaConsultada {
  numero: string;
  serie: string;
  chaveAcesso: string;
  cliente: string;
  valor: number;
  status: string;
  dataEmissao: string;
  protocoloAutorizacao?: string;
}

interface NotasFiscaisState {
  notasFiscais: NotaFiscal[];
  clientes: Cliente[];
  notaConsultada: NotaConsultada | null;
  loading: boolean;
  error: string | null;

  isEmitindo: boolean;
  notaEmitida: NotaFiscal | null;

  notasAutorizadas: () => NotaFiscal[];
  notasCanceladas: () => NotaFiscal[];
  totalNotasEmitidas: () => number;
  valorTotalFaturado: () => number;
  notasPorPeriodo: (dataInicio: string, dataFim: string) => NotaFiscal[];

  setNotasFiscais: (notas: NotaFiscal[]) => void;
  addNotaFiscal: (nota: NotaFiscal) => void;
  updateNotaFiscal: (id: string, dados: Partial<NotaFiscal>) => void;
  cancelarNotaFiscal: (id: string, motivo: string) => void;

  setClientes: (clientes: Cliente[]) => void;
  addCliente: (cliente: Cliente) => void;
  updateCliente: (id: string, dados: Partial<Cliente>) => void;

  setNotaConsultada: (nota: NotaConsultada | null) => void;
  consultarNotaPorChave: (chaveAcesso: string) => Promise<void>;

  setIsEmitindo: (isEmitindo: boolean) => void;
  setNotaEmitida: (nota: NotaFiscal | null) => void;
  emitirNotaFiscal: (
    dadosNota: Omit<NotaFiscal, "id" | "createdAt" | "updatedAt">
  ) => Promise<NotaFiscal>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  buscarNotasPorCliente: (clienteId: string) => NotaFiscal[];
  buscarNotasPorStatus: (status: NotaFiscal["status"]) => NotaFiscal[];
  buscarNotasPorPeriodo: (dataInicio: string, dataFim: string) => NotaFiscal[];

  reset: () => void;
}

const initialState = {
  notasFiscais: [],
  clientes: [],
  notaConsultada: null,
  loading: false,
  error: null,
  isEmitindo: false,
  notaEmitida: null,
};

export const useNotasFiscaisStore = create<NotasFiscaisState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      notasAutorizadas: () =>
        get().notasFiscais.filter((nota) => nota.status === "autorizada"),

      notasCanceladas: () =>
        get().notasFiscais.filter((nota) => nota.status === "cancelada"),

      totalNotasEmitidas: () => get().notasFiscais.length,

      valorTotalFaturado: () =>
        get()
          .notasFiscais.filter((nota) => nota.status === "autorizada")
          .reduce((total, nota) => total + nota.valorLiquido, 0),

      notasPorPeriodo: (dataInicio, dataFim) =>
        get().notasFiscais.filter((nota) => {
          const dataEmissao = new Date(nota.dataEmissao);
          return (
            dataEmissao >= new Date(dataInicio) &&
            dataEmissao <= new Date(dataFim)
          );
        }),

      setNotasFiscais: (notasFiscais) =>
        set({ notasFiscais }, false, "setNotasFiscais"),

      addNotaFiscal: (nota) =>
        set(
          (state) => ({ notasFiscais: [nota, ...state.notasFiscais] }),
          false,
          "addNotaFiscal"
        ),

      updateNotaFiscal: (id, dados) =>
        set(
          (state) => ({
            notasFiscais: state.notasFiscais.map((nota) =>
              nota.id === id ? { ...nota, ...dados } : nota
            ),
          }),
          false,
          "updateNotaFiscal"
        ),

      cancelarNotaFiscal: (id, motivo) =>
        set(
          (state) => ({
            notasFiscais: state.notasFiscais.map((nota) =>
              nota.id === id
                ? {
                    ...nota,
                    status: "cancelada" as const,
                    motivoCancelamento: motivo,
                  }
                : nota
            ),
          }),
          false,
          "cancelarNotaFiscal"
        ),

      setClientes: (clientes) => set({ clientes }, false, "setClientes"),

      addCliente: (cliente) =>
        set(
          (state) => ({ clientes: [...state.clientes, cliente] }),
          false,
          "addCliente"
        ),

      updateCliente: (id, dados) =>
        set(
          (state) => ({
            clientes: state.clientes.map((cliente) =>
              cliente.id === id ? { ...cliente, ...dados } : cliente
            ),
          }),
          false,
          "updateCliente"
        ),

      setNotaConsultada: (notaConsultada) =>
        set({ notaConsultada }, false, "setNotaConsultada"),

      consultarNotaPorChave: async (chaveAcesso) => {
        set(
          { loading: true, error: null, notaConsultada: null },
          false,
          "consultarNotaPorChave:start"
        );

        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          if (chaveAcesso.startsWith("35")) {
            const notaConsultada: NotaConsultada = {
              numero: "000123",
              serie: "001",
              chaveAcesso: chaveAcesso,
              cliente: "João Silva Comércio LTDA",
              valor: 2500.0,
              status: "autorizada",
              dataEmissao: new Date().toISOString(),
              protocoloAutorizacao: "135200000000001",
            };

            set(
              {
                notaConsultada,
                loading: false,
              },
              false,
              "consultarNotaPorChave:success"
            );
          } else {
            set(
              {
                error: "Nota fiscal não encontrada ou chave de acesso inválida",
                loading: false,
              },
              false,
              "consultarNotaPorChave:notFound"
            );
          }
        } catch (error) {
          set(
            {
              error: "Erro ao consultar nota fiscal",
              loading: false,
            },
            false,
            "consultarNotaPorChave:error"
          );
        }
      },

      setIsEmitindo: (isEmitindo) =>
        set({ isEmitindo }, false, "setIsEmitindo"),
      setNotaEmitida: (notaEmitida) =>
        set({ notaEmitida }, false, "setNotaEmitida"),

      emitirNotaFiscal: async (dadosNota) => {
        set({ isEmitindo: true, error: null }, false, "emitirNotaFiscal:start");

        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));

          const novaNota: NotaFiscal = {
            ...dadosNota,
            id: Math.random().toString(36).substr(2, 9),
            status: "autorizada",
            protocoloAutorizacao: Math.random().toString(36).substr(2, 15),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set(
            (state) => ({
              notasFiscais: [novaNota, ...state.notasFiscais],
              notaEmitida: novaNota,
              isEmitindo: false,
            }),
            false,
            "emitirNotaFiscal:success"
          );

          return novaNota;
        } catch (error) {
          set(
            {
              error: "Erro ao emitir nota fiscal",
              isEmitindo: false,
            },
            false,
            "emitirNotaFiscal:error"
          );
          throw error;
        }
      },

      setLoading: (loading) => set({ loading }, false, "setLoading"),
      setError: (error) => set({ error }, false, "setError"),

      buscarNotasPorCliente: (clienteId) =>
        get().notasFiscais.filter((nota) => nota.clienteId === clienteId),

      buscarNotasPorStatus: (status) =>
        get().notasFiscais.filter((nota) => nota.status === status),

      buscarNotasPorPeriodo: (dataInicio, dataFim) =>
        get().notasFiscais.filter((nota) => {
          const dataEmissao = new Date(nota.dataEmissao);
          return (
            dataEmissao >= new Date(dataInicio) &&
            dataEmissao <= new Date(dataFim)
          );
        }),

      reset: () => set(initialState, false, "reset"),
    }),
    {
      name: "notas-fiscais-store",
    }
  )
);
