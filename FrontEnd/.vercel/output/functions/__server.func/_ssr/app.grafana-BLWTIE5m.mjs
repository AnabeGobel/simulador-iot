import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as Gauge, l as Thermometer, t as Zap } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { a as StatCard, n as Painel } from "./ui-kit-NTPR4QmO.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, r as LineChart, s as Line, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.grafana-BLWTIE5m.js
var import_jsx_runtime = require_jsx_runtime();
var locais = [
	"Caála Centro",
	"Bairro Kanjala",
	"Zona Industrial",
	"Estrada Nacional",
	"Bairro Cassumbe",
	"Mercado Municipal",
	"Hospital Municipal",
	"Escola Nº 12"
];
function seedRand(seed) {
	let s = seed;
	return () => {
		s = (s * 1103515245 + 12345) % 2147483648;
		return s / 2147483648;
	};
}
var estacoes = Array.from({ length: 25 }, (_, i) => {
	const r = seedRand(i + 7);
	const estado = i % 9 === 3 ? "offline" : i % 5 === 2 ? "atencao" : "online";
	return {
		id: `est-${i + 1}`,
		codigo: `CAALA-${String(i + 1).padStart(3, "0")}`,
		local: locais[i % locais.length] ?? "Caála",
		estado,
		ativa: estado !== "offline",
		devEui: `A84041${(1e3 + i).toString(16).toUpperCase()}FF`,
		ultimaComunicacao: estado === "offline" ? "há 2 dias" : `há ${Math.floor(r() * 50) + 5} segundos`,
		bateria: Math.round(60 + r() * 40),
		sinal: r() > .6 ? "Forte" : r() > .3 ? "Médio" : "Fraco",
		tensao: Number((215 + r() * 25).toFixed(1)),
		corrente: Number((5 + r() * 6).toFixed(1)),
		temperatura: Number((28 + r() * 35).toFixed(1)),
		potencia: Number((1.2 + r() * 1.4).toFixed(2)),
		consumoHoje: Number((15 + r() * 30).toFixed(1)),
		vibracao: Number((r() * 4).toFixed(2)),
		inclinacao: Number((r() * 6).toFixed(1))
	};
});
estacoes.slice(0, 12).flatMap((e, i) => [
	{
		id: `sen-${i}-1`,
		nome: `Tensão ${e.codigo}`,
		tipo: "Tensão",
		unidade: "V",
		estacao: e.codigo,
		ativo: true,
		ultimoValor: e.tensao
	},
	{
		id: `sen-${i}-2`,
		nome: `Corrente ${e.codigo}`,
		tipo: "Corrente",
		unidade: "A",
		estacao: e.codigo,
		ativo: true,
		ultimoValor: e.corrente
	},
	{
		id: `sen-${i}-3`,
		nome: `Temperatura ${e.codigo}`,
		tipo: "Temperatura",
		unidade: "°C",
		estacao: e.codigo,
		ativo: e.estado !== "offline",
		ultimoValor: e.temperatura
	},
	{
		id: `sen-${i}-4`,
		nome: `IMU (MPU6050) ${e.codigo}`,
		tipo: "Estrutural",
		unidade: "g / °",
		estacao: e.codigo,
		ativo: true,
		ultimoValor: e.vibracao
	}
]);
var alertas = [
	{
		id: "al-1",
		tipo: "Possível queda",
		estacao: "CAALA-003",
		valor: "12.4°",
		limite: "5°",
		severidade: "CRITICO",
		data: "09/08/2026 10:32",
		lido: false,
		resolvido: false
	},
	{
		id: "al-2",
		tipo: "Vibração elevada",
		estacao: "CAALA-007",
		valor: "3.8 g",
		limite: "2.0 g",
		severidade: "ATENCAO",
		data: "09/08/2026 09:15",
		lido: false,
		resolvido: false
	},
	{
		id: "al-3",
		tipo: "Sobretensão",
		estacao: "CAALA-011",
		valor: "258 V",
		limite: "240 V",
		severidade: "CRITICO",
		data: "09/08/2026 08:47",
		lido: true,
		resolvido: false
	},
	{
		id: "al-4",
		tipo: "Temperatura alta",
		estacao: "CAALA-015",
		valor: "78 °C",
		limite: "60 °C",
		severidade: "ATENCAO",
		data: "09/08/2026 08:20",
		lido: true,
		resolvido: false
	},
	{
		id: "al-5",
		tipo: "Sobrecorrente",
		estacao: "CAALA-010",
		valor: "14.2 A",
		limite: "12 A",
		severidade: "CRITICO",
		data: "08/08/2026 22:03",
		lido: true,
		resolvido: true
	},
	{
		id: "al-6",
		tipo: "Subtensão",
		estacao: "CAALA-004",
		valor: "192 V",
		limite: "200 V",
		severidade: "ATENCAO",
		data: "08/08/2026 19:41",
		lido: true,
		resolvido: true
	},
	{
		id: "al-7",
		tipo: "Falha de comunicação",
		estacao: "CAALA-004",
		valor: "48 h sem dados",
		limite: "1 h",
		severidade: "CRITICO",
		data: "07/08/2026 06:10",
		lido: true,
		resolvido: false
	}
];
var anomalias = [
	{
		id: "an-1",
		tipo: "Vibração elevada",
		estacao: "CAALA-007",
		descricao: "Aceleração acima do limite configurado durante 3 leituras seguidas.",
		severidade: "ATENCAO",
		data: "09/08/2026 09:15"
	},
	{
		id: "an-2",
		tipo: "Inclinação anormal",
		estacao: "CAALA-003",
		descricao: "Inclinação de 12.4° detectada pelo IMU — possível deslocamento do poste.",
		severidade: "CRITICO",
		data: "09/08/2026 08:50"
	},
	{
		id: "an-3",
		tipo: "Sobrecorrente",
		estacao: "CAALA-010",
		descricao: "Corrente de 14.2 A acima do limite de 12 A.",
		severidade: "CRITICO",
		data: "09/08/2026 08:12"
	},
	{
		id: "an-4",
		tipo: "Consumo anormal",
		estacao: "CAALA-018",
		descricao: "Consumo 42% acima da média das últimas duas semanas.",
		severidade: "ATENCAO",
		data: "08/08/2026 23:04"
	},
	{
		id: "an-5",
		tipo: "Temperatura elevada",
		estacao: "CAALA-015",
		descricao: "78 °C registados no transformador (limite 60 °C).",
		severidade: "CRITICO",
		data: "08/08/2026 21:30"
	}
];
function serie24h(base, amplitude) {
	const r = seedRand(Math.round(base * 100));
	return Array.from({ length: 24 }, (_, h) => ({
		hora: `${String(h).padStart(2, "0")}:00`,
		valor: Number((base + Math.sin(h / 3) * amplitude + (r() - .5) * amplitude).toFixed(2))
	}));
}
var resumo = {
	estacoes: estacoes.length,
	online: estacoes.filter((e) => e.estado === "online").length,
	alertasAtivos: alertas.filter((a) => !a.resolvido).length,
	anomaliasHoje: anomalias.filter((a) => a.data.startsWith("09/08")).length,
	tensaoMedia: 221.4,
	correnteMedia: 8.7,
	potenciaMedia: 1.92,
	consumoHoje: 1284,
	consumoOntem: 1102,
	consumoMes: 32481,
	estruturasEmRisco: 2
};
var tensao = serie24h(221, 10);
var temperatura = serie24h(36, 12);
var consumo = [
	{
		hora: "Hoje",
		valor: resumo.consumoHoje
	},
	{
		hora: "Ontem",
		valor: resumo.consumoOntem
	},
	{
		hora: "Média mês",
		valor: Math.round(resumo.consumoMes / 30)
	}
];
function GrafanaPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Grafana",
		descricao: "Dashboards técnicos de séries temporais",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					titulo: "Tensão média",
					valor: "221.4 V",
					icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					titulo: "Corrente média",
					valor: "8.7 A",
					icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-5 w-5" }),
					cor: "info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					titulo: "Temperatura",
					valor: "36.2 °C",
					icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-5 w-5" }),
					cor: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					titulo: "Potência",
					valor: "1.92 kW",
					icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-5 w-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 xl:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Tensão — últimas 24h (V)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grafico, {
						dados: tensao,
						cor: "var(--color-chart-1)"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Temperatura — últimas 24h (°C)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grafico, {
						dados: temperatura,
						cor: "var(--color-chart-3)"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Painel, {
					titulo: "Consumo energético (kWh)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: consumo,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "hora",
										tick: { fontSize: 11 },
										stroke: "var(--color-muted-foreground)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: { fontSize: 11 },
										stroke: "var(--color-muted-foreground)",
										width: 45
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--color-card)",
										border: "1px solid var(--color-border)",
										borderRadius: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "valor",
										fill: "var(--color-chart-2)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: [
							"Hoje: ",
							resumo.consumoHoje,
							" kWh · Ontem: ",
							resumo.consumoOntem,
							" kWh · Este mês:",
							" ",
							resumo.consumoMes.toLocaleString("pt-PT"),
							" kWh"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Comparação de tensão por estação",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border text-sm",
						children: estacoes.slice(0, 8).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-muted-foreground",
								children: e.codigo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: [e.tensao, " V"]
							})]
						}, e.id))
					})
				})
			]
		})]
	});
}
function Grafico({ dados, cor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data: dados,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						strokeDasharray: "3 3",
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "hora",
						tick: { fontSize: 11 },
						stroke: "var(--color-muted-foreground)",
						interval: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: { fontSize: 11 },
						stroke: "var(--color-muted-foreground)",
						width: 40,
						domain: ["auto", "auto"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						background: "var(--color-card)",
						border: "1px solid var(--color-border)",
						borderRadius: 8
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "valor",
						stroke: cor,
						strokeWidth: 2,
						dot: false
					})
				]
			})
		})
	});
}
//#endregion
export { GrafanaPage as component };
