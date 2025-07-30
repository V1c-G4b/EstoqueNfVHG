import type { Cliente, NotaFiscal } from "@/features/notasFiscais/types";
import { useCallback } from "react";
import { useNotasFiscaisStore } from "../stores";

export const useNotasFiscais = () => {
  const {
    notasFiscais,
    loading,
    error,
    isEmitindo,
    notaEmitida,
    setNotasFiscais,
    addNotaFiscal,
    updateNotaFiscal,
    cancelarNotaFiscal,
    emitirNotaFiscal,
    buscarNotasPorCliente,
    buscarNotasPorStatus,
    buscarNotasPorPeriodo,
    notasAutorizadas,
    notasCanceladas,
    totalNotasEmitidas,
    valorTotalFaturado,
    notasPorPeriodo,
  } = useNotasFiscaisStore();

  const carregarNotasFiscais = useCallback(async () => {
    useNotasFiscaisStore.getState().setLoading(true);
    try {
      // Simular carregamento de notas fiscais
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const notasMock: NotaFiscal[] = [
        {
          id: "1",
          numero: "000001",
          serie: "001",
          chaveAcesso: "35240112345678901234550010000000011123456789",
          clienteId: "1",
          cliente: {
            id: "1",
            nome: "Tech Solutions Ltda",
            documento: "12.345.678/0001-90",
            tipoDocumento: "cnpj",
            email: "contato@techsolutions.com.br",
            telefone: "(11) 3456-7890",
            endereco: {
              logradouro: "Rua das Tecnologias, 123",
              numero: "123",
              bairro: "Centro",
              cidade: "São Paulo",
              estado: "SP",
              cep: "01234-567",
            },
            ativo: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          items: [
            {
              id: "1",
              notaFiscalId: "1",
              produtoId: "1",
              produto: {
                id: "1",
                nome: "Smartphone Samsung Galaxy S24",
                sku: "SMSG-S24-128",
                unidadeMedida: "UN",
              },
              quantidade: 5,
              valorUnitario: 2499.99,
              valorTotal: 12499.95,
              desconto: 0,
              sequencia: 1,
            },
            {
              id: "2",
              notaFiscalId: "1",
              produtoId: "2",
              produto: {
                id: "2",
                nome: "Notebook Dell Inspiron 15",
                sku: "DELL-INS15-8GB",
                unidadeMedida: "UN",
              },
              quantidade: 2,
              valorUnitario: 3599.99,
              valorTotal: 7199.98,
              desconto: 0,
              sequencia: 2,
            },
          ],
          valorTotal: 19699.93,
          valorDesconto: 0,
          valorFrete: 0,
          valorLiquido: 19699.93,
          status: "autorizada",
          dataEmissao: new Date(2024, 6, 1).toISOString(),
          observacoes: "Venda realizada conforme pedido #001",
          protocoloAutorizacao: "135240000000001",
          createdAt: new Date(2024, 6, 1).toISOString(),
          updatedAt: new Date(2024, 6, 1).toISOString(),
        },
        {
          id: "2",
          numero: "000002",
          serie: "001",
          chaveAcesso: "35240112345678901234550010000000021123456789",
          clienteId: "2",
          cliente: {
            id: "2",
            nome: "João Silva",
            documento: "123.456.789-01",
            tipoDocumento: "cpf",
            email: "joao.silva@email.com",
            telefone: "(11) 9876-5432",
            endereco: {
              logradouro: "Av. Principal, 456",
              numero: "456",
              bairro: "Jardim",
              cidade: "São Paulo",
              estado: "SP",
              cep: "04567-890",
            },
            ativo: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          items: [
            {
              id: "3",
              notaFiscalId: "2",
              produtoId: "3",
              produto: {
                id: "3",
                nome: "Mouse Gamer Logitech G502",
                sku: "LOG-G502-RGB",
                unidadeMedida: "UN",
              },
              quantidade: 1,
              valorUnitario: 299.99,
              valorTotal: 299.99,
              desconto: 0,
              sequencia: 1,
            },
            {
              id: "4",
              notaFiscalId: "2",
              produtoId: "4",
              produto: {
                id: "4",
                nome: "Teclado Mecânico Corsair K70",
                sku: "COR-K70-MEC",
                unidadeMedida: "UN",
              },
              quantidade: 1,
              valorUnitario: 899.99,
              valorTotal: 899.99,
              desconto: 0,
              sequencia: 2,
            },
          ],
          valorTotal: 1199.98,
          valorDesconto: 50.0,
          valorFrete: 0,
          valorLiquido: 1149.98,
          status: "autorizada",
          dataEmissao: new Date(2024, 6, 5).toISOString(),
          observacoes: "Cliente preferencial - desconto aplicado",
          protocoloAutorizacao: "135240000000002",
          createdAt: new Date(2024, 6, 5).toISOString(),
          updatedAt: new Date(2024, 6, 5).toISOString(),
        },
        {
          id: "3",
          numero: "000003",
          serie: "001",
          chaveAcesso: "35240112345678901234550010000000031123456789",
          clienteId: "3",
          cliente: {
            id: "3",
            nome: "Digital Store Comércio",
            documento: "98.765.432/0001-10",
            tipoDocumento: "cnpj",
            email: "vendas@digitalstore.com.br",
            telefone: "(11) 2345-6789",
            endereco: {
              logradouro: "Rua Comercial, 789",
              numero: "789",
              bairro: "Comércio",
              cidade: "São Paulo",
              estado: "SP",
              cep: "05678-901",
            },
            ativo: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          items: [
            {
              id: "5",
              notaFiscalId: "3",
              produtoId: "5",
              produto: {
                id: "5",
                nome: "Monitor LG UltraWide 29",
                sku: "LG-UW29-IPS",
                unidadeMedida: "UN",
              },
              quantidade: 3,
              valorUnitario: 1899.99,
              valorTotal: 5699.97,
              desconto: 0,
              sequencia: 1,
            },
            {
              id: "6",
              notaFiscalId: "3",
              produtoId: "7",
              produto: {
                id: "7",
                nome: "Headset HyperX Cloud II",
                sku: "HYP-CL2-BLK",
                unidadeMedida: "UN",
              },
              quantidade: 5,
              valorUnitario: 649.99,
              valorTotal: 3249.95,
              desconto: 0,
              sequencia: 2,
            },
          ],
          valorTotal: 8949.92,
          valorDesconto: 200.0,
          valorFrete: 0,
          valorLiquido: 8749.92,
          status: "autorizada",
          dataEmissao: new Date(2024, 6, 10).toISOString(),
          observacoes: "Pedido corporativo - entrega programada",
          protocoloAutorizacao: "135240000000003",
          createdAt: new Date(2024, 6, 10).toISOString(),
          updatedAt: new Date(2024, 6, 10).toISOString(),
        },
        {
          id: "4",
          numero: "000004",
          serie: "001",
          chaveAcesso: "35240112345678901234550010000000041123456789",
          clienteId: "4",
          cliente: {
            id: "4",
            nome: "Maria Santos",
            documento: "987.654.321-09",
            tipoDocumento: "cpf",
            email: "maria.santos@email.com",
            telefone: "(11) 5432-1098",
            endereco: {
              logradouro: "Rua Residencial, 321",
              numero: "321",
              bairro: "Vila Nova",
              cidade: "São Paulo",
              estado: "SP",
              cep: "06789-012",
            },
            ativo: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          items: [
            {
              id: "7",
              notaFiscalId: "4",
              produtoId: "8",
              produto: {
                id: "8",
                nome: "Webcam Logitech C920",
                sku: "LOG-C920-HD",
                unidadeMedida: "UN",
              },
              quantidade: 2,
              valorUnitario: 599.99,
              valorTotal: 1199.98,
              desconto: 0,
              sequencia: 1,
            },
            {
              id: "8",
              notaFiscalId: "4",
              produtoId: "9",
              produto: {
                id: "9",
                nome: "Cabo HDMI 4K Premium 2m",
                sku: "HDMI-4K-2M",
                unidadeMedida: "UN",
              },
              quantidade: 3,
              valorUnitario: 89.99,
              valorTotal: 269.97,
              desconto: 0,
              sequencia: 2,
            },
          ],
          valorTotal: 1469.95,
          valorDesconto: 0,
          valorFrete: 0,
          valorLiquido: 1469.95,
          status: "rejeitada",
          dataEmissao: new Date(2024, 6, 15).toISOString(),
          observacoes: "Rejeitada pela SEFAZ - erro nos dados",
          createdAt: new Date(2024, 6, 15).toISOString(),
          updatedAt: new Date(2024, 6, 15).toISOString(),
        },
        {
          id: "5",
          numero: "000005",
          serie: "001",
          chaveAcesso: "35240112345678901234550010000000051123456789",
          clienteId: "5",
          cliente: {
            id: "5",
            nome: "TechWorld Ltda",
            documento: "11.222.333/0001-44",
            tipoDocumento: "cnpj",
            email: "compras@techworld.com.br",
            telefone: "(11) 1111-2222",
            endereco: {
              logradouro: "Av. Tecnologia, 1000",
              numero: "1000",
              bairro: "Tech Park",
              cidade: "São Paulo",
              estado: "SP",
              cep: "07890-123",
            },
            ativo: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          items: [
            {
              id: "9",
              notaFiscalId: "5",
              produtoId: "10",
              produto: {
                id: "10",
                nome: "Fonte Corsair 750W 80+ Gold",
                sku: "COR-750W-GOLD",
                unidadeMedida: "UN",
              },
              quantidade: 10,
              valorUnitario: 899.99,
              valorTotal: 8999.9,
              desconto: 0,
              sequencia: 1,
            },
          ],
          valorTotal: 8999.9,
          valorDesconto: 0,
          valorFrete: 0,
          valorLiquido: 8999.9,
          status: "cancelada",
          dataEmissao: new Date(2024, 6, 20).toISOString(),
          observacoes: "Cancelada por solicitação do cliente",
          motivoCancelamento: "Cliente desistiu da compra",
          protocoloAutorizacao: "135240000000004",
          createdAt: new Date(2024, 6, 20).toISOString(),
          updatedAt: new Date(2024, 6, 22).toISOString(),
        },
      ];

      setNotasFiscais(notasMock);
    } catch (error) {
      useNotasFiscaisStore
        .getState()
        .setError("Erro ao carregar notas fiscais");
    } finally {
      useNotasFiscaisStore.getState().setLoading(false);
    }
  }, [setNotasFiscais]);

  const emitirNota = useCallback(
    async (dadosNota: Omit<NotaFiscal, "id" | "createdAt" | "updatedAt">) => {
      try {
        const nota = await emitirNotaFiscal(dadosNota);
        return nota;
      } catch (error) {
        throw error;
      }
    },
    [emitirNotaFiscal]
  );

  return {
    notasFiscais,
    loading,
    error,
    isEmitindo,
    notaEmitida,

    notasAutorizadas: notasAutorizadas(),
    notasCanceladas: notasCanceladas(),
    totalNotasEmitidas: totalNotasEmitidas(),
    valorTotalFaturado: valorTotalFaturado(),

    carregarNotasFiscais,
    adicionarNotaFiscal: addNotaFiscal,
    atualizarNotaFiscal: updateNotaFiscal,
    cancelarNota: cancelarNotaFiscal,
    emitirNota,
    buscarNotasPorCliente,
    buscarNotasPorStatus,
    buscarNotasPorPeriodo,
    obterNotasPorPeriodo: notasPorPeriodo,
  };
};

export const useConsultaNF = () => {
  const {
    notaConsultada,
    loading,
    error,
    consultarNotaPorChave,
    setNotaConsultada,
    setError,
  } = useNotasFiscaisStore();

  const consultarNota = useCallback(
    async (chaveAcesso: string) => {
      if (!chaveAcesso || chaveAcesso.length !== 44) {
        setError("Por favor, insira uma chave de acesso válida (44 dígitos)");
        return;
      }

      await consultarNotaPorChave(chaveAcesso);
    },
    [consultarNotaPorChave, setError]
  );

  const limparConsulta = useCallback(() => {
    setNotaConsultada(null);
    setError(null);
  }, [setNotaConsultada, setError]);

  return {
    notaConsultada,
    loading,
    error,

    consultarNota,
    limparConsulta,
  };
};

export const useClientes = () => {
  const { clientes, loading, error, setClientes, addCliente, updateCliente } =
    useNotasFiscaisStore();

  const carregarClientes = useCallback(async () => {
    useNotasFiscaisStore.getState().setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const clientesMock: Cliente[] = [
      ];

      setClientes(clientesMock);
    } catch (error) {
      useNotasFiscaisStore.getState().setError("Erro ao carregar clientes");
    } finally {
      useNotasFiscaisStore.getState().setLoading(false);
    }
  }, [setClientes]);

  return {
    clientes,
    loading,
    error,

    carregarClientes,
    adicionarCliente: addCliente,
    atualizarCliente: updateCliente,
  };
};
