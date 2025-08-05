import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export function DadosGeraisTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados do Cliente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clienteNome">Nome/Razão Social *</Label>
              <Input id="clienteNome" placeholder="Nome do cliente" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clienteDocumento">CPF/CNPJ *</Label>
              <Input
                id="clienteDocumento"
                placeholder="000.000.000-00"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clienteEmail">Email</Label>
              <Input
                id="clienteEmail"
                type="email"
                placeholder="cliente@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clienteTelefone">Telefone</Label>
              <Input id="clienteTelefone" placeholder="(11) 99999-9999" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endereço do Cliente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP *</Label>
              <Input id="cep" placeholder="00000-000" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="logradouro">Logradouro *</Label>
              <Input
                id="logradouro"
                placeholder="Rua, Avenida, etc."
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero">Número *</Label>
              <Input id="numero" placeholder="123" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento</Label>
              <Input id="complemento" placeholder="Apto, Sala, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro *</Label>
              <Input id="bairro" placeholder="Nome do bairro" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input id="cidade" placeholder="Nome da cidade" required />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorFrete">Valor do Frete</Label>
              <Input
                id="valorFrete"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorDesconto">Valor do Desconto</Label>
              <Input
                id="valorDesconto"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <textarea
              id="observacoes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Informações adicionais sobre a nota fiscal..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
