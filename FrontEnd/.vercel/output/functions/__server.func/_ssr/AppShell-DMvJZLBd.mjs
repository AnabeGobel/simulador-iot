import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as rotulosPerfil, h as useTheme, m as useAuth } from "./router-azIfNJtr.mjs";
import { C as Moon, D as LogOut, F as Gauge, K as ChevronRight, L as FileText, N as House, Z as ChartColumn, a as User, b as Radio, et as Bell, i as Users, l as Thermometer, m as Settings, n as X, q as ChevronLeft, s as TriangleAlert, t as Zap, u as Sun, w as Menu } from "../_libs/lucide-react.mjs";
import { i as cn, n as Button } from "./router-azIfNJtr2.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/radix-ui__react-avatar.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DMvJZLBd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
var menu = [
	{
		to: "/app",
		label: "Dashboard",
		icon: House,
		recurso: "dashboard"
	},
	{
		to: "/app/monitoramento",
		label: "Monitoramento",
		icon: Gauge,
		recurso: "monitoramento"
	},
	{
		to: "/app/estacoes",
		label: "Estações IoT",
		icon: Radio,
		recurso: "estacoes"
	},
	{
		to: "/app/sensores",
		label: "Sensores",
		icon: Thermometer,
		recurso: "sensores"
	},
	{
		to: "/app/anomalias",
		label: "Anomalias",
		icon: TriangleAlert,
		recurso: "anomalias"
	},
	{
		to: "/app/alertas",
		label: "Alertas",
		icon: Bell,
		recurso: "alertas"
	},
	{
		to: "/relatorios",
		label: "Relatórios",
		icon: FileText,
		recurso: "relatorios"
	},
	{
		to: "/app/utilizadores",
		label: "Utilizadores",
		icon: Users,
		recurso: "utilizadores"
	},
	{
		to: "/app/configuracoes",
		label: "Configurações",
		icon: Settings,
		recurso: "configuracoes"
	}
];
var CHAVE_COLAPSADO = "@iot_caala:sidebar_colapsado";
function obterIniciais(nome) {
	const nomeNormalizado = String(nome ?? "").trim().replace(/\s+/g, " ");
	if (!nomeNormalizado) return "U";
	const primeiraLetra = nomeNormalizado.charAt(0) || "U";
	const ultimoEspaco = nomeNormalizado.lastIndexOf(" ");
	if (ultimoEspaco < 0) return nomeNormalizado.slice(0, 2).toUpperCase();
	return `${primeiraLetra}${nomeNormalizado.charAt(ultimoEspaco + 1) || "U"}`.toUpperCase();
}
function AppShell({ titulo, descricao, children }) {
	const { sessao, carregado, sair, pode } = useAuth();
	const { tema, alternar } = useTheme();
	const navigate = useNavigate();
	const [aberto, setAberto] = (0, import_react.useState)(false);
	const [colapsado, setColapsado] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		if (carregado && !sessao) navigate({
			to: "/login",
			replace: true
		});
	}, [
		carregado,
		sessao,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		setAberto(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (localStorage.getItem(CHAVE_COLAPSADO) === "1") setColapsado(true);
	}, []);
	const alternarColapso = () => {
		setColapsado((v) => {
			const novo = !v;
			localStorage.setItem(CHAVE_COLAPSADO, novo ? "1" : "0");
			return novo;
		});
	};
	if (!carregado || !sessao) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "A carregar sessão…"
		})
	});
	const itens = menu.filter((m) => pode(m.recurso));
	const iniciais = obterIniciais(sessao.nome || sessao.email);
	const perfilUsuario = (mostrarDados) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-t border-sidebar-border p-3", !mostrarDados && "flex justify-center px-2"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex items-center gap-3", !mostrarDados && "justify-center"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				className: "h-9 w-9 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					className: "bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground",
					children: iniciais
				})
			}), mostrarDados && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 leading-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-semibold text-sidebar-foreground",
					children: sessao.nome
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-sidebar-foreground/70",
					children: sessao.email
				})]
			})]
		})
	});
	const nav = (forcarLabel = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-1 flex-col gap-1 overflow-y-auto p-3",
		children: [
			itens.map((item) => {
				const ativo = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
				const mostrarLabel = forcarLabel || !colapsado;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					title: !mostrarLabel ? item.label : void 0,
					className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", !mostrarLabel && "justify-center px-0", ativo ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 shrink-0" }), mostrarLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: item.label
					})]
				}, item.to);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/perfil",
				title: !(forcarLabel || !colapsado) ? "Meu Perfil" : void 0,
				className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", !(forcarLabel || !colapsado) && "justify-center px-0", pathname === "/app/perfil" ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 shrink-0" }), (forcarLabel || !colapsado) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: "Meu Perfil"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					sair();
				},
				title: !(forcarLabel || !colapsado) ? "Terminar sessão" : void 0,
				className: cn("mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", !(forcarLabel || !colapsado) && "justify-center px-0"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 shrink-0" }), (forcarLabel || !colapsado) && "Terminar sessão"]
			})
		]
	});
	const marca = (mostrarLabel = true) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3 px-4 py-4", !mostrarLabel && "justify-center px-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
		}), mostrarLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-bold text-sidebar-foreground",
				children: "IoT Energia"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-primary",
				children: "CAALÁ"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("relative hidden shrink-0 flex-col bg-sidebar border-r border-sidebar-border transition-[width] duration-200 lg:flex", colapsado ? "w-16" : "w-64"),
				children: [
					marca(!colapsado),
					nav(),
					perfilUsuario(!colapsado),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: alternarColapso,
						"aria-label": colapsado ? "Expandir menu" : "Colapsar menu",
						className: "absolute -right-3.5 top-20 z-20 grid h-7 w-7 place-items-center rounded-full border border-border bg-card text-primary shadow-md transition-transform hover:scale-110 hover:bg-accent",
						children: colapsado ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
					})
				]
			}),
			aberto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/50",
					onClick: () => setAberto(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "absolute left-0 top-0 flex h-full w-64 flex-col bg-sidebar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1",
								children: marca(true)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setAberto(false),
							className: "absolute right-3 top-4 text-sidebar-foreground/70",
							"aria-label": "Fechar menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						}),
						nav(true),
						perfilUsuario(true)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "lg:hidden",
								onClick: () => setAberto(true),
								"aria-label": "Abrir menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate text-base font-semibold sm:text-lg",
									children: titulo
								}), descricao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: descricao
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: alternar,
								"aria-label": "Alternar tema",
								children: tema === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-2 rounded-lg border border-border px-3 py-1.5 sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs font-semibold",
										children: rotulosPerfil[sessao.perfil]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-[11px] text-primary",
										children: "Online"
									})]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-w-0 flex-1 p-4 sm:p-6",
						children
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "border-t border-border px-4 py-3 text-center text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "mr-1 inline h-3 w-3" }), " Sistema de Monitoramento Inteligente de Energia — Caála"]
					})
				]
			})
		]
	});
}
//#endregion
export { AppShell as t };
