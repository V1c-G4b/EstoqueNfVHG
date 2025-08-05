import { FormLayout } from "@/shared/components/PageLayout";
import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ArrowLeft, Calculator, FileText, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import modular components
import { ConfiguracoesTab } from "../components/ConfiguracoesTab";
import { DadosGeraisTab } from "../components/DadosGeraisTab";
import { ImpostosTab } from "../components/ImpostosTab";
import { ProdutosTab } from "../components/ProdutosTab";

// Import types and utilities
import { ItemNota, TributacaoItem } from "../types/tributacao";

interface TributacaoSettings {
  showIcms: boolean;
  showIpi: boolean;
  showPis: boolean;
  showCofins: boolean;
  showCsosn: boolean;
  showNcm: boolean;
  showCfop: boolean;
}

export function EmitirNotaFiscalPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tributacaoSettings, setTributacaoSettings] =
    useState<TributacaoSettings>({
      showIcms: true,
      showIpi: false,
      showPis: true,
      showCofins: true,
      showCsosn: true,
      showNcm: true,
      showCfop: true,
    });

  const createDefaultTributacao = (): TributacaoItem => ({
    quantidade: 1,
    valorUnitario: 0,
    valorTotal: 0,
    desconto: 0,
    descontoPerc: 0,
    ipi: 0,
    ipiPerc: 0,
    outrasDesp: 0,
    cfop: "5102",
    cstCsosn: "102",
    cstPisCofins: "99",
    cstIpi: "49",
    bcIcms: 0,

    icms: {
      enabled: true,
      aliquota: 0,
      valor: 0,
      valorIcms: 0,
      valorIcmsDesonerado: 0,
      mvaSt: 0,
      bcIcmsSt: 0,
      icmsSt: 0,
      icmsStPerc: 0,
      valorIcmsSt: 0,
      bcFcpSt: 0,
      valorFcpSt: 0,
    },

    valorProdutos: 0,
    desconto2: 0,
    valorSeguro: 0,
    valorRepasse: 0,
    impostoImportacao: 0,
    outDespesas: 0,

    icmsDesonerado: "NÃO",
    valorIcmsDesonerado2: 0,

    totalNota: 180.0,

    ncm: "",
  });

  const [items, setItems] = useState<ItemNota[]>([
    {
      id: "1",
      produtoId: "",
      nome: "",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      tributacao: createDefaultTributacao(),
    },
  ]);

  const recalculateItem = (item: ItemNota): ItemNota => {
    const updatedItem = { ...item };

    updatedItem.valorTotal = updatedItem.quantidade * updatedItem.valorUnitario;
    updatedItem.tributacao.valorTotal = updatedItem.valorTotal;
    updatedItem.tributacao.quantidade = updatedItem.quantidade;
    updatedItem.tributacao.valorUnitario = updatedItem.valorUnitario;

    const valorComDesconto =
      updatedItem.valorTotal -
      (updatedItem.valorTotal * updatedItem.tributacao.descontoPerc) / 100 -
      updatedItem.tributacao.desconto;

    if (updatedItem.tributacao.icms.enabled) {
      updatedItem.tributacao.bcIcms = valorComDesconto;
      updatedItem.tributacao.icms.valorIcms =
        (updatedItem.tributacao.bcIcms * updatedItem.tributacao.icms.aliquota) /
        100;
      updatedItem.tributacao.icms.valor = updatedItem.tributacao.icms.valorIcms;
    }

    if (updatedItem.tributacao.icms.mvaSt > 0) {
      updatedItem.tributacao.icms.bcIcmsSt =
        valorComDesconto * (1 + updatedItem.tributacao.icms.mvaSt / 100);
      updatedItem.tributacao.icms.valorIcmsSt =
        (updatedItem.tributacao.icms.bcIcmsSt *
          updatedItem.tributacao.icms.icmsStPerc) /
        100;
    }

    updatedItem.tributacao.ipi =
      (updatedItem.valorTotal * updatedItem.tributacao.ipiPerc) / 100;

    if (updatedItem.tributacao.icms.bcFcpSt > 0) {
      updatedItem.tributacao.icms.valorFcpSt =
        (updatedItem.tributacao.icms.bcFcpSt * 2) / 100;
    }

    updatedItem.tributacao.totalNota =
      updatedItem.valorTotal +
      updatedItem.tributacao.ipi +
      updatedItem.tributacao.outrasDesp +
      updatedItem.tributacao.valorSeguro;

    return updatedItem;
  };

  const updateItem = (
    id: string,
    field: keyof ItemNota | string,
    value: any
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item };

          if (field.startsWith("tributacao.")) {
            const tributacaoField = field.split(".")[1];
            const subField = field.split(".")[2];

            if (subField) {
              (updatedItem.tributacao as any)[tributacaoField][subField] =
                value;
            } else {
              (updatedItem.tributacao as any)[tributacaoField] = value;
            }
          } else {
            (updatedItem as any)[field] = value;
          }

          const fieldsToRecalculate = [
            "quantidade",
            "valorUnitario",
            "tributacao.desconto",
            "tributacao.descontoPerc",
            "tributacao.ipiPerc",
            "tributacao.icms.aliquota",
            "tributacao.icms.mvaSt",
            "tributacao.icms.icmsStPerc",
            "tributacao.outrasDesp",
            "tributacao.valorSeguro",
          ];

          if (fieldsToRecalculate.some((f) => field.startsWith(f))) {
            return recalculateItem(updatedItem);
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    const newItem: ItemNota = {
      id: Date.now().toString(),
      produtoId: "",
      nome: "",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      tributacao: createDefaultTributacao(),
    };

    const calculatedItem = recalculateItem(newItem);
    setItems([...items, calculatedItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    console.log("Emitindo nota fiscal...", items);
    setTimeout(() => {
      setLoading(false);
      navigate("/notas-fiscais");
    }, 2000);
  };

  const valorTotalProdutos = items.reduce(
    (acc, item) => acc + item.valorTotal,
    0
  );
  const valorTotalIcms = items.reduce(
    (acc, item) => acc + (item.tributacao.icms.valorIcms || 0),
    0
  );
  const valorTotalIpi = items.reduce(
    (acc, item) => acc + (item.tributacao.ipi || 0),
    0
  );
  const valorTotalIcmsSt = items.reduce(
    (acc, item) => acc + (item.tributacao.icms.valorIcmsSt || 0),
    0
  );
  const valorTotalDesconto = items.reduce(
    (acc, item) => acc + (item.tributacao.desconto || 0),
    0
  );
  const valorTotalNota =
    valorTotalProdutos + valorTotalIpi - valorTotalDesconto;

  // Cálculos dos totais da nota fiscal
  return (
    <FormLayout
      title="Emitir Nota Fiscal"
      description="Preencha os dados para emitir uma nova nota fiscal eletrônica"
      actions={
        <Button variant="outline" onClick={() => navigate("/notas-fiscais")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="dados-gerais" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="dados-gerais"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="produtos" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="impostos" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Impostos
            </TabsTrigger>
            <TabsTrigger
              value="configuracoes"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dados-gerais">
            <DadosGeraisTab />
          </TabsContent>

          <TabsContent value="produtos">
            <ProdutosTab
              items={items}
              onUpdateItem={updateItem}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              valorTotalNota={valorTotalNota}
            />
          </TabsContent>

          <TabsContent value="impostos">
            <ImpostosTab
              items={items}
              onUpdateItem={updateItem}
              valorTotalProdutos={valorTotalProdutos}
              valorTotalIcms={valorTotalIcms}
              valorTotalIpi={valorTotalIpi}
              valorTotalIcmsSt={valorTotalIcmsSt}
              valorTotalDesconto={valorTotalDesconto}
              valorTotalNota={valorTotalNota}
            />
          </TabsContent>

          <TabsContent value="configuracoes">
            <ConfiguracoesTab
              tributacaoSettings={tributacaoSettings}
              onUpdateSettings={setTributacaoSettings}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/notas-fiscais")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Emitindo..." : "Emitir Nota Fiscal"}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
