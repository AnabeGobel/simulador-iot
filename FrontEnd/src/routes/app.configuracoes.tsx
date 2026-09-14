import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Painel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { getLimites, atualizarLimites, type LimiteConfiguravel } from "@/services/dataService";
import { toast } from "sonner";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — SIMIE-Caála" },
      { name: "description", content: "Limites de deteção, regras de alertas e definições do sistema." },
      { property: "og:title", content: "Configurações — SIMIE-Caála" },
      { property: "og:description", content: "Configure limites, alertas e o tema do sistema." },
    ],
  }),
  component: Configuracoes,
});

function Configuracoes() {
  const { pode, podeEditar, carregado } = useAuth();
  const { tema, alternar } = useTheme();
  const navigate = useNavigate();
  const [limites, setLimites] = useState<LimiteConfiguravel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const podeGuardar = podeEditar("configuracoes");

  useEffect(() => {
    if (carregado && !pode("configuracoes")) navigate({ to: "/app", replace: true });
  }, [carregado, pode, navigate]);

  useEffect(() => {
    (async () => {
      setCarregando(true);
      try {
        setLimites(await getLimites());
      } catch {
        toast.error("Erro ao carregar os limites do servidor.");
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  const atualizarCampo = (parametro: string, campo: "valor_minimo" | "valor_maximo", valorTexto: string) => {
    const valor = valorTexto === "" ? null : Number(valorTexto);
    setLimites((ls) => ls.map((l) => (l.parametro === parametro ? { ...l, [campo]: valor } : l)));
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await atualizarLimites(limites);
      toast.success("Limites guardados. Já se aplicam à próxima leitura de telemetria.");
    } catch (err: any) {
      toast.error(err?.response?.data?.erro || "Erro ao guardar os limites.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <AppShell titulo="Configurações" descricao="Limites, alertas e definições do sistema">
      <div className="grid gap-4 xl:grid-cols-2">
        <Painel titulo="Limites de deteção">
          {carregando ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> A carregar limites…
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-xs text-muted-foreground">
                Estes valores são usados automaticamente sempre que chega uma nova leitura de telemetria,
                para decidir se gera uma anomalia/alerta e com que severidade. Deixa em branco o mínimo
                ou o máximo se esse parâmetro não tiver esse limite (ex: corrente só tem máximo).
              </p>
              {limites.map((l) => (
                <div key={l.parametro} className="space-y-1.5">
                  <Label className="truncate">{l.parametro} ({l.unidade})</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-muted-foreground">Mínimo</span>
                      <Input
                        type="number"
                        value={l.valor_minimo ?? ""}
                        placeholder="Sem mínimo"
                        disabled={!podeGuardar}
                        onChange={(e) => atualizarCampo(l.parametro, "valor_minimo", e.target.value)}
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-muted-foreground">Máximo</span>
                      <Input
                        type="number"
                        value={l.valor_maximo ?? ""}
                        placeholder="Sem máximo"
                        disabled={!podeGuardar}
                        onChange={(e) => atualizarCampo(l.parametro, "valor_maximo", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {podeGuardar ? (
                <Button className="mt-2" onClick={handleGuardar} disabled={guardando}>
                  {guardando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Guardar limites
                </Button>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  Só um Administrador pode alterar os limites.
                </p>
              )}
            </div>
          )}
        </Painel>

        <div className="space-y-4">
          <Painel titulo="Sistema">
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="truncate">Tema escuro</span>
                <Switch checked={tema === "dark"} onCheckedChange={alternar} />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="truncate text-muted-foreground">Fonte de telemetria</span>
                <span className="font-medium">MQTT (HiveMQ Cloud)</span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="truncate text-muted-foreground">Base de dados</span>
                <span className="font-medium">Supabase</span>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="truncate text-muted-foreground">Rede IoT</span>
                <span className="font-medium">LoRaWAN</span>
              </div>
            </div>
          </Painel>
        </div>
      </div>
    </AppShell>
  );
}
