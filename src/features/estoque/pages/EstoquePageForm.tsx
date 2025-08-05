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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  codigoBarras: z.string().min(1, {
    message: "Código de barras é obrigatório.",
  }),
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
      nome: "",
      codigoBarras: "",
      quantidade: 0,
      imagemUrl: "",
      ativo: true,
    },
  });

  useEffect(() => {
    if (isEditing && id) {
      setIsLoading(true);

      setTimeout(() => {
        const mockProduct = {
          nome: "Produto Exemplo",
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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

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
      const base64 = await convertToBase64(file);
      setImagePreview(base64);
      const mockStorageUrl = `https://storage.example.com/produtos/${Date.now()}_${
        file.name
      }`;

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
      const productData = {
        ...values,
        dataCriacao: isEditing ? undefined : new Date(),
        dataAtualizacao: new Date(),
        id: isEditing ? id : `product_${Date.now()}`,
      };

      console.log("Dados do formulário:", productData);

      if (isEditing) {
        console.log("Atualizando produto ID:", id);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        console.log("Criando novo produto");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      alert(`Produto ${isEditing ? "atualizado" : "criado"} com sucesso!`);

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
        <div className="container max-w-4xl mx-auto py-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">
                Carregando dados do produto...
              </p>
            </div>
          </div>
        </div>
      </FormLayout>
    );
  }

  return (
    <FormLayout
      title="Gestão de Estoque - Formulário de Produto"
      maxWidth="full"
    >
      <div className="container max-w-6xl mx-auto py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </h1>
          <p className="text-gray-600 text-lg">
            {isEditing
              ? "Atualize as informações do produto"
              : "Adicione um novo produto ao estoque"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-3">
                Informações Básicas
              </h2>

              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Nome do Produto *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do produto..."
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Nome identificador do produto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codigoBarras"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Código de Barras *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o código de barras..."
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Código único de identificação do produto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="quantidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Quantidade *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          className="h-11"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Quantidade em estoque.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-center">
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Produto Ativo
                          </FormLabel>
                          <FormDescription className="text-xs text-gray-500">
                            Produto disponível para venda
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-3">
                Imagem do Produto
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="space-y-2">
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview do produto"
                          className="w-48 h-48 object-cover rounded-lg border shadow-sm"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 shadow-lg"
                          onClick={handleImageRemove}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Selecionar Imagem
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100">
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
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      {uploadingImage ? (
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      ) : (
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                      )}
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-gray-700">
                          {uploadingImage
                            ? "Processando..."
                            : "Clique para selecionar uma imagem"}
                        </span>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, WebP até 5MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/estoque/produtos")}
                  disabled={isLoading}
                  className="h-11 px-8"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || uploadingImage}
                  className="h-11 px-8 min-w-36"
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
              </div>
            </div>
          </form>
        </Form>
      </div>
    </FormLayout>
  );
}
