export const notasFiscaisRoutes = {
  list: "/notas-fiscais",
  emitir: "/notas-fiscais/emitir",
  consultar: "/notas-fiscais/consultar",
  view: "/notas-fiscais/:id",
  edit: "/notas-fiscais/:id/editar",
} as const;

export type NotasFiscaisRoute =
  (typeof notasFiscaisRoutes)[keyof typeof notasFiscaisRoutes];
