import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { useProdutos } from "./shared/hooks/useEstoque";
import { useNotasFiscais } from "./shared/hooks/useNotasFiscais";
import "./styles/app.css";

function DataInitializer() {
  const { carregarProdutos } = useProdutos();
  const { carregarNotasFiscais } = useNotasFiscais();

  useEffect(() => {
    carregarProdutos();
    carregarNotasFiscais();
  }, [carregarProdutos, carregarNotasFiscais]);

  return null;
}

function App() {
  return (
    <>
      <DataInitializer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
