import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Painel, StatCard } from "@/components/ui-kit";
import { estacoes, resumo, serie24h } from "@/lib/mock-data";
import { Gauge, Thermometer, Zap } from "lucide-react";

export const Route = createFileRoute("/app/grafana")({
  head: () => ({
    meta: [
      { title: "Grafana — IoT Energia Caálá" },
      { name: "description", content: "Dashboards técnicos de séries temporais: tensão, temperatura e consumo." },
      { property: "og:title", content: "Grafana — IoT Energia Caálá" },
      { property: "og:description", content: "Análise dos dados IoT em séries temporais." },
    ],
  }),
  component: GrafanaPage,
});

const tensao = serie24h(221, 10);
const temperatura = serie24h(36, 12);
const consumo = [
  { hora: "Hoje", valor: resumo.consumoHoje },
  { hora: "Ontem", valor: resumo.consumoOntem },
  { hora: "Média mês", valor: Math.round(resumo.consumoMes / 30) },
];

function GrafanaPage() {
  return (
    <AppShell titulo="Grafana" descricao="Dashboards técnicos de séries temporais">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard titulo="Tensão média" valor="221.4 V" icone={<Zap className="h-5 w-5" />} />
        <StatCard titulo="Corrente média" valor="8.7 A" icone={<Gauge className="h-5 w-5" />} cor="info" />
        <StatCard
          titulo="Temperatura"
          valor="36.2 °C"
          icone={<Thermometer className="h-5 w-5" />}
          cor="warning"
        />
        <StatCard titulo="Potência" valor="1.92 kW" icone={<Gauge className="h-5 w-5" />} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Painel titulo="Tensão — últimas 24h (V)">
          <Grafico dados={tensao} cor="var(--color-chart-1)" />
        </Painel>
        <Painel titulo="Temperatura — últimas 24h (°C)">
          <Grafico dados={temperatura} cor="var(--color-chart-3)" />
        </Painel>
        <Painel titulo="Consumo energético (kWh)">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumo}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hora" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" width={45} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="valor" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Hoje: {resumo.consumoHoje} kWh · Ontem: {resumo.consumoOntem} kWh · Este mês:{" "}
            {resumo.consumoMes.toLocaleString("pt-PT")} kWh
          </p>
        </Painel>
        <Painel titulo="Comparação de tensão por estação">
          <ul className="divide-y divide-border text-sm">
            {estacoes.slice(0, 8).map((e) => (
              <li key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2">
                <span className="truncate text-muted-foreground">{e.codigo}</span>
                <span className="font-semibold">{e.tensao} V</span>
              </li>
            ))}
          </ul>
        </Painel>
      </div>
    </AppShell>
  );
}

function Grafico({ dados, cor }: { dados: { hora: string; valor: number }[]; cor: string }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="hora" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" interval={3} />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" width={40} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
            }}
          />
          <Line type="monotone" dataKey="valor" stroke={cor} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
