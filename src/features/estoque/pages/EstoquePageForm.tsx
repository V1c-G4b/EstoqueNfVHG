import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { FormLayout } from "@/shared";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { Image as ImageIcon, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  nomeProduto: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  // codigoBarras: z.string().min(1, {
  //   message: "Código de barras é obrigatório.",
  // }),
  quantidade: z.number().min(0, {
    message: "Quantidade deve ser maior ou igual a zero.",
  }),
  imagemUrl: z.string().optional(),
  ativo: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export function EstoquePageForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeProduto: "",
      // codigoBarras: "",
      quantidade: 0,
      imagemUrl: "",
      ativo: true,
    },
  });

  // Simular busca de dados para edição
  useEffect(() => {
    if (isEditing && id) {
      setIsLoading(true);
      // TODO: Implementar busca do produto por ID
      // Simulando uma API call
      setTimeout(() => {
        const mockProduct = {
          nomeProduto: "Produto Exemplo",
          codigoBarras: "1234567890123",
          quantidade: 10,
          imagemUrl: "https://placehold.co/300x300",
          ativo: true,
        };

        form.reset(mockProduct);
        setImagePreview(mockProduct.imagemUrl || "");
        setIsLoading(false);
      }, 1000);
    }
  }, [isEditing, id, form]);

  // Converter arquivo para Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Upload de imagem local e simulação de storage
  const handleImageUpload = async (file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert("Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Arquivo muito grande. Máximo 5MB.");
      return;
    }

    setUploadingImage(true);
    try {
      // Converter para Base64 para preview local
      const base64 = await convertToBase64(file);
      setImagePreview(base64);

      // Simulando upload para storage (seria aqui que você faria upload real)
      // Por enquanto, vamos usar a URL do preview
      const mockStorageUrl = `https://storage.example.com/produtos/${Date.now()}_${
        file.name
      }`;

      // Simulando delay de upload
      await new Promise((resolve) => setTimeout(resolve, 1500));

      form.setValue("imagemUrl", mockStorageUrl);
      console.log("Imagem 'uploadada' para:", mockStorageUrl);
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      alert("Erro ao processar a imagem. Tente novamente.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageRemove = () => {
    setImagePreview("");
    form.setValue("imagemUrl", "");
  };

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    try {
      // Adicionar timestamps
      const productData = {
        ...values,
        dataCriacao: isEditing ? undefined : new Date(),
        dataAtualizacao: new Date(),
        id: isEditing ? id : `product_${Date.now()}`,
      };

      console.log("Dados do formulário:", productData);

      if (isEditing) {
        console.log("Atualizando produto ID:", id);
        // TODO: Implementar API de atualização
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular API call
      } else {
        console.log("Criando novo produto");
        // TODO: Implementar API de criação
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular API call
      }

      // Feedback de sucesso
      alert(`Produto ${isEditing ? "atualizado" : "criado"} com sucesso!`);

      // Redirecionar de volta para a lista
      navigate("/estoque/produtos");
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading && isEditing) {
    return (
      <FormLayout title="Gestão de Estoque - Carregando...">
        <div className="container py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando dados do produto...</p>
            </div>
          </div>
        </div>
      </FormLayout>
    );
  }

  return (
    <FormLayout title="Gestão de Estoque - Formulário de Produto">
      <div className="container py-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </h1>
          <p className="text-gray-600">
            {isEditing
              ? "Atualize as informações do produto"
              : "Adicione um novo produto ao estoque"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* Nome do Produto */}
            <FormField
              control={form.control}
              name="nomeProduto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto *</FormLabel>
                  <FormControl>
                    <Input placeholder="Produto XYZ..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome identificador do produto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Código de Barras */}
            {/* <FormField
              control={form.control}
              name="codigoBarras"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Barras *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 1234567890123"
                      {...field}
                      maxLength={13}
                    />
                  </FormControl>
                  <FormDescription>
                    Código único para identificação do produto (EAN-13).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantidade */}
              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>Quantidade em estoque.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Ativo */}
            </div>

            <FormField
              control={form.control}
              name="ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Produto Ativo</FormLabel>
                    <FormDescription>
                      Produto disponível para venda
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Upload de Imagem */}
            <div className="space-y-2">
              <Label>Imagem do Produto</Label>

              {/* Preview da Imagem */}
              {imagePreview && (
                <div className="relative block">
                  <img
                    src={imagePreview}
                    alt="Preview do produto"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 left-28 h-6 w-6 rounded-full p-0"
                    onClick={handleImageRemove}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Upload Input */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingImage}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  {uploadingImage ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {uploadingImage
                      ? "Processando..."
                      : "Clique para selecionar uma imagem"}
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, WebP até 5MB
                  </span>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading || uploadingImage}
                className="min-w-32"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isEditing ? "Atualizando..." : "Criando..."}
                  </div>
                ) : (
                  `${isEditing ? "Atualizar" : "Criar"} Produto`
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/estoque/produtos")}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
