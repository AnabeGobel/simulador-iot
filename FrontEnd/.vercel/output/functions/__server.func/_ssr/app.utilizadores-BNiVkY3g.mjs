import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as api, f as rotulosPerfil, m as useAuth, n as Label, t as Input } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as Eye, c as Trash2, j as LoaderCircle, n as X, o as UserPlus, z as EyeOff } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { n as Painel } from "./ui-kit-NTPR4QmO.mjs";
import { t as Switch } from "./switch-DtEVXaE2.mjs";
import { t as ConfirmarAcaoDialog } from "./ConfirmarAcaoDialog-DG7Tt8ZW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.utilizadores-BNiVkY3g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var matriz = [
	[
		"Dashboard",
		"✅",
		"✅",
		"✅"
	],
	[
		"Monitoramento",
		"✅",
		"✅",
		"✅"
	],
	[
		"Estações",
		"✅",
		"✅",
		"👁️"
	],
	[
		"Sensores",
		"✅",
		"✅",
		"👁️"
	],
	[
		"Anomalias",
		"✅",
		"✅",
		"👁️"
	],
	[
		"Alertas",
		"✅",
		"✅",
		"✅"
	],
	[
		"Grafana",
		"✅",
		"✅",
		"👁️"
	],
	[
		"Relatórios",
		"✅",
		"✅",
		"👁️"
	],
	[
		"Exportar dados",
		"✅",
		"✅",
		"❌"
	],
	[
		"Utilizadores",
		"✅",
		"❌",
		"❌"
	],
	[
		"Configurar limites",
		"✅",
		"❌",
		"❌"
	],
	[
		"Configurações",
		"✅",
		"❌",
		"❌"
	]
];
var DESCRICOES_PERFIL = {
	admin: "Acesso total ao sistema, incluindo gestão de utilizadores, configurações globais e definição de limites.",
	tecnico: "Pode monitorar estações, consultar sensores, analisar anomalias, exportar dados e gerar relatórios.",
	operador: "Acesso focado em visualização do dashboard, relatórios e recepção de alertas operacionais."
};
function Utilizadores() {
	const { pode, carregado, sessao } = useAuth();
	const navigate = useNavigate();
	const [lista, setLista] = (0, import_react.useState)([]);
	const [carregandoTabela, setCarregandoTabela] = (0, import_react.useState)(true);
	const [salvando, setSalvando] = (0, import_react.useState)(false);
	const [modalAberto, setModalAberto] = (0, import_react.useState)(false);
	const [idsEmRemocao, setIdsEmRemocao] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [utilizadorParaRemover, setUtilizadorParaRemover] = (0, import_react.useState)(null);
	const [nome, setNome] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [telefone, setTelefone] = (0, import_react.useState)("");
	const [senha, setSenha] = (0, import_react.useState)("");
	const [confirmarSenha, setConfirmarSenha] = (0, import_react.useState)("");
	const [verSenha, setVerSenha] = (0, import_react.useState)(false);
	const [perfil, setPerfil] = (0, import_react.useState)("tecnico");
	const [ativa, setAtiva] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (carregado && !pode("utilizadores")) navigate({
			to: "/app",
			replace: true
		});
	}, [
		carregado,
		pode,
		navigate
	]);
	const buscarUtilizadores = async () => {
		setCarregandoTabela(true);
		try {
			const dadosMapeados = (await api.get("/usuarios")).data.map((u) => ({
				id: u.id,
				nome: u.nome_completo || u.nome || "Sem Nome",
				email: u.email,
				perfil: u.perfil?.toLowerCase() === "administrador" ? "admin" : u.perfil?.toLowerCase(),
				ultimoAcesso: u.ultimo_acesso ? new Date(u.ultimo_acesso).toLocaleDateString("pt-AO") : "Nunca",
				ativo: u.estado === "Ativa" || u.ativo === true
			}));
			setLista(dadosMapeados);
		} catch (err) {
			toast.error("Erro ao carregar a lista de utilizadores da API.");
		} finally {
			setCarregandoTabela(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (carregado && pode("utilizadores")) buscarUtilizadores();
	}, [carregado, pode]);
	const limparFormulario = () => {
		setNome("");
		setEmail("");
		setTelefone("");
		setSenha("");
		setConfirmarSenha("");
		setVerSenha(false);
		setPerfil("tecnico");
		setAtiva(true);
	};
	const handleSalvarUtilizador = async (e) => {
		e.preventDefault();
		const emailLimpo = email.trim().toLowerCase();
		if (!emailLimpo.includes("@") || !emailLimpo.includes(".")) {
			toast.error("Por favor, introduza um e-mail válido.");
			return;
		}
		if (senha.length < 6) {
			toast.error("A palavra-passe deve conter pelo menos 6 caracteres.");
			return;
		}
		if (senha !== confirmarSenha) {
			toast.error("A palavra-passe e a confirmação não coincidem.");
			return;
		}
		setSalvando(true);
		try {
			const perfilBackend = perfil === "admin" ? "Administrador" : perfil === "tecnico" ? "Técnico" : "Operador";
			await api.post("/auth/registrar", {
				email: emailLimpo,
				password: senha,
				nome_completo: nome.trim(),
				username: emailLimpo.split("@")[0],
				telefone: telefone.trim(),
				perfil: perfilBackend
			});
			toast.success(`Utilizador ${nome.trim()} criado com sucesso!`);
			await buscarUtilizadores();
			setModalAberto(false);
			limparFormulario();
		} catch (err) {
			const mensagemErro = err.response?.data?.error || "Erro ao criar conta no servidor.";
			toast.error(mensagemErro);
		} finally {
			setSalvando(false);
		}
	};
	const handleToggleEstado = async (id, novoEstado) => {
		try {
			const estadoTexto = novoEstado ? "Ativa" : "Inativa";
			await api.patch(`/usuarios/${id}`, { estado: estadoTexto });
			setLista((l) => l.map((x) => x.id === id ? {
				...x,
				ativo: novoEstado
			} : x));
			toast.success(`Conta ${novoEstado ? "ativada" : "bloqueada"}.`);
		} catch (err) {
			toast.error("Erro ao alterar o estado da conta no servidor.");
		}
	};
	const handleRemoverUtilizador = async (utilizador) => {
		setIdsEmRemocao((prev) => new Set(prev).add(utilizador.id));
		try {
			await api.delete(`/usuarios/${utilizador.id}`);
			setLista((prev) => prev.filter((u) => u.id !== utilizador.id));
			setUtilizadorParaRemover(null);
			toast.success(`Utilizador ${utilizador.nome} removido.`);
		} catch (err) {
			toast.error(err?.response?.data?.erro || "Erro ao remover utilizador.");
		} finally {
			setIdsEmRemocao((prev) => {
				const proximo = new Set(prev);
				proximo.delete(utilizador.id);
				return proximo;
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Utilizadores",
		descricao: "Gestão de contas, perfis e permissões",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "min-w-0 truncate text-sm text-muted-foreground",
					children: [lista.length, " contas registadas"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setModalAberto(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-2 h-4 w-4" }), " Adicionar utilizador"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
				titulo: "Todos os utilizadores",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: carregandoTabela ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center p-8 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }), " A carregar utilizadores do Supabase..."]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-xs uppercase text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Nome"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "E-mail"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Perfil"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Último acesso"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Conta ativa"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Ações"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: lista.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 font-medium",
									children: u.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 text-muted-foreground",
									children: u.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: rotulosPerfil[u.perfil] || u.perfil
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 text-muted-foreground",
									children: u.ultimoAcesso
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: u.ativo,
										onCheckedChange: (v) => handleToggleEstado(u.id, v)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: u.id !== sessao?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										disabled: idsEmRemocao.has(u.id),
										onClick: () => setUtilizadorParaRemover(u),
										title: "Remover utilizador",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
									})
								})
							] }, u.id))
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmarAcaoDialog, {
				aberto: !!utilizadorParaRemover,
				titulo: "Remover utilizador?",
				descricao: utilizadorParaRemover ? `A conta de ${utilizadorParaRemover.nome} (${utilizadorParaRemover.email}) será removida e deixará de aceder ao sistema. Esta ação não pode ser desfeita.` : "",
				textoConfirmar: "Remover utilizador",
				carregando: utilizadorParaRemover ? idsEmRemocao.has(utilizadorParaRemover.id) : false,
				onCancelar: () => setUtilizadorParaRemover(null),
				onConfirmar: () => utilizadorParaRemover && void handleRemoverUtilizador(utilizadorParaRemover)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Painel, {
				titulo: "Matriz de permissões",
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[520px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-xs uppercase text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Funcionalidade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Admin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Técnico"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Operador"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: matriz.map((linha) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: linha[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: linha[1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: linha[2]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: linha[3]
								})
							] }, linha[0]))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "👁️ significa somente consulta."
				})]
			}),
			modalAberto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Adicionar Utilizador"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Registe uma nova conta no sistema"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => {
								setModalAberto(false);
								limparFormulario();
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSalvarUtilizador,
						className: "mt-4 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-semibold uppercase tracking-wider text-primary",
										children: "Dados Pessoais"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "nome",
											children: ["Nome completo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "nome",
											placeholder: "Ex: Manuel António",
											required: true,
											value: nome,
											onChange: (e) => setNome(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "email",
												children: ["E-mail ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "email",
												type: "email",
												placeholder: "utilizador@caala.ao",
												required: true,
												value: email,
												onChange: (e) => setEmail(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "telefone",
												children: "Telefone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "telefone",
												placeholder: "+244 923 000 000",
												value: telefone,
												onChange: (e) => setTelefone(e.target.value)
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-primary",
									children: "Conta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "senha",
											children: ["Palavra-passe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "senha",
												type: verSenha ? "text" : "password",
												placeholder: "Mínimo 6 caracteres",
												required: true,
												value: senha,
												onChange: (e) => setSenha(e.target.value)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setVerSenha((v) => !v),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
												children: verSenha ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "confirmarSenha",
											children: ["Confirmar palavra-passe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "confirmarSenha",
											type: verSenha ? "text" : "password",
											placeholder: "Repita a palavra-passe",
											required: true,
											value: confirmarSenha,
											onChange: (e) => setConfirmarSenha(e.target.value)
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-semibold uppercase tracking-wider text-primary",
										children: "Acesso"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "perfil",
												children: ["Perfil ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "perfil",
												className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
												value: perfil,
												onChange: (e) => setPerfil(e.target.value),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "admin",
														children: "Administrador"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "tecnico",
														children: "Técnico"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "operador",
														children: "Operador"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground mb-0.5",
													children: rotulosPerfil[perfil]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: DESCRICOES_PERFIL[perfil] })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-6 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center gap-2 text-sm cursor-pointer font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "estadoConta",
													checked: ativa,
													onChange: () => setAtiva(true),
													className: "accent-primary h-4 w-4"
												}), "Ativa"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center gap-2 text-sm cursor-pointer font-medium text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "estadoConta",
													checked: !ativa,
													onChange: () => setAtiva(false),
													className: "accent-primary h-4 w-4"
												}), "Inativa"]
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-3 border-t border-border pt-4 mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => {
										setModalAberto(false);
										limparFormulario();
									},
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: salvando,
									children: salvando ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " A criar..."] }) : "Criar Utilizador"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Utilizadores as component };
