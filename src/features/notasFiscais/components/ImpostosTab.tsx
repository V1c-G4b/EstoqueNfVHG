import { ImpostoItem } from "./ImpostoItem";
import { ResumoFinanceiro } from "./ResumoFinanceiro";

interface ImpostosTabProps {
  items: any[];
  onUpdateItem: (id: string, field: string, value: any) => void;
  valorTotalProdutos: number;
  valorTotalIcms: number;
  valorTotalIpi: number;
  valorTotalIcmsSt: number;
  valorTotalDesconto: number;
  valorTotalNota: number;
}

export function ImpostosTab({
  items,
  onUpdateItem,
  valorTotalProdutos,
  valorTotalIcms,
  valorTotalIpi,
  valorTotalIcmsSt,
  valorTotalDesconto,
  valorTotalNota,
}: ImpostosTabProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <ImpostoItem
          key={item.id}
          item={item}
          index={index}
          onUpdateItem={onUpdateItem}
        />
      ))}

      <ResumoFinanceiro
        valorTotalProdutos={valorTotalProdutos}
        valorTotalIcms={valorTotalIcms}
        valorTotalIpi={valorTotalIpi}
        valorTotalIcmsSt={valorTotalIcmsSt}
        valorTotalDesconto={valorTotalDesconto}
        valorTotalNota={valorTotalNota}
        items={items}
      />
    </div>
  );
}
