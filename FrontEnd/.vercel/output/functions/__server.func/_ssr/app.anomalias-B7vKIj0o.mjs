import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { j as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { n as Painel, r as SeveridadeBadge } from "./ui-kit-NTPR4QmO.mjs";
import { t as useRealtimePolling } from "./use-realtime-polling-AiUw0hBg.mjs";
import { a as getLimites, r as getAnomalias } from "./dataService-CkMqUdAO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.anomalias-B7vKIj0o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filtros = [
	"TODAS",
	"CRITICO",
	"ATENCAO",
	"NORMAL"
];
function formatarLimite(l) {
	if (l.valor_minimo != null && l.valor_maximo != null) return `${l.valor_minimo} – ${l.valor_maximo} ${l.unidade}`;
	if (l.valor_maximo != null) return `máx. ${l.valor_maximo} ${l.unidade}`;
	if (l.valor_minimo != null) return `mín. ${l.valor_minimo} ${l.unidade}`;
	return "—";
}
function Anomalias() {
	const [filtro, setFiltro] = (0, import_react.useState)("TODAS");
	const [todas, setTodas] = (0, import_react.useState)([]);
	const [limites, setLimites] = (0, import_react.useState)([]);
	const [carregando, setCarregando] = (0, import_react.useState)(true);
	const buscarDados = async (mostrarCarregamento = false) => {
		if (mostrarCarregamento) setCarregando(true);
		try {
			const [anomaliasData, limitesData] = await Promise.all([getAnomalias(), getLimites()]);
			setTodas(anomaliasData);
			setLimites(limitesData);
		} catch {
			toast.error("Erro ao carregar as anomalias do servidor.");
		} finally {
			setCarregando(false);
		}
	};
	(0, import_react.useEffect)(() => {
		buscarDados(true);
	}, []);
	useRealtimePolling(buscarDados);
	const lista = todas.filter((a) => filtro === "TODAS" || a.severidade === filtro);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Anomalias",
		descricao: "Comparação dos valores medidos com os limites configurados",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: filtros.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filtro === f ? "default" : "outline",
				onClick: () => setFiltro(f),
				children: f === "TODAS" ? "Todas" : f === "CRITICO" ? "Crítico" : f === "ATENCAO" ? "Atenção" : "Normal"
			}, f))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 xl:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
				titulo: `${lista.length} anomalias detectadas`,
				className: "xl:col-span-2",
				children: carregando ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A carregar anomalias…"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3",
					children: [lista.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-semibold",
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
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: a.descricao
						})]
					}, a.id)), lista.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-6 text-center text-sm text-muted-foreground",
						children: "Nenhuma anomalia com este filtro."
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
				titulo: "Limites configurados",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "divide-y divide-border text-sm",
					children: [limites.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-muted-foreground",
							children: l.parametro
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: formatarLimite(l)
						})]
					}, l.parametro)), limites.length === 0 && !carregando && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-4 text-center text-xs text-muted-foreground",
						children: "Sem limites configurados."
					})]
				})
			})]
		})]
	});
}
//#endregion
export { Anomalias as component };
