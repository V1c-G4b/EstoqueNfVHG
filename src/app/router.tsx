import { DashboardPageWithZustand } from "@/features/dashboard/pages/DashboardPageWithZustand";
import { EstoquePage } from "@/features/estoque/pages/EstoquePage";
import { EstoquePageForm } from "@/features/estoque/pages/EstoquePageForm";
import { NovaUnidadeEstoquePage } from "@/features/estoque/pages/NovaUnidadeEstoquePage";
import { TransferenciaEstoquePage } from "@/features/estoque/pages/TransferenciaEstoquePage";
import { TransferenciasListPage } from "@/features/estoque/pages/TransferenciasListPage";
import { UnidadesEstoquePage } from "@/features/estoque/pages/UnidadesEstoquePage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth";
import {
  EmitirNotaFiscalPage,
  NotasFiscaisPage,
} from "../features/notasFiscais";
import { ConsultarNotaFiscalPage } from "../features/notasFiscais/pages/ConsultarNotaFiscalPage";
import { AppLayout, ProtectedRoute } from "../shared/components";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPageWithZustand />,
      },
      {
        path: "estoque",
        children: [
          {
            index: true,
            element: <Navigate to="produtos" replace />,
          },
          {
            path: "produtos",
            element: <EstoquePage />,
          },
          {
            path: "produtos/novo",
            element: <EstoquePageForm />,
          },
          {
            path: "produtos/editar/:id",
            element: <EstoquePageForm />,
          },
          {
            path: "transferencias",
            element: <TransferenciasListPage />,
          },
          {
            path: "transferencias/nova",
            element: <TransferenciaEstoquePage />,
          },
          {
            path: "transferencias/:id",
            element: (
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Detalhes da Transferência
                  </h1>
                  <p className="text-gray-600">Página em desenvolvimento...</p>
                </div>
              </div>
            ),
          },
          {
            path: "unidades",
            element: <UnidadesEstoquePage />,
          },
          {
            path: "unidades/nova",
            element: <NovaUnidadeEstoquePage />,
          },
          {
            path: "unidades/editar/:id",
            element: <NovaUnidadeEstoquePage />,
          },
        ],
      },
      {
        path: "notas-fiscais",
        children: [
          {
            index: true,
            element: <NotasFiscaisPage />,
          },
          {
            path: "emitir",
            element: <EmitirNotaFiscalPage />,
          },
          {
            path: "consultar",
            element: <ConsultarNotaFiscalPage />,
          },
        ],
      },
      {
        path: "usuarios",
        element: (
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Usuários
              </h1>
              <p className="text-gray-600">Página em desenvolvimento...</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
