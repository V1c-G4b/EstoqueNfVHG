import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  sku: z.string().min(1, "SKU é obrigatório"),
  preco: z.number().positive("Preço deve ser positivo"),
  quantidade: z.number().min(0, "Quantidade não pode ser negativa"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  fornecedor: z.string().optional(),
});

export const movimentacaoSchema = z.object({
  produtoId: z.string().min(1, "Produto é obrigatório"),
  tipo: z.enum(["entrada", "saida"], {
    message: "Tipo deve ser entrada ou saída",
  }),
  quantidade: z.number().positive("Quantidade deve ser positiva"),
  motivo: z.string().min(1, "Motivo é obrigatório"),
  observacoes: z.string().optional(),
});

export type ProdutoFormData = z.infer<typeof produtoSchema>;
export type MovimentacaoFormData = z.infer<typeof movimentacaoSchema>;
