import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Building2, B as Cpu, F as Gauge, P as GraduationCap, U as CircleCheck, V as Compass, X as ChartLine, Z as ChartColumn, b as Radio, h as Server, i as Users, l as Thermometer, nt as ArrowLeft, p as ShieldCheck, rt as Activity, t as Zap, tt as ArrowRight, v as RotateCw } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-C5Nmk_bj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sobre-gNQlh90L.js
var import_jsx_runtime = require_jsx_runtime();
var indicadores = [
	{
		icon: Thermometer,
		titulo: "Temperatura",
		objetivo: "Acompanhar alterações térmicas nas estações e prevenir sobreaquecimentos.",
		cor: "text-amber-500 bg-amber-500/10 border-amber-500/20"
	},
	{
		icon: Gauge,
		titulo: "Tensão",
		objetivo: "Monitorar variações e oscilações no nível de tensão da rede elétrica.",
		cor: "text-blue-500 bg-blue-500/10 border-blue-500/20"
	},
	{
		icon: Zap,
		titulo: "Corrente",
		objetivo: "Acompanhar o comportamento da corrente e identificar picos imprevistos.",
		cor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
	},
	{
		icon: ChartColumn,
		titulo: "Consumo",
		objetivo: "Analisar o consumo energético acumulado e padrões de utilização.",
		cor: "text-purple-500 bg-purple-500/10 border-purple-500/20"
	},
	{
		icon: RotateCw,
		titulo: "Vibração",
		objetivo: "Identificar vibrações anormais resultantes de desgastes ou alterações físicas.",
		cor: "text-orange-500 bg-orange-500/10 border-orange-500/20"
	},
	{
		icon: Compass,
		titulo: "Inclinação",
		objetivo: "Identificar alterações na inclinação estrutural dos postes e suportes.",
		cor: "text-rose-500 bg-rose-500/10 border-rose-500/20"
	}
];
var funcionalidades = [
	"Monitoramento em tempo real",
	"Gestão de estações IoT",
	"Gestão de sensores",
	"Detecção de anomalias",
	"Alertas automáticos",
	"Histórico de medições",
	"Dashboards interativos",
	"Relatórios técnicos",
	"Gestão de utilizadores"
];
var beneficios = [
	"Centralização das informações de todas as estações de monitoramento",
	"Acompanhamento contínuo e preventivo das condições operacionais",
	"Identificação rápida de situações anormais e pontos de falha",
	"Apoio fundamentado à tomada de decisões por parte das equipas técnicas",
	"Histórico estruturado das medições para auditoria e análises futuras",
	"Maior organização dos processos de manutenção preventiva e corretiva"
];
function SobrePlataforma() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full bg-[#071328] text-white font-sans selection:bg-[#10b981] selection:text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-0 pointer-events-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#071328] to-[#030914]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-white/10 pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-[#10b981] text-white shadow-lg shadow-[#10b981]/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-6 w-6 fill-current" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold tracking-tight text-white",
							children: "IoT Energia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold tracking-widest text-[#10b981]",
							children: "CAÁLA"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "border-white/10 bg-slate-900/50 text-slate-200 hover:bg-slate-800 hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar ao Início"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-12 md:py-16 text-center max-w-3xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-xs font-semibold text-[#10b981] mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Sobre o SIMIE-Caála"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-extrabold sm:text-4xl md:text-5xl leading-tight text-white",
							children: "Monitoramento Inteligente de Infraestruturas Elétricas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-base md:text-lg text-slate-300 leading-relaxed",
							children: [
								"O ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "SIMIE-Caála"
								}),
								" é uma plataforma inteligente desenvolvida para apoiar o monitoramento das infraestruturas elétricas no município da Caála. O sistema permite acompanhar dados provenientes das estações de monitoramento, identificar situações anormais e disponibilizar informações cruciais para apoiar a tomada de decisões técnicas."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "my-8 rounded-2xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl mx-auto text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-white mb-3",
							children: "Nosso Objetivo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-300 text-sm md:text-base leading-relaxed",
							children: "O principal objetivo da plataforma é melhorar o acompanhamento das infraestruturas elétricas através da recolha e análise de dados em tempo real, permitindo identificar alterações nas condições de funcionamento e apoiar uma atuação mais rápida das equipas responsáveis pela manutenção."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "como-funciona",
					className: "py-12 border-t border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold text-white",
								children: "Como Funciona o Fluxo de Dados"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs md:text-sm text-slate-400 mt-1",
								children: "Desde a recolha física no terreno até ao painel analítico técnico"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-12 w-12 place-items-center rounded-xl bg-amber-500/20 text-amber-400 mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-slate-400",
											children: "PASSO 1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-white text-sm mt-1",
											children: "Sensores & IoT"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-300 mt-1",
											children: "Recolha física de temperatura, corrente e vibração no local."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-12 w-12 place-items-center rounded-xl bg-blue-500/20 text-blue-400 mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-slate-400",
											children: "PASSO 2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-white text-sm mt-1",
											children: "Estação ESP32"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-300 mt-1",
											children: "Processamento local dos sinais das infraestruturas."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-12 w-12 place-items-center rounded-xl bg-purple-500/20 text-purple-400 mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-slate-400",
											children: "PASSO 3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-white text-sm mt-1",
											children: "MQTT Broker"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-300 mt-1",
											children: "Transmissão rápida e segura via mensagens em tempo real."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-slate-400",
											children: "PASSO 4"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-white text-sm mt-1",
											children: "Plataforma API"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-300 mt-1",
											children: "Armazenamento e cruzamento de limites de operação."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center text-center p-4 rounded-xl border border-[#10b981]/30 bg-[#10b981]/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-12 w-12 place-items-center rounded-xl bg-[#10b981] text-white mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-[#10b981]",
											children: "PASSO 5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-white text-sm mt-1",
											children: "Dashboard"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-200 mt-1",
											children: "Apresentação gráfica, anomalias e relatórios técnicos."
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-center text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed",
							children: "As estações de monitoramento recolhem informações como temperatura, tensão, corrente, consumo energético, vibração e inclinação. Os dados são transmitidos para a plataforma, onde são armazenados e analisados para apresentação em dashboards, identificação de anomalias e geração de alertas."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-12 border-t border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold text-white",
								children: "O que a Plataforma Monitora"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs md:text-sm text-slate-400 mt-1",
								children: "Parâmetros e grandezas elétricas e físicas acompanhadas continuamente"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
							children: indicadores.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-sm transition-all hover:border-white/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `p-2.5 rounded-lg border ${ind.cor}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ind.icon, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-white text-base",
										children: ind.titulo
									}) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-slate-300 leading-relaxed",
									children: ind.objetivo
								})]
							}, ind.titulo))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs text-slate-300 text-center",
							children: [
								"💡 ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "Nota Técnica:"
								}),
								" A vibração e a inclinação são particularmente importantes no SIMIE-Caála porque auxiliam na sinalização preventiva de instabilidade mecânica ou possíveis danos estruturais nos postes e infraestruturas."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xl font-bold text-white mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5 text-[#10b981]" }), " Principais Funcionalidades"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",
						children: funcionalidades.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/40 p-3 text-slate-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-[#10b981] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
						}, f))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xl font-bold text-white mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-amber-400" }), " Benefícios para a Gestão"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-xs text-slate-300",
						children: beneficios.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 rounded-lg border border-white/5 bg-slate-900/20 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#10b981] font-bold",
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
						}, b))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-12 border-t border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-white",
							children: "Para Quem é a Plataforma?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs md:text-sm text-slate-400 mt-1",
							children: "Perfis e papeis operacionais no sistema"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-white/10 bg-slate-900/50 text-white backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "pb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "text-lg font-bold flex items-center gap-2 text-[#10b981]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" }), " Administrador"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								className: "text-xs text-slate-300 leading-relaxed",
								children: "Responsável pela gestão global do sistema, incluindo o cadastramento e controlo de acesso de utilizadores, configuração de estações IoT, parametrização de limites de sensores e gestão operacional das regras do sistema."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-white/10 bg-slate-900/50 text-white backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "pb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "text-lg font-bold flex items-center gap-2 text-blue-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" }), " Técnico Operador"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								className: "text-xs text-slate-300 leading-relaxed",
								children: "Responsável pelo acompanhamento contínuo das estações no terreno, análise das medições em tempo real, consulta do histórico de anomalias, tratamento de alertas e emissão de relatórios técnicos de suporte às manutenções."
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-white/10 bg-slate-900/40 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-6 w-6 text-[#10b981]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-base",
								children: "Aplicação no Município da Caála"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-300 leading-relaxed",
							children: "A solução foi concebida considerando o contexto da gestão das infraestruturas elétricas do município da Caála. A plataforma permite estruturar o monitoramento de diferentes pontos através de estações IoT, possibilitando a centralização das informações e o acompanhamento preventivo das condições das infraestruturas."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-white/10 bg-slate-900/40 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-6 w-6 text-purple-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-base",
								children: "Sobre o Projeto Académico"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-300 leading-relaxed",
							children: "O SIMIE-Caála foi desenvolvido no âmbito de um projeto académico no curso de Engenharia / Ciências da Computação, focado na aplicação prática de tecnologias de Internet das Coisas (IoT), comunicação em tempo real e análise de dados para o apoio ao setor elétrico."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 rounded-2xl bg-gradient-to-r from-[#10b981]/20 via-slate-900 to-indigo-900/20 border border-[#10b981]/30 p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white",
							children: "Pronto para aceder ao sistema?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-300 mt-1 mb-6",
							children: "Aceda à plataforma com as suas credenciais para visualizar o estado atual da rede."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-xl shadow-lg shadow-[#10b981]/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								children: ["Acessar Plataforma ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "mt-16 border-t border-white/10 pt-6 text-center text-xs text-slate-500",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" SIMIE-Caála — Sistema Inteligente de Monitoramento de Infraestruturas Elétricas. Todos os direitos reservados."
					]
				})
			]
		})]
	});
}
//#endregion
export { SobrePlataforma as component };
