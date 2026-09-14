import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as api } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as Eye, Y as Check, j as LoaderCircle, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { n as Painel, r as SeveridadeBadge } from "./ui-kit-NTPR4QmO.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CA_Ke5Cp.mjs";
import { t as useRealtimePolling } from "./use-realtime-polling-AiUw0hBg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.alertas-lYt1XpMa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mapearAlertaApi(a) {
	const dataRaw = a.data_ocorrencia || a.created_at;
	return {
		id: String(a.id),
		tipo: a.tipo,
		estacao: a.estacoes?.codigo ? `${a.estacoes.codigo} (${a.estacoes.nome})` : a.estacao_id ?? "—",
		valor: a.valor != null ? String(a.valor) : "—",
		limite: a.limite != null ? String(a.limite) : "—",
		severidade: a.severidade ?? "ATENCAO",
		data: dataRaw ? new Date(dataRaw).toLocaleString("pt-PT") : "—",
		lido: !!a.lido,
		resolvido: !!a.resolvido
	};
}
function Alertas() {
	const [lista, setLista] = (0, import_react.useState)([]);
	const [carregando, setCarregando] = (0, import_react.useState)(true);
	const [aba, setAba] = (0, import_react.useState)("ativos");
	const buscarAlertas = async (mostrarCarregamento = false) => {
		if (mostrarCarregamento) setCarregando(true);
		try {
			const resposta = await api.get("/alertas");
			setLista((resposta.data ?? []).map(mapearAlertaApi));
		} catch (err) {
			toast.error("Erro ao carregar os alertas do servidor.");
		} finally {
			setCarregando(false);
		}
	};
	(0, import_react.useEffect)(() => {
		buscarAlertas(true);
	}, []);
	useRealtimePolling(buscarAlertas);
	const filtrados = lista.filter((a) => aba === "ativos" ? !a.resolvido : aba === "historico" ? a.resolvido : true);
	const marcarLido = async (id) => {
		try {
			await api.patch(`/alertas/${id}/lido`);
			setLista((l) => l.map((x) => x.id === id ? {
				...x,
				lido: true
			} : x));
			toast.success("Alerta marcado como lido.");
		} catch {
			toast.error("Erro ao marcar alerta como lido.");
		}
	};
	const resolver = async (id) => {
		try {
			await api.patch(`/alertas/${id}/resolver`);
			setLista((l) => l.map((x) => x.id === id ? {
				...x,
				resolvido: true,
				lido: true
			} : x));
			toast.success("Alerta marcado como resolvido.");
		} catch (err) {
			toast.error(err?.response?.data?.erro || "Erro ao resolver alerta.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Alertas",
		descricao: "Alertas gerados automaticamente pelas regras de limites",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: aba,
				onValueChange: setAba,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "ativos",
						children: "Ativos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "historico",
						children: "Histórico"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "todos",
						children: "Todos"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => buscarAlertas(true),
				disabled: carregando,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `mr-2 h-4 w-4 ${carregando ? "animate-spin" : ""}` }), "Atualizar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
			titulo: `${filtrados.length} alertas`,
			className: "mt-4",
			children: carregando ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A carregar alertas…"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-3",
				children: [filtrados.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `rounded-lg border p-3 transition-colors ${!a.lido ? "border-primary/50 bg-primary/5" : "border-border"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate font-semibold",
									children: [
										a.tipo,
										" — ",
										a.estacao
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 truncate text-xs text-muted-foreground",
									children: [
										"Valor: ",
										a.valor,
										" · Limite: ",
										a.limite,
										" · ",
										a.data
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs",
									children: [
										"Estado:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: a.resolvido ? "text-emerald-600 font-medium" : "text-destructive font-medium",
											children: a.resolvido ? "Resolvido" : "Não resolvido"
										}),
										!a.lido && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 font-medium text-primary",
											children: "• Novo"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeveridadeBadge, { nivel: a.severidade })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							disabled: a.lido,
							onClick: () => marcarLido(a.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-1.5 h-3.5 w-3.5" }), " Marcar como lido"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							disabled: a.resolvido,
							onClick: () => resolver(a.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1.5 h-3.5 w-3.5" }), " Resolver"]
						})]
					})]
				}, a.id)), filtrados.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "Nenhum alerta encontrado nesta secção."
				})]
			})
		})]
	});
}
//#endregion
export { Alertas as component };
