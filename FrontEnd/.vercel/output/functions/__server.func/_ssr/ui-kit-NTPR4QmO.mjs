import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as cn } from "./router-azIfNJtr2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-kit-NTPR4QmO.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ titulo, valor, legenda, icone, cor = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: titulo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-2xl font-bold sm:text-3xl",
						children: valor
					}),
					legenda && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-xs text-muted-foreground",
						children: legenda
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", {
					primary: "bg-primary/12 text-primary",
					info: "bg-info/12 text-info",
					warning: "bg-warning/15 text-warning",
					destructive: "bg-destructive/12 text-destructive"
				}[cor]),
				children: icone
			})]
		})
	});
}
function Painel({ titulo, acao, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-xl border border-border bg-card p-4 shadow-sm", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "truncate text-sm font-semibold uppercase tracking-wide text-muted-foreground",
				children: titulo
			}), acao]
		}), children]
	});
}
function SeveridadeBadge({ nivel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", {
			NORMAL: "bg-success/15 text-success",
			ATENCAO: "bg-warning/20 text-warning",
			CRITICO: "bg-destructive/15 text-destructive"
		}[nivel]),
		children: {
			NORMAL: "Normal",
			ATENCAO: "Atenção",
			CRITICO: "Crítico"
		}[nivel]
	});
}
function EstadoBadge({ estado }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", {
			online: "bg-success/15 text-success",
			atencao: "bg-warning/20 text-warning",
			offline: "bg-destructive/15 text-destructive"
		}[estado]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), {
			online: "Online",
			atencao: "Atenção",
			offline: "Offline"
		}[estado]]
	});
}
function SomenteLeitura() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground",
		children: "👁️ Somente consulta"
	});
}
//#endregion
export { StatCard as a, SomenteLeitura as i, Painel as n, SeveridadeBadge as r, EstadoBadge as t };
