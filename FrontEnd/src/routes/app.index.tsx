import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Building2,
  Gauge,
  Loader2,
  Thermometer,
  Wifi,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { StatCard, Painel, SeveridadeBadge, EstadoBadge } from "@/components/ui-kit";
import { useAuth, rotulosPerfil } from "@/lib/auth";
import {
  getEstacoes,
  getAlertas,
  getAnomalias,
  getTelemetriaRecente,
  type EstacaoComEstado,
  type TelemetriaLeitura,
} from "@/services/dataService";
import type { Alerta, Anomalia } from "@/lib/mock-data";
import { useRealtimePolling } from "@/hooks/use-realtime-polling";
import { toast } from "sonner";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — SIMIE-Caála" },
      { name: "description", content: "Visão geral das estações, alertas e consumo energético." },
      { property: "og:title", content: "Dashboard — SIMIE-Caála" },
      { property: "og:description", content: "Visão geral em tempo real da rede monitorada." },
    ],
  }),
  component: Dashboard,
});

// Agrupa as leituras recentes de telemetria (de todas as estações) por hora
// e faz a média de tensão — dá o gráfico "Consumo/Tensão nas últimas 24h"
// sem precisar de um endpoint de agregação à parte.
function agregarPorHora(leituras: TelemetriaLeitura[]) {
  const grupos = new Map<string, { soma: number; total: number }>();

  for (const l of leituras) {
    if (l.tensao == null) continue;
    const hora = new Date(l.created_at).toISOString().substring(11, 13) + ":00";
    const atual = grupos.get(hora) ?? { soma: 0, total: 0 };
    atual.soma += l.tensao;
    atual.total += 1;
    grupos.set(hora, atual);
  }

  return Array.from(grupos.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([hora, { soma, total }]) => ({ hora, valor: Number((soma / total).toFixed(1)) }));
}

function Dashboard() {
  const { sessao } = useAuth();
  const perfil = sessao?.perfil ?? "operador";

  const [estacoes, setEstacoes] = useState<EstacaoComEstado[]>([]);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [anomalias, setAnomalias] = useState<Anomalia[]>([]);
  const [serie, setSerie] = useState<{ hora: string; valor: number }[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscarDados = async (mostrarCarregamento = false) => {
    if (mostrarCarregamento) setCarregando(true);
    try {
      const [estacoesData, alertasData, anomaliasData, telemetriaData] = await Promise.all([
        getEstacoes(),
        getAlertas(),
        getAnomalias(),
        getTelemetriaRecente(300),
      ]);
      setEstacoes(estacoesData);
      setAlertas(alertasData);
      setAnomalias(anomaliasData);
      setSerie(agregarPorHora(telemetriaData));
    } catch {
      toast.error("Erro ao carregar os dados do dashboard.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    void buscarDados(true);
  }, []);

  useRealtimePolling(buscarDados);

  const resumo = useMemo(() => {
    const online = estacoes.filter((e) => e.estadoTempoReal === "ok" || e.estadoTempoReal === "alerta" || e.estadoTempoReal === "perigo").length;
    const alertasAtivos = alertas.filter((a) => !a.resolvido).length;
    const hoje = new Date().toLocaleDateString("pt-PT");
    const anomaliasHoje = anomalias.filter((a) => a.data?.startsWith(hoje)).length;
    const comLeitura = estacoes.filter((e) => e.ultimaTelemetria);
    const tensaoMedia = comLeitura.length
      ? Number((comLeitura.reduce((s, e) => s + (e.tensao ?? 0), 0) / comLeitura.length).toFixed(1))
      : 0;
    const correnteMedia = comLeitura.length
      ? Number((comLeitura.reduce((s, e) => s + (e.corrente ?? 0), 0) / comLeitura.length).toFixed(1))
      : 0;
    const potenciaMedia = comLeitura.length
      ? Number((comLeitura.reduce((s, e) => s + (e.potencia ?? 0), 0) / comLeitura.length).toFixed(2))
      : 0;
    const estruturasEmRisco = estacoes.filter((e) => e.estadoTempoReal === "perigo").length;

    return {
      estacoes: estacoes.length,
      online,
      alertasAtivos,
      anomaliasHoje,
      tensaoMedia,
      correnteMedia,
      potenciaMedia,
      estruturasEmRisco,
    };
  }, [estacoes, alertas, anomalias]);

  if (carregando) {
    return (
      <AppShell titulo={`Dashboard do ${rotulosPerfil[perfil]}`} descricao="Visão geral da rede de monitoramento — Caála">
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> A carregar dados da rede…
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell titulo={`Dashboard do ${rotulosPerfil[perfil]}`} descricao="Visão geral da rede de monitoramento — Caála">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard titulo="Estações" valor={resumo.estacoes} legenda="Total cadastradas" icone={<Building2 className="h-5 w-5" />} cor="info" />
        <StatCard titulo="Online" valor={resumo.online} legenda="Comunicaram recentemente" icone={<Wifi className="h-5 w-5" />} />
        <StatCard titulo="Alertas ativos" valor={resumo.alertasAtivos} legenda="Requerem atenção" icone={<Bell className="h-5 w-5" />} cor="destructive" />
        <StatCard titulo="Anomalias" valor={anomalias.length} legenda="Total detetadas" icone={<AlertTriangle className="h-5 w-5" />} cor="warning" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Painel titulo="Monitoramento elétrico (média da rede)" className="xl:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metrica icone={<Zap className="h-4 w-4" />} rotulo="Tensão" valor={`${resumo.tensaoMedia} V`} />
            <Metrica icone={<Activity className="h-4 w-4" />} rotulo="Corrente" valor={`${resumo.correnteMedia} A`} />
            <Metrica icone={<Gauge className="h-4 w-4" />} rotulo="Potência" valor={`${resumo.potenciaMedia} kW`} />
            <Metrica icone={<Thermometer className="h-4 w-4" />} rotulo="Estações online" valor={`${resumo.online}/${resumo.estacoes}`} />
          </div>

          <p className="mt-6 text-xs font-medium text-muted-foreground">
            Tensão média da rede por hora (últimas leituras recebidas)
          </p>
          <div className="mt-2 h-64 w-full">
            {serie.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Ainda sem leituras de telemetria suficientes para desenhar o gráfico.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={serie}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="hora" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" interval={2} />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" width={35} domain={["auto", "auto"]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      color: "var(--color-foreground)",
                    }}
                    formatter={(val) => [`${val} V`, "Tensão média"]}
                  />
                  <Area type="monotone" dataKey="valor" stroke="var(--color-chart-2)" fill="url(#grad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Painel>

        <div className="space-y-4">
          <Painel titulo="Estruturas">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-muted/50 p-3">
              <p className="min-w-0 truncate text-sm">Estruturas em risco crítico</p>
              <p className="text-2xl font-bold text-warning">{resumo.estruturasEmRisco}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Calculado a partir dos alertas críticos por resolver associados a cada estação.
            </p>
          </Painel>

          <Painel
            titulo="Alertas recentes"
            acao={
              <Link to="/app/alertas" className="shrink-0 text-xs font-medium text-primary">
                Ver todos
              </Link>
            }
          >
            <ul className="space-y-3">
              {alertas.slice(0, 4).map((a) => (
                <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{a.tipo}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.estacao} · {a.data}</p>
                  </div>
                  <SeveridadeBadge nivel={a.severidade} />
                </li>
              ))}
              {alertas.length === 0 && <p className="text-sm text-muted-foreground">Sem alertas registados.</p>}
            </ul>
          </Painel>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Painel
          titulo="Estado das estações"
          acao={
            <Link to="/app/estacoes" className="shrink-0 text-xs font-medium text-primary">
              Ver todas
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {estacoes.slice(0, 6).map((e) => (
              <li key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{e.codigo}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.local}</p>
                </div>
                <EstadoBadge estado={e.estado} />
              </li>
            ))}
            {estacoes.length === 0 && <p className="py-4 text-sm text-muted-foreground">Nenhuma estação cadastrada.</p>}
          </ul>
        </Painel>

        <Painel
          titulo="Anomalias recentes"
          acao={
            <Link to="/app/anomalias" className="shrink-0 text-xs font-medium text-primary">
              Ver todas
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {anomalias.slice(0, 5).map((a) => (
              <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.tipo} — {a.estacao}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.data}</p>
                </div>
                <SeveridadeBadge nivel={a.severidade} />
              </li>
            ))}
            {anomalias.length === 0 && <p className="py-4 text-sm text-muted-foreground">Nenhuma anomalia registada.</p>}
          </ul>
        </Painel>
      </div>
    </AppShell>
  );
}

function Metrica({ icone, rotulo, valor }: { icone: React.ReactNode; rotulo: string; valor: string | number }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border p-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/12 text-primary">{icone}</span>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted-foreground">{rotulo}</p>
        <p className="truncate text-lg font-bold">{valor}</p>
      </div>
    </div>
  );
}