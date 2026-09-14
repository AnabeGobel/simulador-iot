import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as SelectItem, i as SelectContent, o as SelectTrigger, r as Select, s as SelectValue } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Gauge, j as LoaderCircle, l as Thermometer, rt as Activity, t as Zap, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { a as StatCard, n as Painel, t as EstadoBadge } from "./ui-kit-NTPR4QmO.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CA_Ke5Cp.mjs";
import { t as useRealtimePolling } from "./use-realtime-polling-AiUw0hBg.mjs";
import { i as getEstacoes, o as getTelemetriaEstacao } from "./dataService-CkMqUdAO.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, r as LineChart, s as Line, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.monitoramento-BSzQdSnF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var variaveis = [
	{
		id: "tensao",
		label: "Tensão",
		unidade: "V"
	},
	{
		id: "corrente",
		label: "Corrente",
		unidade: "A"
	},
	{
		id: "temperatura",
		label: "Temperatura",
		unidade: "°C"
	},
	{
		id: "vibracao",
		label: "Vibração",
		unidade: "g"
	},
	{
		id: "inclinacao",
		label: "Inclinação",
		unidade: "°"
	}
];
var INTERVALO_ATUALIZACAO_MS = 15e3;
function Monitoramento() {
	const [estacoes, setEstacoes] = (0, import_react.useState)([]);
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [historico, setHistorico] = (0, import_react.useState)([]);
	const [carregandoEstacoes, setCarregandoEstacoes] = (0, import_react.useState)(true);
	const [carregandoTelemetria, setCarregandoTelemetria] = (0, import_react.useState)(false);
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
	(0, import_react.useEffect)(() => {
		buscarEstacoes(true);
	}, []);
	useRealtimePolling(buscarEstacoes);
	const buscarHistorico = async (cod, mostrarCarregamento = false) => {
		if (!cod) return;
		if (mostrarCarregamento) setCarregandoTelemetria(true);
		try {
			const dados = await getTelemetriaEstacao(cod, 40);
			setHistorico([...dados].reverse());
		} catch {
			toast.error("Erro ao carregar a telemetria desta estação.");
		} finally {
			setCarregandoTelemetria(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!codigo) return;
		buscarHistorico(codigo, true);
	}, [codigo]);
	useRealtimePolling(() => buscarHistorico(codigo), INTERVALO_ATUALIZACAO_MS);
	const serieParaVariavel = (campo) => historico.filter((h) => h[campo] != null).map((h) => ({
		hora: new Date(h.created_at).toLocaleTimeString("pt-PT", {
			hour: "2-digit",
			minute: "2-digit"
		}),
		valor: Number(h[campo])
	}));
	const ultima = historico[historico.length - 1];
	const potencia = ultima?.tensao && ultima?.corrente ? Number((ultima.tensao * ultima.corrente / 1e3).toFixed(2)) : 0;
	if (carregandoEstacoes) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		titulo: "Monitoramento",
		descricao: "Dados em tempo real das estações IoT",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-2 py-20 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A carregar estações…"]
		})
	});
	if (estacoes.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		titulo: "Monitoramento",
		descricao: "Dados em tempo real das estações IoT",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
			titulo: "Sem estações",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-sm text-muted-foreground",
				children: "Ainda não há estações cadastradas. Cadastra uma em \"Estações IoT\" para começar a ver dados aqui."
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Monitoramento",
		descricao: "Dados em tempo real das estações IoT",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: codigo,
						onValueChange: setCodigo,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: estacoes.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: e.codigo,
							children: [
								e.codigo,
								" — ",
								e.local
							]
						}, e.id)) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => buscarHistorico(codigo, true),
					disabled: carregandoTelemetria,
					children: [carregandoTelemetria ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-2 h-4 w-4" }), "Atualizar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Tensão",
						valor: `${ultima?.tensao ?? "—"} V`,
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Corrente",
						valor: `${ultima?.corrente ?? "—"} A`,
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" }),
						cor: "info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Temperatura",
						valor: `${ultima?.temperatura ?? "—"} °C`,
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-5 w-5" }),
						cor: ultima?.temperatura != null && ultima.temperatura > 60 ? "destructive" : "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Potência (estimada)",
						valor: `${potencia} kW`,
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Séries em tempo real",
					className: "xl:col-span-2",
					children: historico.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted-foreground",
						children: carregandoTelemetria ? "A carregar telemetria…" : "Ainda sem leituras de telemetria para esta estação."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "tensao",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
							className: "flex w-full flex-wrap",
							children: variaveis.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: v.id,
								children: v.label
							}, v.id))
						}), variaveis.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: v.id,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-64 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
										data: serieParaVariavel(v.id),
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
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												contentStyle: {
													background: "var(--color-card)",
													border: "1px solid var(--color-border)",
													borderRadius: 8
												},
												formatter: (val) => [`${val} ${v.unidade}`, v.label]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												type: "monotone",
												dataKey: "valor",
												stroke: "var(--color-chart-2)",
												strokeWidth: 2,
												dot: false
											})
										]
									})
								})
							})
						}, v.id))]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Estado da estação",
					children: estacao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-lg font-bold",
								children: estacao.codigo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: estacao.estado })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linha, {
									rotulo: "Local",
									valor: estacao.local
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linha, {
									rotulo: "Última comunicação",
									valor: estacao.ultimaComunicacao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linha, {
									rotulo: "Vibração",
									valor: ultima?.vibracao != null ? `${ultima.vibracao} g` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linha, {
									rotulo: "Inclinação",
									valor: ultima?.inclinacao != null ? `${ultima.inclinacao}°` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linha, {
									rotulo: "DevEUI",
									valor: estacao.devEui
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: [
								"Atualização automática a cada ",
								INTERVALO_ATUALIZACAO_MS / 1e3,
								" segundos."
							]
						})
					] })
				})]
			})
		]
	});
}
function Linha({ rotulo, valor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "truncate text-muted-foreground",
			children: rotulo
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "truncate font-medium",
			children: valor
		})]
	});
}
//#endregion
export { Monitoramento as component };
