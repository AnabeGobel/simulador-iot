import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as supabase, n as Label, t as Input } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as KeyRound, R as Eye, j as LoaderCircle, t as Zap, z as EyeOff } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/redefinir-senha-DRqcvxVT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RedefinirSenha() {
	const navigate = useNavigate();
	const [pronto, setPronto] = (0, import_react.useState)(false);
	const [linkInvalido, setLinkInvalido] = (0, import_react.useState)(false);
	const [novaSenha, setNovaSenha] = (0, import_react.useState)("");
	const [confirmar, setConfirmar] = (0, import_react.useState)("");
	const [ver, setVer] = (0, import_react.useState)(false);
	const [aGuardar, setAGuardar] = (0, import_react.useState)(false);
	const [erro, setErro] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setPronto(true);
			else setLinkInvalido(true);
		});
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErro(null);
		if (novaSenha.length < 6) {
			setErro("A palavra-passe deve conter pelo menos 6 caracteres.");
			return;
		}
		if (novaSenha !== confirmar) {
			setErro("As palavras-passe não coincidem.");
			return;
		}
		setAGuardar(true);
		try {
			const { error } = await supabase.auth.updateUser({ password: novaSenha });
			if (error) {
				setErro("Não foi possível atualizar a palavra-passe. Peça um novo link de recuperação.");
				return;
			}
			toast.success("Palavra-passe atualizada com sucesso. Já pode entrar.");
			await supabase.auth.signOut();
			navigate({ to: "/login" });
		} finally {
			setAGuardar(false);
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
					children: "Definir nova palavra-passe"
				}),
				linkInvalido && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive",
					children: "Este link é inválido ou já expirou. Peça um novo pedido de recuperação."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/recuperar-senha",
						className: "font-medium text-primary",
						children: "Pedir novo link"
					})
				})] }),
				pronto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-4",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "novaSenha",
								children: "Nova palavra-passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "novaSenha",
									type: ver ? "text" : "password",
									required: true,
									minLength: 6,
									value: novaSenha,
									onChange: (e) => setNovaSenha(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setVer((v) => !v),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
									children: ver ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "confirmar",
								children: "Confirmar nova palavra-passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "confirmar",
								type: ver ? "text" : "password",
								required: true,
								value: confirmar,
								onChange: (e) => setConfirmar(e.target.value)
							})]
						}),
						erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-destructive/10 p-3 text-center text-sm font-medium text-destructive",
							children: erro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full",
							disabled: aGuardar,
							children: [aGuardar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-2 h-4 w-4" }), "Guardar nova palavra-passe"]
						})
					]
				}),
				!pronto && !linkInvalido && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A validar o link…"]
				})
			]
		})
	});
}
//#endregion
export { RedefinirSenha as component };
