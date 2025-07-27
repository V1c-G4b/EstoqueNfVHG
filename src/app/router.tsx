import { EstoquePageForm } from "@/features/estoque/pages/EstoquePageForm";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { EstoquePage } from "../features/estoque/pages/EstoquePage";
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
        element: <DashboardPage />,
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
        ],
      },
      {
        path: "notas-fiscais",
        element: (
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Notas Fiscais
              </h1>
              <p className="text-gray-600">Página em desenvolvimento...</p>
            </div>
          </div>
        ),
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
