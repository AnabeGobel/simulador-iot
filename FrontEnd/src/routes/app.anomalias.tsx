import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Painel, SeveridadeBadge } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { getAnomalias, getLimites, type LimiteConfiguravel } from "@/services/dataService";
import { useRealtimePolling } from "@/hooks/use-realtime-polling";
import type { Anomalia, Severidade } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/anomalias")({
  head: () => ({
    meta: [
      { title: "Anomalias — SIMIE-Caála" },
      { name: "description", content: "Deteção de sobretensão, sobrecorrente, temperatura elevada e anomalias estruturais." },
      { property: "og:title", content: "Anomalias — SIMIE-Caála" },
      { property: "og:description", content: "Análise e classificação de severidade das anomalias." },
    ],
  }),
  component: Anomalias,
});

const filtros: (Severidade | "TODAS")[] = ["TODAS", "CRITICO", "ATENCAO", "NORMAL"];

function formatarLimite(l: LimiteConfiguravel) {
  if (l.valor_minimo != null && l.valor_maximo != null) return `${l.valor_minimo} – ${l.valor_maximo} ${l.unidade}`;
  if (l.valor_maximo != null) return `máx. ${l.valor_maximo} ${l.unidade}`;
  if (l.valor_minimo != null) return `mín. ${l.valor_minimo} ${l.unidade}`;
  return "—";
}

function Anomalias() {
  const [filtro, setFiltro] = useState<Severidade | "TODAS">("TODAS");
  const [todas, setTodas] = useState<Anomalia[]>([]);
  const [limites, setLimites] = useState<LimiteConfiguravel[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscarDados = async (mostrarCarregamento = false) => {
    if (mostrarCarregamento) setCarregando(true);
    try {
      const [anomaliasData, limitesData] = await Promise.all([getAnomalias(), getLimites()]);
      setTodas(anomaliasData);
      setLimites(limitesData);
    } catch {
      toast.error("Erro ao carregar as anomalias do servidor.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    void buscarDados(true);
  }, []);

  useRealtimePolling(buscarDados);

  const lista = todas.filter((a) => filtro === "TODAS" || a.severidade === filtro);

  return (
    <AppShell titulo="Anomalias" descricao="Comparação dos valores medidos com os limites configurados">
      <div className="flex flex-wrap gap-2">
        {filtros.map((f) => (
          <Button key={f} size="sm" variant={filtro === f ? "default" : "outline"} onClick={() => setFiltro(f)}>
            {f === "TODAS" ? "Todas" : f === "CRITICO" ? "Crítico" : f === "ATENCAO" ? "Atenção" : "Normal"}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Painel titulo={`${lista.length} anomalias detectadas`} className="xl:col-span-2">
          {carregando ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> A carregar anomalias…
            </div>
          ) : (
            <ul className="space-y-3">
              {lista.map((a) => (
                <li key={a.id} className="rounded-lg border border-border p-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{a.tipo}</p>
                      <p className="truncate text-xs text-muted-foreground">{a.estacao} · {a.data}</p>
                    </div>
                    <SeveridadeBadge nivel={a.severidade} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{a.descricao}</p>
                </li>
              ))}
              {lista.length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">Nenhuma anomalia com este filtro.</li>
              )}
            </ul>
          )}
        </Painel>

        <Painel titulo="Limites configurados">
          <ul className="divide-y divide-border text-sm">
            {limites.map((l) => (
              <li key={l.parametro} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-2.5">
                <span className="truncate text-muted-foreground">{l.parametro}</span>
                <span className="font-semibold">{formatarLimite(l)}</span>
              </li>
            ))}
            {limites.length === 0 && !carregando && (
              <li className="py-4 text-center text-xs text-muted-foreground">Sem limites configurados.</li>
            )}
          </ul>
        </Painel>
      </div>
    </AppShell>
  );
}
