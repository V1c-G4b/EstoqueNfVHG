import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface XMLImportDialogProps {
  onImport?: (data: { file?: File; url?: string }) => void;
}

export function XMLImportDialog({ onImport }: XMLImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file && url.trim()) {
      toast.error("Por favor, escolha apenas uma opção: arquivo ou URL.");
      return;
    }

    setIsLoading(true);

    try {
      const data = file ? { file } : { url: url.trim() };
      onImport?.(data);

      console.log("Importing data:", data);

      setFile(null);
      setUrl("");
      setIsOpen(false);
      toast.success("Importação iniciada com sucesso!");
    } catch (error) {
      toast.error(`Erro ao importar XML: ${error}`);
      toast.error("Erro ao processar o arquivo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUrl("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Importar XML</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Importar XML</DialogTitle>
            <DialogDescription>
              Faça upload do seu arquivo XML para importar os produtos.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="xml-file">Arquivo XML</Label>
              <Input
                id="xml-file"
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                disabled={isLoading}
                className="cursor-pointer"
              />
              {file && (
                <p className="text-sm text-green-600">
                  Arquivo selecionado: {file.name}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Certifique-se de que o arquivo XML esteja no formato correto para
              importação.
            </p>
            <p>Após o upload, os produtos serão adicionados ao estoque.</p>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isLoading}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading || (!file && !url.trim())}
            >
              {isLoading ? "Importando..." : "Importar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
