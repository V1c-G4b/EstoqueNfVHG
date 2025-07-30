import { useProdutos } from "@/shared/hooks";
import { useEffect } from "react";

export function EstoqueDebugger() {
  const {
    produtos,
    produtosAtivos,
    produtosBaixoEstoque,
    totalProdutos,
    valorTotalEstoque,
    carregarProdutos,
  } = useProdutos();

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  useEffect(() => {
    console.log("=== ESTOQUE DEBUGGER ===");
    console.log("Produtos total:", produtos.length);
    console.log("Produtos ativos:", produtosAtivos.length);
    console.log("Produtos baixo estoque:", produtosBaixoEstoque.length);
    console.log("Total produtos (função):", totalProdutos);
    console.log("Valor total:", valorTotalEstoque);

    console.log("=== DETALHES DOS PRODUTOS ===");
    produtos.forEach((produto, index) => {
      console.log(`${index + 1}. ${produto.nome}:`);
      console.log(`   - Ativo: ${produto.ativo}`);
      console.log(`   - Quantidade: ${produto.quantidade}`);
      console.log(`   - Estoque Mínimo: ${produto.estoqueMinimo}`);
      console.log(
        `   - Baixo Estoque: ${
          produto.ativo && produto.quantidade <= produto.estoqueMinimo
        }`
      );
    });
    console.log("========================");
  }, [
    produtos,
    produtosAtivos,
    produtosBaixoEstoque,
    totalProdutos,
    valorTotalEstoque,
  ]);

  return (
    <div className="p-4 bg-gray-100 m-4 rounded">
      <h3 className="font-bold mb-2">Debug Estoque:</h3>
      <p>Total: {produtos.length}</p>
      <p>Ativos: {produtosAtivos.length}</p>
      <p>Baixo Estoque: {produtosBaixoEstoque.length}</p>
      <p>Valor Total: R$ {valorTotalEstoque.toFixed(2)}</p>
    </div>
  );
}
