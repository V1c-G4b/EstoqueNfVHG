import { Button } from "@/shared/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export function TestComponents() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Teste de Componentes</h1>

      {/* Teste Dialog */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Dialog Test</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Abrir Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Título do Dialog</DialogTitle>
              <DialogDescription>
                Este é um dialog de teste. Se você conseguir vê-lo, então está
                funcionando!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>Conteúdo do dialog aqui.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Teste Dropdown */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Dropdown Test</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Abrir Dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Teste Context Menu */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Context Menu Test</h2>
        <ContextMenu>
          <ContextMenuTrigger className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            Clique com o botão direito aqui
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Abrir</ContextMenuItem>
            <ContextMenuItem>Copiar</ContextMenuItem>
            <ContextMenuItem>Colar</ContextMenuItem>
            <ContextMenuItem>Deletar</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
}
