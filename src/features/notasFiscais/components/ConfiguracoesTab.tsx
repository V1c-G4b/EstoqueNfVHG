import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";

interface TributacaoSettings {
  showIcms: boolean;
  showIpi: boolean;
  showPis: boolean;
  showCofins: boolean;
  showCsosn: boolean;
  showNcm: boolean;
  showCfop: boolean;
}

interface ConfiguracoesTabProps {
  tributacaoSettings: TributacaoSettings;
  onUpdateSettings: (settings: TributacaoSettings) => void;
}

export function ConfiguracoesTab({
  tributacaoSettings,
  onUpdateSettings,
}: ConfiguracoesTabProps) {
  const handleSettingChange = (
    key: keyof TributacaoSettings,
    value: boolean
  ) => {
    onUpdateSettings({
      ...tributacaoSettings,
      [key]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Tributação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Selecione quais informações tributárias deseja exibir no formulário:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-icms"
              checked={tributacaoSettings.showIcms}
              onCheckedChange={(checked) =>
                handleSettingChange("showIcms", checked as boolean)
              }
            />
            <Label htmlFor="show-icms">ICMS</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-ipi"
              checked={tributacaoSettings.showIpi}
              onCheckedChange={(checked) =>
                handleSettingChange("showIpi", checked as boolean)
              }
            />
            <Label htmlFor="show-ipi">IPI</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-pis"
              checked={tributacaoSettings.showPis}
              onCheckedChange={(checked) =>
                handleSettingChange("showPis", checked as boolean)
              }
            />
            <Label htmlFor="show-pis">PIS</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-cofins"
              checked={tributacaoSettings.showCofins}
              onCheckedChange={(checked) =>
                handleSettingChange("showCofins", checked as boolean)
              }
            />
            <Label htmlFor="show-cofins">COFINS</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-ncm"
              checked={tributacaoSettings.showNcm}
              onCheckedChange={(checked) =>
                handleSettingChange("showNcm", checked as boolean)
              }
            />
            <Label htmlFor="show-ncm">NCM</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-cfop"
              checked={tributacaoSettings.showCfop}
              onCheckedChange={(checked) =>
                handleSettingChange("showCfop", checked as boolean)
              }
            />
            <Label htmlFor="show-cfop">CFOP</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-csosn"
              checked={tributacaoSettings.showCsosn}
              onCheckedChange={(checked) =>
                handleSettingChange("showCsosn", checked as boolean)
              }
            />
            <Label htmlFor="show-csosn">CSOSN</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
