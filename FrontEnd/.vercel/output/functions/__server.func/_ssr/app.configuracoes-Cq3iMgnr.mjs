import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useTheme, m as useAuth, n as Label, t as Input } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as Save, j as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { n as Painel } from "./ui-kit-NTPR4QmO.mjs";
import { a as getLimites, t as atualizarLimites } from "./dataService-CkMqUdAO.mjs";
import { t as Switch } from "./switch-DtEVXaE2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.configuracoes-Cq3iMgnr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Configuracoes() {
	const { pode, podeEditar, carregado } = useAuth();
	const { tema, alternar } = useTheme();
	const navigate = useNavigate();
	const [limites, setLimites] = (0, import_react.useState)([]);
	const [carregando, setCarregando] = (0, import_react.useState)(true);
	const [guardando, setGuardando] = (0, import_react.useState)(false);
	const podeGuardar = podeEditar("configuracoes");
	(0, import_react.useEffect)(() => {
		if (carregado && !pode("configuracoes")) navigate({
			to: "/app",
			replace: true
		});
	}, [
		carregado,
		pode,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		(async () => {
			setCarregando(true);
			try {
				setLimites(await getLimites());
			} catch {
				toast.error("Erro ao carregar os limites do servidor.");
			} finally {
				setCarregando(false);
			}
		})();
	}, []);
	const atualizarCampo = (parametro, campo, valorTexto) => {
		const valor = valorTexto === "" ? null : Number(valorTexto);
		setLimites((ls) => ls.map((l) => l.parametro === parametro ? {
			...l,
			[campo]: valor
		} : l));
	};
	const handleGuardar = async () => {
		setGuardando(true);
		try {
			await atualizarLimites(limites);
			toast.success("Limites guardados. Já se aplicam à próxima leitura de telemetria.");
		} catch (err) {
			toast.error(err?.response?.data?.erro || "Erro ao guardar os limites.");
		} finally {
			setGuardando(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		titulo: "Configurações",
		descricao: "Limites, alertas e definições do sistema",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
				titulo: "Limites de deteção",
				children: carregando ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A carregar limites…"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Estes valores são usados automaticamente sempre que chega uma nova leitura de telemetria, para decidir se gera uma anomalia/alerta e com que severidade. Deixa em branco o mínimo ou o máximo se esse parâmetro não tiver esse limite (ex: corrente só tem máximo)."
						}),
						limites.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "truncate",
								children: [
									l.parametro,
									" (",
									l.unidade,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground",
									children: "Mínimo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: l.valor_minimo ?? "",
									placeholder: "Sem mínimo",
									disabled: !podeGuardar,
									onChange: (e) => atualizarCampo(l.parametro, "valor_minimo", e.target.value)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground",
									children: "Máximo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: l.valor_maximo ?? "",
									placeholder: "Sem máximo",
									disabled: !podeGuardar,
									onChange: (e) => atualizarCampo(l.parametro, "valor_maximo", e.target.value)
								})] })]
							})]
						}, l.parametro)),
						podeGuardar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-2",
							onClick: handleGuardar,
							disabled: guardando,
							children: [guardando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }), "Guardar limites"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "Só um Administrador pode alterar os limites."
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
					titulo: "Sistema",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: "Tema escuro"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: tema === "dark",
									onCheckedChange: alternar
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-muted-foreground",
									children: "Fonte de telemetria"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "MQTT (HiveMQ Cloud)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-muted-foreground",
									children: "Base de dados"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Supabase"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-muted-foreground",
									children: "Rede IoT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "LoRaWAN"
								})]
							})
						]
					})
				})
			})]
		})
	});
}
//#endregion
export { Configuracoes as component };
