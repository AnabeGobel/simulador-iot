import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, Gauge, Loader2, RefreshCw, Thermometer, Zap } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Painel, StatCard, EstadoBadge } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getEstacoes,
  getTelemetriaEstacao,
  type EstacaoComEstado,
  type TelemetriaLeitura,
} from "@/services/dataService";
import { useRealtimePolling } from "@/hooks/use-realtime-polling";
import { toast } from "sonner";

export const Route = createFileRoute("/app/monitoramento")({
  head: () => ({
    meta: [
      { title: "Monitoramento — IoT Energia Caálá" },
      { name: "description", content: "Acompanhe tensão, corrente, temperatura, vibração e inclinação em tempo real." },
      { property: "og:title", content: "Monitoramento — IoT Energia Caálá" },
      { property: "og:description", content: "Dados em tempo real das estações IoT da Caála." },
    ],
  }),
  component: Monitoramento,
});

// Cada variável mostrada nos separadores corresponde a uma coluna real da
// tabela `telemetria` — nada aqui é gerado artificialmente.
const variaveis = [
  { id: "tensao", label: "Tensão", unidade: "V" },
  { id: "corrente", label: "Corrente", unidade: "A" },
  { id: "temperatura", label: "Temperatura", unidade: "°C" },
  { id: "vibracao", label: "Vibração", unidade: "g" },
  { id: "inclinacao", label: "Inclinação", unidade: "°" },
] as const;

const INTERVALO_ATUALIZACAO_MS = 15000;

function Monitoramento() {
  const [estacoes, setEstacoes] = useState<EstacaoComEstado[]>([]);
  const [codigo, setCodigo] = useState<string>("");
  const [historico, setHistorico] = useState<TelemetriaLeitura[]>([]);
  const [carregandoEstacoes, setCarregandoEstacoes] = useState(true);
  const [carregandoTelemetria, setCarregandoTelemetria] = useState(false);

  const estacao = estacoes.find((e) => e.codigo === codigo);

  const buscarEstacoes = async (mostrarCarregamento = false) => {
    if (mostrarCarregamento) setCarregandoEstacoes(true);
    try {
      const dados = await getEstacoes();
      setEstacoes(dados);
      setCodigo((atual) => atual || dados[0]?.codigo || "");
    } catch {
      toast.error("Erro ao carregar as estações.");
    } finally {
      if (mostrarCarregamento) setCarregandoEstacoes(false);
    }
  };

  useEffect(() => {
    void buscarEstacoes(true);
  }, []);

  useRealtimePolling(buscarEstacoes);

  const buscarHistorico = async (cod: string, mostrarCarregamento = false) => {
    if (!cod) return;
    if (mostrarCarregamento) setCarregandoTelemetria(true);
    try {
      const dados = await getTelemetriaEstacao(cod, 40);
      // A API devolve mais recente primeiro — para o gráfico queremos em
      // ordem cronológica crescente.
      setHistorico([...dados].reverse());
    } catch {
      toast.error("Erro ao carregar a telemetria desta estação.");
    } finally {
      setCarregandoTelemetria(false);
    }
  };

  useEffect(() => {
    if (!codigo) return;
    void buscarHistorico(codigo, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigo]);

  useRealtimePolling(() => buscarHistorico(codigo), INTERVALO_ATUALIZACAO_MS);

  const serieParaVariavel = (campo: (typeof variaveis)[number]["id"]) =>
    historico
      .filter((h) => h[campo] != null)
      .map((h) => ({
        hora: new Date(h.created_at).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
        valor: Number(h[campo]),
      }));

  const ultima = historico[historico.length - 1];
  const potencia = ultima?.tensao && ultima?.corrente ? Number(((ultima.tensao * ultima.corrente) / 1000).toFixed(2)) : 0;

  if (carregandoEstacoes) {
    return (
      <AppShell titulo="Monitoramento" descricao="Dados em tempo real das estações IoT">
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> A carregar estações…
        </div>
      </AppShell>
    );
  }

  if (estacoes.length === 0) {
    return (
      <AppShell titulo="Monitoramento" descricao="Dados em tempo real das estações IoT">
        <Painel titulo="Sem estações">
          <p className="py-6 text-center text-sm text-muted-foreground">
            Ainda não há estações cadastradas. Cadastra uma em "Estações IoT" para começar a ver dados aqui.
          </p>
        </Painel>
      </AppShell>
    );
  }

  return (
    <AppShell titulo="Monitoramento" descricao="Dados em tempo real das estações IoT">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div className="min-w-0 max-w-xs">
          <Select value={codigo} onValueChange={setCodigo}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {estacoes.map((e) => (
                <SelectItem key={e.id} value={e.codigo}>
                  {e.codigo} — {e.local}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => buscarHistorico(codigo, true)} disabled={carregandoTelemetria}>
          {carregandoTelemetria ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Atualizar
        </Button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard titulo="Tensão" valor={`${ultima?.tensao ?? "—"} V`} icone={<Zap className="h-5 w-5" />} />
        <StatCard titulo="Corrente" valor={`${ultima?.corrente ?? "—"} A`} icone={<Activity className="h-5 w-5" />} cor="info" />
        <StatCard
          titulo="Temperatura"
          valor={`${ultima?.temperatura ?? "—"} °C`}
          icone={<Thermometer className="h-5 w-5" />}
          cor={ultima?.temperatura != null && ultima.temperatura > 60 ? "destructive" : "warning"}
        />
        <StatCard titulo="Potência (estimada)" valor={`${potencia} kW`} icone={<Gauge className="h-5 w-5" />} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Painel titulo="Séries em tempo real" className="xl:col-span-2">
          {historico.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              {carregandoTelemetria ? "A carregar telemetria…" : "Ainda sem leituras de telemetria para esta estação."}
            </p>
          ) : (
            <Tabs defaultValue="tensao">
              <TabsList className="flex w-full flex-wrap">
                {variaveis.map((v) => (
                  <TabsTrigger key={v.id} value={v.id}>{v.label}</TabsTrigger>
                ))}
              </TabsList>
              {variaveis.map((v) => (
                <TabsContent key={v.id} value={v.id}>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={serieParaVariavel(v.id)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="hora" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" interval={3} />
                        <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" width={40} domain={["auto", "auto"]} />
                        <Tooltip
                          contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }}
                          formatter={(val) => [`${val} ${v.unidade}`, v.label]}
                        />
                        <Line type="monotone" dataKey="valor" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </Painel>

        <Painel titulo="Estado da estação">
          {estacao && (
            <>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="truncate text-lg font-bold">{estacao.codigo}</p>
                <EstadoBadge estado={estacao.estado} />
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <Linha rotulo="Local" valor={estacao.local} />
                <Linha rotulo="Última comunicação" valor={estacao.ultimaComunicacao} />
                <Linha rotulo="Vibração" valor={ultima?.vibracao != null ? `${ultima.vibracao} g` : "—"} />
                <Linha rotulo="Inclinação" valor={ultima?.inclinacao != null ? `${ultima.inclinacao}°` : "—"} />
                <Linha rotulo="DevEUI" valor={estacao.devEui} />
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Atualização automática a cada {INTERVALO_ATUALIZACAO_MS / 1000} segundos.
              </p>
            </>
          )}
        </Painel>
      </div>
    </AppShell>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string | number }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <dt className="truncate text-muted-foreground">{rotulo}</dt>
      <dd className="truncate font-medium">{valor}</dd>
    </div>
  );
}
