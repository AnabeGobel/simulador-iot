import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { C as Moon, E as Mail, G as ChevronUp, J as ChevronDown, M as KeyRound, O as LogIn, R as Eye, Y as Check, a as User, j as LoaderCircle, k as Lock, nt as ArrowLeft, o as UserPlus, t as Zap, u as Sun, z as EyeOff } from "../_libs/lucide-react.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { i as cn, n as Button } from "./router-azIfNJtr2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabaseClient-BpKIcXJq.js
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_qZO3uulPWuKhqHP1ytfULg_EpoTMm_q",
	"VITE_SUPABASE_URL": "https://ahdterfyzwpkksbjnkox.supabase.co"
}["VITE_SUPABASE_URL"];
var supabaseAnonKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_qZO3uulPWuKhqHP1ytfULg_EpoTMm_q",
	"VITE_SUPABASE_URL": "https://ahdterfyzwpkksbjnkox.supabase.co"
}["VITE_SUPABASE_ANON_KEY"];
if (!supabaseUrl || !supabaseAnonKey) console.error("❌ VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não definidos no .env do FrontEnd.");
var supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-azIfNJtr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-D_4xMVtR.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var API_URL = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
var api = axios.create({
	baseURL: API_URL,
	headers: { "Content-Type": "application/json" }
});
var renovacaoEmAndamento = null;
async function renovarToken() {
	if (!renovacaoEmAndamento) {
		const refreshToken = localStorage.getItem("@iot_caala:refresh_token");
		if (!refreshToken) return null;
		renovacaoEmAndamento = supabase.auth.refreshSession({ refresh_token: refreshToken }).then(({ data, error }) => {
			if (error || !data.session) return null;
			localStorage.setItem("@iot_caala:token", data.session.access_token);
			if (data.session.refresh_token) localStorage.setItem("@iot_caala:refresh_token", data.session.refresh_token);
			return data.session.access_token;
		}).finally(() => {
			renovacaoEmAndamento = null;
		});
	}
	return renovacaoEmAndamento;
}
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("@iot_caala:token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
}, (error) => Promise.reject(error));
api.interceptors.response.use((response) => response, async (error) => {
	const config = error.config;
	if (error.response?.status === 401 && config && !config._tokenRetry) {
		config._tokenRetry = true;
		const token = await renovarToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			return api.request(config);
		}
		localStorage.removeItem("@iot_caala:token");
		localStorage.removeItem("@iot_caala:refresh_token");
		localStorage.removeItem("@iot_caala:usuario");
		if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) window.location.replace("/login");
	}
	return Promise.reject(error);
});
var obterEstacoes = async () => {
	return (await api.get("/estacoes")).data;
};
var obterDadosRelatorio = async (params) => {
	return (await api.get("/relatorios/gerar", { params })).data;
};
var rotulosPerfil = {
	admin: "Administrador",
	tecnico: "Técnico",
	operador: "Operador"
};
function perfilBackendParaFrontend(p) {
	const v = (p || "").toLowerCase();
	if (v.startsWith("admin")) return "admin";
	if (v.startsWith("t")) return "tecnico";
	return "operador";
}
var PERMISSOES_VER = {
	admin: [
		"dashboard",
		"monitoramento",
		"estacoes",
		"sensores",
		"anomalias",
		"alertas",
		"grafana",
		"relatorios",
		"utilizadores",
		"configuracoes"
	],
	tecnico: [
		"dashboard",
		"monitoramento",
		"estacoes",
		"sensores",
		"anomalias",
		"alertas",
		"grafana",
		"relatorios"
	],
	operador: [
		"dashboard",
		"monitoramento",
		"estacoes",
		"sensores",
		"anomalias",
		"alertas",
		"grafana",
		"relatorios"
	]
};
var PERMISSOES_EDITAR = {
	admin: [
		"estacoes",
		"sensores",
		"utilizadores",
		"configuracoes"
	],
	tecnico: [
		"estacoes",
		"sensores",
		"alertas"
	],
	operador: []
};
var AuthContext = (0, import_react.createContext)(void 0);
var CHAVE_TOKEN = "@iot_caala:token";
var CHAVE_REFRESH_TOKEN = "@iot_caala:refresh_token";
var CHAVE_USUARIO = "@iot_caala:usuario";
function AuthProvider({ children }) {
	const [sessao, setSessao] = (0, import_react.useState)(null);
	const [carregado, setCarregado] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const token = localStorage.getItem(CHAVE_TOKEN);
		const usuarioBruto = localStorage.getItem(CHAVE_USUARIO);
		if (token && usuarioBruto) try {
			setSessao(JSON.parse(usuarioBruto));
		} catch {
			localStorage.removeItem(CHAVE_TOKEN);
			localStorage.removeItem(CHAVE_USUARIO);
		}
		setCarregado(true);
	}, []);
	const entrar = async (email, senha) => {
		try {
			const { session, usuario } = (await api.post("/auth/login", {
				email,
				password: senha
			})).data;
			if (!session?.access_token) return {
				ok: false,
				erro: "Resposta inválida do servidor."
			};
			if (usuario?.estado === "Inativa") return {
				ok: false,
				erro: "Esta conta está inativa. Contacte o administrador."
			};
			const novaSessao = {
				id: usuario?.id ?? "",
				nome: usuario?.nome_completo ?? usuario?.nome ?? email,
				email: usuario?.email ?? email,
				perfil: perfilBackendParaFrontend(usuario?.perfil),
				entradaEm: (/* @__PURE__ */ new Date()).toISOString()
			};
			localStorage.setItem(CHAVE_TOKEN, session.access_token);
			if (session.refresh_token) localStorage.setItem(CHAVE_REFRESH_TOKEN, session.refresh_token);
			localStorage.setItem(CHAVE_USUARIO, JSON.stringify(novaSessao));
			setSessao(novaSessao);
			return { ok: true };
		} catch (err) {
			return {
				ok: false,
				erro: err?.response?.data?.erro || "E-mail ou palavra-passe incorretos."
			};
		}
	};
	const sair = () => {
		localStorage.removeItem(CHAVE_TOKEN);
		localStorage.removeItem(CHAVE_REFRESH_TOKEN);
		localStorage.removeItem(CHAVE_USUARIO);
		setSessao(null);
		if (typeof window !== "undefined") window.location.replace("/login");
	};
	const pode = (area) => !!sessao && PERMISSOES_VER[sessao.perfil].includes(area);
	const podeEditar = (area) => !!sessao && PERMISSOES_EDITAR[sessao.perfil].includes(area);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			sessao,
			carregado,
			entrar,
			sair,
			pode,
			podeEditar
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
	return ctx;
}
var ThemeContext = (0, import_react.createContext)({
	tema: "light",
	alternar: () => {}
});
var KEY = "iot-energia-tema";
function ThemeProvider({ children }) {
	const [tema, setTema] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const inicial = localStorage.getItem(KEY) ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTema(inicial);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", tema === "dark");
	}, [tema]);
	const alternar = () => {
		setTema((t) => {
			const novo = t === "dark" ? "light" : "dark";
			localStorage.setItem(KEY, novo);
			return novo;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			tema,
			alternar
		},
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "IoT Energia Caálá" },
			{
				name: "description",
				content: "Sistema de monitorização de energia IoT"
			},
			{
				name: "author",
				content: "IoT Caálá"
			},
			{
				property: "og:title",
				content: "IoT Energia Caálá"
			},
			{
				property: "og:description",
				content: "Sistema de monitorização de energia IoT"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "google",
				content: "notranslate"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			type: "image/svg+xml",
			href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg>"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt",
		translate: "no",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			suppressHydrationWarning: true,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] }) })
	});
}
var $$splitComponentImporter$14 = () => import("./routes-D0yRO_JE.mjs");
var Route$17 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "IoT Energia Caálá — Monitoramento Inteligente de Energia" }, {
		name: "description",
		content: "Sistema de monitoramento em tempo real de infraestruturas elétricas com sensores IoT, deteção de anomalias e alertas inteligentes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./app-DpnSEiVG.mjs");
var Route$16 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var Route$15 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Login — IoT Energia Caálá" },
		{
			name: "description",
			content: "Aceda à sua conta do sistema de monitoramento IoT Energia Caálá."
		},
		{
			property: "og:title",
			content: "Login — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Entre para continuar a monitorar a sua infraestrutura."
		}
	] }),
	component: LoginPage
});
function LoginPage() {
	const { entrar, sessao, carregado } = useAuth();
	const { tema, alternar } = useTheme();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [senha, setSenha] = (0, import_react.useState)("");
	const [ver, setVer] = (0, import_react.useState)(false);
	const [erro, setErro] = (0, import_react.useState)(null);
	const [aEntrar, setAEntrar] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (carregado && sessao) navigate({
			to: "/app",
			replace: true
		});
	}, [
		carregado,
		sessao,
		navigate
	]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErro(null);
		setAEntrar(true);
		try {
			const res = await entrar(email, senha);
			if (!res.ok) setErro(res.erro ?? "Falha ao entrar.");
			else navigate({
				to: "/app",
				replace: true
			});
		} finally {
			setAEntrar(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center bg-background p-4 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-4 top-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: alternar,
				"aria-label": "Alternar tema",
				children: tema === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold tracking-tight",
							children: "IoT Energia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-primary",
							children: "CAALÁ"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold",
						children: "Acesse a sua conta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Informe as suas credenciais para aceder ao sistema"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "E-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									required: true,
									className: "pl-9",
									placeholder: "seu@email.com",
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "senha",
								children: "Palavra-passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "senha",
										type: ver ? "text" : "password",
										required: true,
										className: "px-9",
										placeholder: "A sua palavra-passe",
										value: senha,
										onChange: (e) => setSenha(e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setVer((v) => !v),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
										"aria-label": "Mostrar palavra-passe",
										children: ver ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-muted-foreground cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, { id: "lembrar" }), " Lembrar-me"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/recuperar-senha",
								className: "font-medium text-primary hover:underline",
								children: "Esqueceu a palavra-passe?"
							})]
						}),
						erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-destructive/10 p-3 text-center text-sm font-medium text-destructive",
							children: erro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: aEntrar,
							children: aEntrar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " A entrar..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "mr-2 h-4 w-4" }), " Entrar"] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: "Não tem conta? Contacte o administrador do sistema."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Voltar à página inicial"]
				})
			]
		})]
	});
}
var Route$14 = createFileRoute("/recuperar-senha")({
	head: () => ({ meta: [
		{ title: "Recuperar palavra-passe — IoT Energia Caálá" },
		{
			name: "description",
			content: "Recupere o acesso à sua conta do sistema de monitoramento IoT Energia Caálá."
		},
		{
			property: "og:title",
			content: "Recuperar palavra-passe — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Enviaremos instruções de recuperação para o seu e-mail."
		}
	] }),
	component: RecuperarPage
});
function RecuperarPage() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [enviado, setEnviado] = (0, import_react.useState)(false);
	const [aEnviar, setAEnviar] = (0, import_react.useState)(false);
	const [erro, setErro] = (0, import_react.useState)(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErro(null);
		setAEnviar(true);
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: `${window.location.origin}/redefinir-senha` });
			if (error) {
				console.error("Erro do Supabase ao pedir recuperação:", error);
				setErro(`Erro do Supabase: ${error.message} (status ${error.status ?? "?"})`);
				return;
			}
			setEnviado(true);
		} finally {
			setAEnviar(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold",
						children: "IoT Energia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-primary",
						children: "CAALÁ"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 text-2xl font-bold",
					children: "Recuperar palavra-passe"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Informe o seu e-mail e enviaremos as instruções de recuperação."
				}),
				enviado ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 rounded-lg bg-success/10 px-4 py-3 text-sm text-success",
					children: "Se existir uma conta com esse e-mail, as instruções foram enviadas. Verifique a sua caixa de correio (e a pasta de spam)."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-4",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "E-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									required: true,
									className: "pl-9",
									placeholder: "seu@email.com",
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})]
							})]
						}),
						erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-destructive/10 p-3 text-center text-xs font-medium text-destructive",
							children: erro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full",
							disabled: aEnviar,
							children: [aEnviar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-2 h-4 w-4" }), "Enviar instruções"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-medium text-primary",
						children: "Voltar ao login"
					})
				})
			]
		})
	});
}
var $$splitComponentImporter$12 = () => import("./redefinir-senha-DRqcvxVT.mjs");
var Route$13 = createFileRoute("/redefinir-senha")({
	head: () => ({ meta: [{ title: "Definir nova palavra-passe — IoT Energia Caálá" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var Route$12 = createFileRoute("/registo")({
	head: () => ({ meta: [
		{ title: "Registo — IoT Energia Caálá" },
		{
			name: "description",
			content: "Crie a sua conta de acesso ao sistema IoT Energia Caálá."
		},
		{
			property: "og:title",
			content: "Registo — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Preencha os dados para criar a sua conta de acesso."
		}
	] }),
	component: RegistoPage
});
function RegistoPage() {
	const { registar, entrar } = useAuth();
	const navigate = useNavigate();
	const [nome, setNome] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [senha, setSenha] = (0, import_react.useState)("");
	const [confirmar, setConfirmar] = (0, import_react.useState)("");
	const [perfil, setPerfil] = (0, import_react.useState)("operador");
	const [aceite, setAceite] = (0, import_react.useState)(false);
	const [erro, setErro] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden flex-col justify-center gap-4 border-r border-border bg-muted/40 p-10 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: "IoT Energia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-primary",
							children: "CAALÁ"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 text-2xl font-bold",
						children: "Crie a sua conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Preencha os dados ao lado para criar a sua conta de acesso ao sistema."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Registo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Crie a sua conta para começar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 space-y-4",
						onSubmit: (e) => {
							e.preventDefault();
							if (senha !== confirmar) return setErro("As palavras-passe não coincidem.");
							if (!aceite) return setErro("Deve aceitar os termos de uso.");
							registar(nome, email, perfil);
							entrar(email, senha);
							navigate({ to: "/app" });
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "nome",
											children: "Nome completo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "nome",
												required: true,
												className: "pl-9",
												placeholder: "O seu nome completo",
												value: nome,
												onChange: (e) => setNome(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "email",
											children: "E-mail"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "email",
												type: "email",
												required: true,
												className: "pl-9",
												placeholder: "seu@email.com",
												value: email,
												onChange: (e) => setEmail(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "senha",
											children: "Palavra-passe"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "senha",
												type: "password",
												required: true,
												className: "pl-9",
												placeholder: "Crie uma palavra-passe",
												value: senha,
												onChange: (e) => setSenha(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "confirmar",
											children: "Confirmar palavra-passe"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "confirmar",
												type: "password",
												required: true,
												className: "pl-9",
												placeholder: "Confirme a palavra-passe",
												value: confirmar,
												onChange: (e) => setConfirmar(e.target.value)
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Perfil" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: perfil,
									onValueChange: (v) => setPerfil(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o seu perfil" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "admin",
											children: "Administrador"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "tecnico",
											children: "Técnico"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "operador",
											children: "Operador"
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: aceite,
									onCheckedChange: (v) => setAceite(v === true),
									className: "mt-0.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Concordo com os ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "Termos de Uso"
									}),
									" e a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "Política de Privacidade"
									})
								] })]
							}),
							erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive",
								children: erro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-2 h-4 w-4" }), " Criar Conta"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: [
							"Já tem uma conta?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "font-medium text-primary",
								children: "Faça login"
							})
						]
					})
				]
			})]
		})
	});
}
var $$splitComponentImporter$11 = () => import("./relatorios-BSpQcOF6.mjs");
var Route$11 = createFileRoute("/relatorios")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./sobre-gNQlh90L.mjs");
var Route$10 = createFileRoute("/sobre")({
	head: () => ({ meta: [{ title: "Sobre a Plataforma — SIMIE-Caála" }, {
		name: "description",
		content: "Saiba mais sobre o SIMIE-Caála, um sistema inteligente para monitoramento contínuo e análise das infraestruturas elétricas no município da Caála."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./app.index-mnLK71ri.mjs");
var Route$9 = createFileRoute("/app/")({
	head: () => ({ meta: [
		{ title: "Dashboard — IoT Energia Caálá" },
		{
			name: "description",
			content: "Visão geral das estações, alertas e consumo energético."
		},
		{
			property: "og:title",
			content: "Dashboard — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Visão geral em tempo real da rede monitorada."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./app.alertas-lYt1XpMa.mjs");
var Route$8 = createFileRoute("/app/alertas")({
	head: () => ({ meta: [
		{ title: "Alertas — IoT Energia Caálá" },
		{
			name: "description",
			content: "Alertas ativos e histórico gerado pela deteção de anomalias."
		},
		{
			property: "og:title",
			content: "Alertas — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Consulte, filtre e resolva os alertas da rede."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./app.anomalias-B7vKIj0o.mjs");
var Route$7 = createFileRoute("/app/anomalias")({
	head: () => ({ meta: [
		{ title: "Anomalias — IoT Energia Caálá" },
		{
			name: "description",
			content: "Deteção de sobretensão, sobrecorrente, temperatura elevada e anomalias estruturais."
		},
		{
			property: "og:title",
			content: "Anomalias — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Análise e classificação de severidade das anomalias."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./app.configuracoes-Cq3iMgnr.mjs");
var Route$6 = createFileRoute("/app/configuracoes")({
	head: () => ({ meta: [
		{ title: "Configurações — IoT Energia Caálá" },
		{
			name: "description",
			content: "Limites de deteção, regras de alertas e definições do sistema."
		},
		{
			property: "og:title",
			content: "Configurações — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Configure limites, alertas e o tema do sistema."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./app.estacoes-C3jQuvRP.mjs");
var Route$5 = createFileRoute("/app/estacoes")({
	head: () => ({ meta: [
		{ title: "Estações IoT — IoT Energia Caálá" },
		{
			name: "description",
			content: "Cadastro, estado e gestão das estações IoT de monitoramento."
		},
		{
			property: "og:title",
			content: "Estações IoT — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Todas as estações, estado e última comunicação."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./app.grafana-BLWTIE5m.mjs");
var Route$4 = createFileRoute("/app/grafana")({
	head: () => ({ meta: [
		{ title: "Grafana — IoT Energia Caálá" },
		{
			name: "description",
			content: "Dashboards técnicos de séries temporais: tensão, temperatura e consumo."
		},
		{
			property: "og:title",
			content: "Grafana — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Análise dos dados IoT em séries temporais."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./app.monitoramento-BSzQdSnF.mjs");
var Route$3 = createFileRoute("/app/monitoramento")({
	head: () => ({ meta: [
		{ title: "Monitoramento — IoT Energia Caálá" },
		{
			name: "description",
			content: "Acompanhe tensão, corrente, temperatura, vibração e inclinação em tempo real."
		},
		{
			property: "og:title",
			content: "Monitoramento — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Dados em tempo real das estações IoT da Caála."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./app.perfil-CU5w-Tjf.mjs");
var Route$2 = createFileRoute("/app/perfil")({
	head: () => ({ meta: [
		{ title: "Meu Perfil — IoT Energia Caálá" },
		{
			name: "description",
			content: "Dados da conta, sessão e alteração de palavra-passe."
		},
		{
			property: "og:title",
			content: "Meu Perfil — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Gere a sua conta e a sua palavra-passe."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./app.sensores-8uI-7lxY.mjs");
var Route$1 = createFileRoute("/app/sensores")({
	head: () => ({ meta: [
		{ title: "Sensores — IoT Energia Caálá" },
		{
			name: "description",
			content: "Sensores elétricos e estruturais associados às estações IoT."
		},
		{
			property: "og:title",
			content: "Sensores — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Configuração e estado dos sensores da rede."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./app.utilizadores-BNiVkY3g.mjs");
var Route = createFileRoute("/app/utilizadores")({
	head: () => ({ meta: [
		{ title: "Utilizadores — IoT Energia Caálá" },
		{
			name: "description",
			content: "Gestão de utilizadores, perfis e permissões do sistema."
		},
		{
			property: "og:title",
			content: "Utilizadores — IoT Energia Caálá"
		},
		{
			property: "og:description",
			content: "Controle de acesso por perfil: admin, técnico e operador."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AppRoute = Route$16.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$18
});
var LoginRoute = Route$15.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$18
});
var RecuperarSenhaRoute = Route$14.update({
	id: "/recuperar-senha",
	path: "/recuperar-senha",
	getParentRoute: () => Route$18
});
var RedefinirSenhaRoute = Route$13.update({
	id: "/redefinir-senha",
	path: "/redefinir-senha",
	getParentRoute: () => Route$18
});
var RegistoRoute = Route$12.update({
	id: "/registo",
	path: "/registo",
	getParentRoute: () => Route$18
});
var RelatoriosRoute = Route$11.update({
	id: "/relatorios",
	path: "/relatorios",
	getParentRoute: () => Route$18
});
var SobreRoute = Route$10.update({
	id: "/sobre",
	path: "/sobre",
	getParentRoute: () => Route$18
});
var AppIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppAlertasRoute: Route$8.update({
		id: "/alertas",
		path: "/alertas",
		getParentRoute: () => AppRoute
	}),
	AppAnomaliasRoute: Route$7.update({
		id: "/anomalias",
		path: "/anomalias",
		getParentRoute: () => AppRoute
	}),
	AppConfiguracoesRoute: Route$6.update({
		id: "/configuracoes",
		path: "/configuracoes",
		getParentRoute: () => AppRoute
	}),
	AppEstacoesRoute: Route$5.update({
		id: "/estacoes",
		path: "/estacoes",
		getParentRoute: () => AppRoute
	}),
	AppGrafanaRoute: Route$4.update({
		id: "/grafana",
		path: "/grafana",
		getParentRoute: () => AppRoute
	}),
	AppMonitoramentoRoute: Route$3.update({
		id: "/monitoramento",
		path: "/monitoramento",
		getParentRoute: () => AppRoute
	}),
	AppPerfilRoute: Route$2.update({
		id: "/perfil",
		path: "/perfil",
		getParentRoute: () => AppRoute
	}),
	AppSensoresRoute: Route$1.update({
		id: "/sensores",
		path: "/sensores",
		getParentRoute: () => AppRoute
	}),
	AppUtilizadoresRoute: Route.update({
		id: "/utilizadores",
		path: "/utilizadores",
		getParentRoute: () => AppRoute
	}),
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute,
	RecuperarSenhaRoute,
	RedefinirSenhaRoute,
	RegistoRoute,
	RelatoriosRoute,
	SobreRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { SelectItem as a, api as c, obterEstacoes as d, rotulosPerfil as f, supabase as g, useTheme as h, SelectContent as i, getRouter as l, useAuth as m, Label as n, SelectTrigger as o, router_exports as p, Select as r, SelectValue as s, Input as t, obterDadosRelatorio as u };
