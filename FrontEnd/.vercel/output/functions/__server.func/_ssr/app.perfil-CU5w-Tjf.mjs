import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as api, f as rotulosPerfil, m as useAuth, n as Label, t as Input } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as KeyRound, R as Eye, a as User, j as LoaderCircle, z as EyeOff } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { n as Painel } from "./ui-kit-NTPR4QmO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.perfil-CU5w-Tjf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Perfil() {
	const { sessao } = useAuth();
	const [mostrarAtual, setMostrarAtual] = (0, import_react.useState)(false);
	const [mostrarNova, setMostrarNova] = (0, import_react.useState)(false);
	const [mostrarConf, setMostrarConf] = (0, import_react.useState)(false);
	const [senhaAtual, setSenhaAtual] = (0, import_react.useState)("");
	const [novaSenha, setNovaSenha] = (0, import_react.useState)("");
	const [confirmarSenha, setConfirmarSenha] = (0, import_react.useState)("");
	const [aGuardar, setAGuardar] = (0, import_react.useState)(false);
	const [erro, setErro] = (0, import_react.useState)(null);
	const limparFormulario = () => {
		setSenhaAtual("");
		setNovaSenha("");
		setConfirmarSenha("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErro(null);
		if (novaSenha.length < 6) {
			setErro("A nova palavra-passe deve ter pelo menos 6 caracteres.");
			return;
		}
		if (novaSenha !== confirmarSenha) {
			setErro("A confirmação não coincide com a nova palavra-passe.");
			return;
		}
		setAGuardar(true);
		try {
			await api.patch("/usuarios/alterar-senha", {
				senhaAtual,
				novaSenha
			});
			toast.success("Palavra-passe alterada com sucesso.");
			limparFormulario();
		} catch (err) {
			setErro(err?.response?.data?.erro || "Erro ao alterar a palavra-passe.");
		} finally {
			setAGuardar(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		titulo: "Meu Perfil",
		descricao: "Dados da conta e segurança",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Painel, {
				titulo: "Dados da conta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-7 w-7" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-lg font-semibold",
								children: sessao?.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: sessao?.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-primary",
								children: sessao ? rotulosPerfil[sessao.perfil] : ""
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 space-y-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "truncate text-muted-foreground",
							children: "Sessão iniciada em"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium",
							children: sessao ? new Date(sessao.entradaEm).toLocaleString("pt-PT") : "—"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "truncate text-muted-foreground",
							children: "Estado da conta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium text-success",
							children: "Ativa"
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
				titulo: "Alterar palavra-passe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "atual",
								children: "Palavra-passe atual"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "atual",
									type: mostrarAtual ? "text" : "password",
									className: "pr-10",
									required: true,
									value: senhaAtual,
									onChange: (e) => setSenhaAtual(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMostrarAtual(!mostrarAtual),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none",
									tabIndex: -1,
									"aria-label": mostrarAtual ? "Ocultar palavra-passe" : "Mostrar palavra-passe",
									children: mostrarAtual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "nova",
								children: "Nova palavra-passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "nova",
									type: mostrarNova ? "text" : "password",
									className: "pr-10",
									required: true,
									minLength: 6,
									value: novaSenha,
									onChange: (e) => setNovaSenha(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMostrarNova(!mostrarNova),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none",
									tabIndex: -1,
									"aria-label": mostrarNova ? "Ocultar palavra-passe" : "Mostrar palavra-passe",
									children: mostrarNova ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "conf",
								children: "Confirmar nova palavra-passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "conf",
									type: mostrarConf ? "text" : "password",
									className: "pr-10",
									required: true,
									value: confirmarSenha,
									onChange: (e) => setConfirmarSenha(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMostrarConf(!mostrarConf),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none",
									tabIndex: -1,
									"aria-label": mostrarConf ? "Ocultar palavra-passe" : "Mostrar palavra-passe",
									children: mostrarConf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})]
							})]
						}),
						erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive",
							children: erro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: aGuardar,
							children: [aGuardar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-2 h-4 w-4" }), "Alterar palavra-passe"]
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { Perfil as component };
