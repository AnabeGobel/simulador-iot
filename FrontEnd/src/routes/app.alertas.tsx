import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Eye, Loader2, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Painel, SeveridadeBadge } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "../services/api";
import { useRealtimePolling } from "@/hooks/use-realtime-polling";
import { toast } from "sonner";

export const Route = createFileRoute("/app/alertas")({
  head: () => ({
    meta: [
      { title: "Alertas — SIMIE-Caála" },
      { name: "description", content: "Alertas ativos e histórico gerado pela deteção de anomalias." },
      { property: "og:title", content: "Alertas — SIMIE-Caála" },
      { property: "og:description", content: "Consulte, filtre e resolva os alertas da rede." },
    ],
  }),
  component: Alertas,
});

interface AlertaApi {
  id: string;
  tipo: string;
  estacao: string;
  valor: string;
  limite: string;
  severidade: "NORMAL" | "ATENCAO" | "CRITICO";
  data: string;
  lido: boolean;
  resolvido: boolean;
}

function mapearAlertaApi(a: any): AlertaApi {
  // Dá suporte tanto a data_ocorrencia quanto a created_at
  const dataRaw = a.data_ocorrencia || a.created_at;

  return {
    id: String(a.id),
    tipo: a.tipo,
    estacao: a.estacoes?.codigo ? `${a.estacoes.codigo} (${a.estacoes.nome})` : a.estacao_id ?? "—",
    valor: a.valor != null ? String(a.valor) : "—",
    limite: a.limite != null ? String(a.limite) : "—",
    severidade: a.severidade ?? "ATENCAO",
    data: dataRaw ? new Date(dataRaw).toLocaleString("pt-PT") : "—",
    lido: !!a.lido,
    resolvido: !!a.resolvido,
  };
}

function Alertas() {
  const [lista, setLista] = useState<AlertaApi[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [aba, setAba] = useState("ativos");

  const buscarAlertas = async (mostrarCarregamento = false) => {
    if (mostrarCarregamento) setCarregando(true);
    try {
      const resposta = await api.get("/alertas");
      setLista((resposta.data ?? []).map(mapearAlertaApi));
    } catch (err) {
      toast.error("Erro ao carregar os alertas do servidor.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    void buscarAlertas(true);
  }, []);

  useRealtimePolling(buscarAlertas);

  const filtrados = lista.filter((a) =>
    aba === "ativos" ? !a.resolvido : aba === "historico" ? a.resolvido : true,
  );

  const marcarLido = async (id: string) => {
    try {
      await api.patch(`/alertas/${id}/lido`);
      setLista((l) => l.map((x) => (x.id === id ? { ...x, lido: true } : x)));
      toast.success("Alerta marcado como lido.");
    } catch {
      toast.error("Erro ao marcar alerta como lido.");
    }
  };

  const resolver = async (id: string) => {
    try {
      await api.patch(`/alertas/${id}/resolver`);
      setLista((l) => l.map((x) => (x.id === id ? { ...x, resolvido: true, lido: true } : x)));
      toast.success("Alerta marcado como resolvido.");
    } catch (err: any) {
      toast.error(err?.response?.data?.erro || "Erro ao resolver alerta.");
    }
  };

  return (
    <AppShell titulo="Alertas" descricao="Alertas gerados automaticamente pelas regras de limites">
      <div className="flex items-center justify-between gap-4">
        <Tabs value={aba} onValueChange={setAba}>
          <TabsList>
            <TabsTrigger value="ativos">Ativos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="todos">Todos</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button size="sm" variant="outline" onClick={() => buscarAlertas(true)} disabled={carregando}>
          <RefreshCw className={`mr-2 h-4 w-4 ${carregando ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      <Painel titulo={`${filtrados.length} alertas`} className="mt-4">
        {carregando ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> A carregar alertas…
          </div>
        ) : (
          <ul className="space-y-3">
            {filtrados.map((a) => (
              <li
                key={a.id}
                className={`rounded-lg border p-3 transition-colors ${
                  !a.lido ? "border-primary/50 bg-primary/5" : "border-border"
                }`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {a.tipo} — {a.estacao}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      Valor: {a.valor} · Limite: {a.limite} · {a.data}
                    </p>
                    <p className="mt-1 text-xs">
                      Estado:{" "}
                      <span className={a.resolvido ? "text-emerald-600 font-medium" : "text-destructive font-medium"}>
                        {a.resolvido ? "Resolvido" : "Não resolvido"}
                      </span>
                      {!a.lido && <span className="ml-2 font-medium text-primary">• Novo</span>}
                    </p>
                  </div>
                  <SeveridadeBadge nivel={a.severidade} />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={a.lido}
                    onClick={() => marcarLido(a.id)}
                  >
                    <Eye className="mr-1.5 h-3.5 w-3.5" /> Marcar como lido
                  </Button>
                  <Button
                    size="sm"
                    disabled={a.resolvido}
                    onClick={() => resolver(a.id)}
                  >
                    <Check className="mr-1.5 h-3.5 w-3.5" /> Resolver
                  </Button>
                </div>
              </li>
            ))}
            {filtrados.length === 0 && (
              <li className="py-8 text-center text-sm text-muted-foreground">
                Nenhum alerta encontrado nesta secção.
              </li>
            )}
          </ul>
        )}
      </Painel>
    </AppShell>
  );
}