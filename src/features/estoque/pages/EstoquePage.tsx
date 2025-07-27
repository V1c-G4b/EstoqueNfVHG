import { PageLayout } from "@/shared/components/PageLayout";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns, type Produto } from "../components/column";
import { DataTable } from "../components/data-table";
import { XMLImportDialog } from "../components/dialogProduct";

export function EstoquePage() {
  const [data, setData] = useState<Produto[]>([]);
  const navigate = useNavigate();

  async function getData(): Promise<Produto[]> {
    return [
      {
        id: "728ed52f",
        nomeProduto: "Smartphone Samsung Galaxy S24",
        codigoBarras: "7891234567890",
        quantidade: 15,
        imagemUrl: "https://placehold.co/600x400",
        ativo: true,
        dataCriacao: new Date("2024-01-15"),
        dataAtualizacao: new Date("2024-12-20"),
      },
      {
        id: "489e1d42",
        nomeProduto: "Notebook Dell Inspiron 15",
        codigoBarras: "7891234567891",
        quantidade: 8,
        imagemUrl: "https://placehold.co/600x400",
        ativo: true,
        dataCriacao: new Date("2024-02-10"),
        dataAtualizacao: new Date("2024-12-18"),
      },
      {
        id: "a8f3c7e1",
        nomeProduto: "Mouse Logitech MX Master 3",
        codigoBarras: "7891234567892",
        quantidade: 25,
        imagemUrl: "https://placehold.co/600x400",
        ativo: true,
        dataCriacao: new Date("2024-03-05"),
        dataAtualizacao: new Date("2024-12-15"),
      },
      {
        id: "b2d1f9a3",
        nomeProduto: "Teclado Mecânico Corsair K95",
        codigoBarras: "7891234567893",
        quantidade: 0,
        imagemUrl: "https://placehold.co/600x400",
        ativo: false,
        dataCriacao: new Date("2024-04-12"),
        dataAtualizacao: new Date("2024-12-10"),
      },
      {
        id: "c5e8a2b4",
        nomeProduto: "Monitor LG UltraWide 34'",
        codigoBarras: "7891234567894",
        quantidade: 5,
        imagemUrl: "https://placehold.co/600x400",
        ativo: true,
        dataCriacao: new Date("2024-05-20"),
        dataAtualizacao: new Date("2024-12-22"),
      },
      {
        id: "d7f4b8c6",
        nomeProduto: "Headset HyperX Cloud III",
        codigoBarras: "7891234567895",
        quantidade: 12,
        imagemUrl: "https://placehold.co/600x400",
        ativo: true,
        dataCriacao: new Date("2024-06-08"),
        dataAtualizacao: new Date("2024-12-19"),
      },
      {
        id: "e9a6d1f8",
        nomeProduto: "Webcam Logitech C920",
        codigoBarras: "7891234567896",
        quantidade: 3,
        imagemUrl: "https://placehold.co/600x400",
        ativo: true,
        dataCriacao: new Date("2024-07-03"),
        dataAtualizacao: new Date("2024-12-21"),
      },
      {
        id: "f1c8e3a9",
        nomeProduto: "SSD Kingston NV2 1TB",
        codigoBarras: "7891234567897",
        quantidade: 18,
        imagemUrl: undefined,
        ativo: true,
        dataCriacao: new Date("2024-08-15"),
        dataAtualizacao: new Date("2024-12-23"),
      },
    ];
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  });

  return (
    <PageLayout
      title="Gestão de Estoque"
      description="Controle e monitoramento do seu estoque de produtos"
      actions={
        <>
          <XMLImportDialog onImport={(data) => console.log(data)} />
          <Button
            variant="default"
            onClick={() => navigate("/estoque/produtos/novo")}
            className="ml-2"
          >
            Adicionar Produto
          </Button>
        </>
      }
    >
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </PageLayout>
  );
}
