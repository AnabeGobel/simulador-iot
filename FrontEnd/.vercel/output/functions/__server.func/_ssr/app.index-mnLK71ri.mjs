import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as rotulosPerfil, m as useAuth } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Building2, F as Gauge, et as Bell, j as LoaderCircle, l as Thermometer, r as Wifi, rt as Activity, s as TriangleAlert, t as Zap } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { a as StatCard, n as Painel, r as SeveridadeBadge, t as EstadoBadge } from "./ui-kit-NTPR4QmO.mjs";
import { t as useRealtimePolling } from "./use-realtime-polling-AiUw0hBg.mjs";
import { i as getEstacoes, n as getAlertas, r as getAnomalias, s as getTelemetriaRecente } from "./dataService-CkMqUdAO.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, o as Area, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.index-mnLK71ri.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function agregarPorHora(leituras) {
	const grupos = /* @__PURE__ */ new Map();
	for (const l of leituras) {
		if (l.tensao == null) continue;
		const hora = new Date(l.created_at).toISOString().substring(11, 13) + ":00";
		const atual = grupos.get(hora) ?? {
			soma: 0,
			total: 0
		};
		atual.soma += l.tensao;
		atual.total += 1;
		grupos.set(hora, atual);
	}
	return Array.from(grupos.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([hora, { soma, total }]) => ({
		hora,
		valor: Number((soma / total).toFixed(1))
	}));
}
function Dashboard() {
	const { sessao } = useAuth();
	const perfil = sessao?.perfil ?? "operador";
	const [estacoes, setEstacoes] = (0, import_react.useState)([]);
	const [alertas, setAlertas] = (0, import_react.useState)([]);
	const [anomalias, setAnomalias] = (0, import_react.useState)([]);
	const [serie, setSerie] = (0, import_react.useState)([]);
	const [carregando, setCarregando] = (0, import_react.useState)(true);
	const buscarDados = async (mostrarCarregamento = false) => {
		if (mostrarCarregamento) setCarregando(true);
		try {
			const [estacoesData, alertasData, anomaliasData, telemetriaData] = await Promise.all([
				getEstacoes(),
				getAlertas(),
				getAnomalias(),
				getTelemetriaRecente(300)
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
	(0, import_react.useEffect)(() => {
		buscarDados(true);
	}, []);
	useRealtimePolling(buscarDados);
	const resumo = (0, import_react.useMemo)(() => {
		const online = estacoes.filter((e) => e.estadoTempoReal === "ok" || e.estadoTempoReal === "alerta" || e.estadoTempoReal === "perigo").length;
		const alertasAtivos = alertas.filter((a) => !a.resolvido).length;
		const hoje = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT");
		const anomaliasHoje = anomalias.filter((a) => a.data?.startsWith(hoje)).length;
		const comLeitura = estacoes.filter((e) => e.ultimaTelemetria);
		const tensaoMedia = comLeitura.length ? Number((comLeitura.reduce((s, e) => s + (e.tensao ?? 0), 0) / comLeitura.length).toFixed(1)) : 0;
		const correnteMedia = comLeitura.length ? Number((comLeitura.reduce((s, e) => s + (e.corrente ?? 0), 0) / comLeitura.length).toFixed(1)) : 0;
		const potenciaMedia = comLeitura.length ? Number((comLeitura.reduce((s, e) => s + (e.potencia ?? 0), 0) / comLeitura.length).toFixed(2)) : 0;
		const estruturasEmRisco = estacoes.filter((e) => e.estadoTempoReal === "perigo").length;
		return {
			estacoes: estacoes.length,
			online,
			alertasAtivos,
			anomaliasHoje,
			tensaoMedia,
			correnteMedia,
			potenciaMedia,
			estruturasEmRisco
		};
	}, [
		estacoes,
		alertas,
		anomalias
	]);
	if (carregando) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		titulo: `Dashboard do ${rotulosPerfil[perfil]}`,
		descricao: "Visão geral da rede de monitoramento — Caála",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-2 py-20 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A carregar dados da rede…"]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: `Dashboard do ${rotulosPerfil[perfil]}`,
		descricao: "Visão geral da rede de monitoramento — Caála",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Estações",
						valor: resumo.estacoes,
						legenda: "Total cadastradas",
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" }),
						cor: "info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Online",
						valor: resumo.online,
						legenda: "Comunicaram recentemente",
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Alertas ativos",
						valor: resumo.alertasAtivos,
						legenda: "Requerem atenção",
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }),
						cor: "destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						titulo: "Anomalias",
						valor: anomalias.length,
						legenda: "Total detetadas",
						icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }),
						cor: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Painel, {
					titulo: "Monitoramento elétrico (média da rede)",
					className: "xl:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metrica, {
									icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }),
									rotulo: "Tensão",
									valor: `${resumo.tensaoMedia} V`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metrica, {
									icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }),
									rotulo: "Corrente",
									valor: `${resumo.correnteMedia} A`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metrica, {
									icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-4 w-4" }),
									rotulo: "Potência",
									valor: `${resumo.potenciaMedia} kW`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metrica, {
									icone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-4 w-4" }),
									rotulo: "Estações online",
									valor: `${resumo.online}/${resumo.estacoes}`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs font-medium text-muted-foreground",
							children: "Tensão média da rede por hora (últimas leituras recebidas)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-64 w-full",
							children: serie.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center text-sm text-muted-foreground",
								children: "Ainda sem leituras de telemetria suficientes para desenhar o gráfico."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: serie,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "grad",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "var(--color-chart-2)",
												stopOpacity: .45
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "var(--color-chart-2)",
												stopOpacity: 0
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--color-border)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "hora",
											tick: { fontSize: 11 },
											stroke: "var(--color-muted-foreground)",
											interval: 2
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tick: { fontSize: 11 },
											stroke: "var(--color-muted-foreground)",
											width: 35,
											domain: ["auto", "auto"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: {
												background: "var(--color-card)",
												border: "1px solid var(--color-border)",
												borderRadius: 8,
												color: "var(--color-foreground)"
											},
											formatter: (val) => [`${val} V`, "Tensão média"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "valor",
											stroke: "var(--color-chart-2)",
											fill: "url(#grad)",
											strokeWidth: 2
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Painel, {
						titulo: "Estruturas",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-muted/50 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "min-w-0 truncate text-sm",
								children: "Estruturas em risco crítico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-warning",
								children: resumo.estruturasEmRisco
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "Calculado a partir dos alertas críticos por resolver associados a cada estação."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
						titulo: "Alertas recentes",
						acao: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/alertas",
							className: "shrink-0 text-xs font-medium text-primary",
							children: "Ver todos"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3",
							children: [alertas.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-semibold",
										children: a.tipo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: [
											a.estacao,
											" · ",
											a.data
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeveridadeBadge, { nivel: a.severidade })]
							}, a.id)), alertas.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Sem alertas registados."
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Estado das estações",
					acao: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/estacoes",
						className: "shrink-0 text-xs font-medium text-primary",
						children: "Ver todas"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "divide-y divide-border",
						children: [estacoes.slice(0, 6).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: e.codigo
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: e.local
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: e.estado })]
						}, e.id)), estacoes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-4 text-sm text-muted-foreground",
							children: "Nenhuma estação cadastrada."
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Anomalias recentes",
					acao: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/anomalias",
						className: "shrink-0 text-xs font-medium text-primary",
						children: "Ver todas"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "divide-y divide-border",
						children: [anomalias.slice(0, 5).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-medium",
									children: [
										a.tipo,
										" — ",
										a.estacao
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: a.data
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeveridadeBadge, { nivel: a.severidade })]
						}, a.id)), anomalias.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-4 text-sm text-muted-foreground",
							children: "Nenhuma anomalia registada."
						})]
					})
				})]
			})
		]
	});
}
function Metrica({ icone, rotulo, valor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3 rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/12 text-primary",
			children: icone
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-muted-foreground",
				children: rotulo
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-lg font-bold",
				children: valor
			})]
		})]
	});
}
//#endregion
export { Dashboard as component };
