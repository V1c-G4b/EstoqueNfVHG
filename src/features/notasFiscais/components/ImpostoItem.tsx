import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Calculator } from "lucide-react";

interface ImpostoItemProps {
  item: any;
  index: number;
  onUpdateItem: (id: string, field: string, value: any) => void;
}

export function ImpostoItem({ item, index, onUpdateItem }: ImpostoItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Impostos - {item.nome || `Item ${index + 1}`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primeira linha - Campos principais */}
        <div className="grid grid-cols-11 gap-2 text-xs">
          <div className="space-y-1">
            <Label className="text-xs">QUANTIDADE *</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.quantidade}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "quantidade",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VALOR UN *</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.valorUnitario.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "valorUnitario",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VALOR R$</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs bg-muted"
              value={item.valorTotal.toFixed(2)}
              disabled
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">DESC. (R$)</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.desconto.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.desconto",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">DESC. (%)</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.descontoPerc.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.descontoPerc",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">IPI (%)</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.ipiPerc.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.ipiPerc",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">OUT DESP</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.outrasDesp.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.outrasDesp",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">CFOP</Label>
            <select
              className="h-8 text-xs border rounded px-2"
              value={item.tributacao.cfop}
              onChange={(e) =>
                onUpdateItem(item.id, "tributacao.cfop", e.target.value)
              }
            >
              <option value="1101">1101</option>
              <option value="5102">5102</option>
              <option value="5403">5403</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">CST/CSOSN</Label>
            <select
              className="h-8 text-xs border rounded px-2"
              value={item.tributacao.cstCsosn}
              onChange={(e) =>
                onUpdateItem(item.id, "tributacao.cstCsosn", e.target.value)
              }
            >
              <option value="101">101</option>
              <option value="102">102</option>
              <option value="103">103</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">CST PIS/COFINS</Label>
            <select
              className="h-8 text-xs border rounded px-2"
              value={item.tributacao.cstPisCofins}
              onChange={(e) =>
                onUpdateItem(item.id, "tributacao.cstPisCofins", e.target.value)
              }
            >
              <option value="99">99</option>
              <option value="01">01</option>
              <option value="02">02</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">CST IPI</Label>
            <select
              className="h-8 text-xs border rounded px-2"
              value={item.tributacao.cstIpi}
              onChange={(e) =>
                onUpdateItem(item.id, "tributacao.cstIpi", e.target.value)
              }
            >
              <option value="49">49</option>
              <option value="50">50</option>
              <option value="51">51</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">BC ICMS</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.bcIcms.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.bcIcms",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
        </div>

        {/* Segunda linha - ICMS */}
        <div className="grid grid-cols-11 gap-2 text-xs">
          <div className="space-y-1">
            <Label className="text-xs">ICMS (%)</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.aliquota.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.icms.aliquota",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs flex items-center gap-1">
              VLR ICMS
              <Calculator className="h-3 w-3 text-blue-500" />
            </Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs bg-blue-50 border-blue-200"
              value={item.tributacao.icms.valorIcms.toFixed(2)}
              disabled
              title="Valor calculado automaticamente: Base ICMS × Alíquota ÷ 100"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VLR ICMS/DESON</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.valorIcmsDesonerado.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.icms.valorIcmsDesonerado",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">MVA ST</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.mvaSt.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.icms.mvaSt",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">BC ICMS ST</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.bcIcmsSt.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.icms.bcIcmsSt",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">ICMS ST (%)</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.icmsStPerc.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.icms.icmsStPerc",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VLR ICMS ST</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.valorIcmsSt.toFixed(2)}
              disabled
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">BC FCP ST</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.bcFcpSt.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.icms.bcFcpSt",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VL FCP ST</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.icms.valorFcpSt.toFixed(2)}
              disabled
            />
          </div>
        </div>

        {/* Terceira seção - Valores */}
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="space-y-1">
            <Label className="text-xs">VL PRODUTOS</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.valorProdutos.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.valorProdutos",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">DESCONTO</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.desconto2.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.desconto2",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VALOR SEGURO</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.valorSeguro.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.valorSeguro",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VALOR REPASSE</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.valorRepasse.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.valorRepasse",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">IMPOSTO IMPORTAÇÃO</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.impostoImportacao.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.impostoImportacao",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">OUT DESPESAS</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.outDespesas.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.outDespesas",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
        </div>

        {/* Quarta seção - ICMS Desonerado e Total */}
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <Label className="text-xs">ICMS DESONERADO</Label>
            <select
              className="h-8 text-xs border rounded px-2 w-full"
              value={item.tributacao.icmsDesonerado}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.icmsDesonerado",
                  e.target.value
                )
              }
            >
              <option value="NÃO">NÃO</option>
              <option value="SIM">SIM</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">VALOR ICMS/DESON</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs"
              value={item.tributacao.valorIcmsDesonerado2.toFixed(2)}
              onChange={(e) =>
                onUpdateItem(
                  item.id,
                  "tributacao.valorIcmsDesonerado2",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">TOT NOTA</Label>
            <Input
              type="number"
              step="0.01"
              className="h-8 text-xs bg-yellow-50"
              value={item.tributacao.totalNota.toFixed(2)}
              disabled
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
