import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Cloud, Z as ChartColumn, i as Users, p as ShieldCheck, rt as Activity, t as Zap, tt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D0yRO_JE.js
var import_jsx_runtime = require_jsx_runtime();
var cards = [
	{
		icon: Activity,
		color: "bg-[#10b981] text-white",
		titulo: "Monitoramento em Tempo Real",
		texto: "Acompanhe tensão, corrente, temperatura e outros parâmetros em tempo real."
	},
	{
		icon: ShieldCheck,
		color: "bg-[#6366f1] text-white",
		titulo: "Detecção de Anomalias",
		texto: "Identificação inteligente de situações anormais e geração de alertas."
	},
	{
		icon: ChartColumn,
		color: "bg-[#f59e0b] text-white",
		titulo: "Relatórios e Análises",
		texto: "Gere relatórios detalhados e analise o histórico dos dados da sua infraestrutura."
	},
	{
		icon: Users,
		color: "bg-[#3b82f6] text-white",
		titulo: "Gestão de Usuários",
		texto: "Controle de acesso por perfis e permissões de forma simples e segura."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen w-full overflow-x-hidden bg-[#071328] text-white font-sans flex flex-col justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-0 h-full w-full pointer-events-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full w-full bg-cover bg-center bg-no-repeat opacity-40",
					style: { backgroundImage: `url('/bg-hero.jpg')` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#071328] via-[#071328]/85 to-[#071328]/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#071328] via-transparent to-[#071328]/60" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 py-8 md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-2xl bg-[#10b981] text-white shadow-lg shadow-[#10b981]/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-7 w-7 fill-current" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-bold tracking-tight text-white",
						children: "IoT Energia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-widest text-[#10b981]",
						children: "CAALÁ"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "my-auto max-w-2xl py-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-white",
							children: [
								"Bem-vindo ao ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Sistema de Monitoramento ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Inteligente de",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#10b981]",
									children: "Energia"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base",
							children: "Monitoramento em tempo real de infraestruturas elétricas com sensores IoT, análise de dados e alertas inteligentes para uma rede mais segura e eficiente."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-4 sm:grid-cols-2",
							children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-md transition-all hover:bg-slate-900/70 hover:border-white/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid h-10 w-10 place-items-center rounded-full ${c.color}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-4 font-bold text-white text-base",
										children: c.titulo
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-slate-300 leading-relaxed",
										children: c.texto
									})
								]
							}, c.titulo))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-6",
							children: [
								{
									icon: ShieldCheck,
									t: "Seguro",
									s: "Seus dados protegidos"
								},
								{
									icon: Cloud,
									t: "Confiável",
									s: "Sistema estável 24/7"
								},
								{
									icon: Zap,
									t: "Inteligente",
									s: "Decisões baseadas em dados"
								}
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5 shrink-0 text-[#10b981]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-white",
									children: f.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400 hidden sm:block",
									children: f.s
								})] })]
							}, f.t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-col items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "w-full max-w-xs bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-xl h-12 shadow-lg shadow-[#10b981]/25 text-base",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/login",
									children: ["Acessar Sistema ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-5 w-5" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/sobre",
								className: "flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saiba mais sobre o sistema" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 text-[#10b981]" })]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "py-4 text-center text-xs text-slate-500",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" IoT Energia Caálá. Todos os direitos reservados."
					]
				})
			]
		})]
	});
}
//#endregion
export { Landing as component };
