// import { Badge } from "@/shared/components/ui/badge";
// import { Button } from "@/shared/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/shared/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/shared/components/ui/dialog";
// import {
//   Activity,
//   Barcode,
//   Calendar,
//   Eye,
//   Package,
// } from "lucide-react";
// import { useState } from "react";

// import type { Produto } from "./column";

// interface ProductViewModalProps {
//   produto: Produto;
// }

// export function ProductViewModal({ produto }: ProductViewModalProps) {
//   const [open, setOpen] = useState(false);


//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat("pt-BR", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="size-8 p-0"
//           title="Visualizar produto"
//         >
//           <Eye className="size-4" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Package className="size-5" />
//             {produto.nomeProduto}
//           </DialogTitle>
//           <DialogDescription>
//             Visualização detalhada e análise de movimentação do produto
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-6">
//           {/* Informações Básicas */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Imagem do Produto */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-sm">Imagem</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {produto.imagemUrl ? (
//                   <img
//                     src={produto.imagemUrl}
//                     alt={produto.nomeProduto}
//                     className="w-full h-48 object-cover rounded-lg border"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-100 rounded-lg border flex items-center justify-center">
//                     <Package className="size-12 text-gray-400" />
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-sm">Informações</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <Barcode className="size-4 text-gray-500" />
//                   <span className="text-sm font-medium">Código:</span>
//                   <span className="text-sm text-gray-600">
//                     {produto.codigoBarras}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Package className="size-4 text-gray-500" />
//                   <span className="text-sm font-medium">Estoque:</span>
//                   <Badge
//                     variant={
//                       produto.quantidade > 10
//                         ? "default"
//                         : produto.quantidade > 0
//                         ? "secondary"
//                         : "destructive"
//                     }
//                   >
//                     {produto.quantidade} unidades
//                   </Badge>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Activity className="size-4 text-gray-500" />
//                   <span className="text-sm font-medium">Status:</span>
//                   <Badge variant={produto.ativo ? "default" : "secondary"}>
//                     {produto.ativo ? "Ativo" : "Inativo"}
//                   </Badge>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Calendar className="size-4 text-gray-500" />
//                   <span className="text-sm font-medium">Criado:</span>
//                   <span className="text-sm text-gray-600">
//                     {formatDate(produto.dataCriacao)}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Calendar className="size-4 text-gray-500" />
//                   <span className="text-sm font-medium">Atualizado:</span>
//                   <span className="text-sm text-gray-600">
//                     {formatDate(produto.dataAtualizacao)}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => setOpen(false)}>
//             Fechar
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
