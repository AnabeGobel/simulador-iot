import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as api, m as useAuth, n as Label, t as Input } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Cpu, S as Plus, c as Trash2, g as Search, j as LoaderCircle, n as X } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { i as SomenteLeitura, n as Painel } from "./ui-kit-NTPR4QmO.mjs";
import { t as Switch } from "./switch-DtEVXaE2.mjs";
import { t as ConfirmarAcaoDialog } from "./ConfirmarAcaoDialog-DG7Tt8ZW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.sensores-8uI-7lxY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TIPOS_SENSORES = [
	"Temperatura",
	"Tensão",
	"Corrente",
	"Energia",
	"Vibração",
	"Inclinação",
	"Aceleração/Movimento",
	"Impacto"
];
var UNIDADES_POR_TIPO = {
	Temperatura: "°C",
	Tensão: "V",
	Corrente: "A",
	Energia: "kWh",
	Vibração: "Hz",
	Inclinação: "°",
	"Aceleração/Movimento": "m/s²",
	Impacto: "G"
};
function mapearSensorApi(s) {
	return {
		id: String(s.id),
		codigo: s.codigo ?? String(s.id),
		nome: s.nome,
		tipo: s.tipo,
		estacao: s.estacoes?.codigo ?? s.estacao_id ?? "—",
		estacaoId: s.estacao_id,
		ultimoValor: s.ultimo_valor ?? 0,
		unidade: s.unidade ?? UNIDADES_POR_TIPO[s.tipo] ?? "",
		ativo: s.estado ? s.estado === "Ativo" : s.ativo ?? true
	};
}
function Sensores() {
	const { podeEditar } = useAuth();
	const editar = podeEditar("sensores");
	const [q, setQ] = (0, import_react.useState)("");
	const [lista, setLista] = (0, import_react.useState)([]);
	const [estacoes, setEstacoes] = (0, import_react.useState)([]);
	const [carregando, setCarregando] = (0, import_react.useState)(true);
	const [salvando, setSalvando] = (0, import_react.useState)(false);
	const [modalAberto, setModalAberto] = (0, import_react.useState)(false);
	const [idsEmAtualizacao, setIdsEmAtualizacao] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [sensorParaRemover, setSensorParaRemover] = (0, import_react.useState)(null);
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [nome, setNome] = (0, import_react.useState)("");
	const [tipo, setTipo] = (0, import_react.useState)(TIPOS_SENSORES[0]);
	const [estacaoId, setEstacaoId] = (0, import_react.useState)("");
	const [ativo, setAtivo] = (0, import_react.useState)(true);
	const carregarDados = async () => {
		setCarregando(true);
		try {
			const [respSensores, respEstacoes] = await Promise.all([api.get("/sensores"), api.get("/estacoes")]);
			setLista((respSensores.data ?? []).map(mapearSensorApi));
			const opcoesEstacoes = (respEstacoes.data ?? []).map((e) => ({
				id: String(e.id),
				codigo: e.codigo,
				local: e.municipio ?? e.nome ?? e.codigo
			}));
			setEstacoes(opcoesEstacoes);
			if (opcoesEstacoes[0]) setEstacaoId(opcoesEstacoes[0].id);
		} catch (err) {
			toast.error("Erro ao carregar sensores do servidor.");
		} finally {
			setCarregando(false);
		}
	};
	(0, import_react.useEffect)(() => {
		carregarDados();
	}, []);
	const filtrados = lista.filter((s) => s.codigo?.toLowerCase().includes(q.toLowerCase()) || s.nome.toLowerCase().includes(q.toLowerCase()) || s.estacao.toLowerCase().includes(q.toLowerCase()) || s.tipo.toLowerCase().includes(q.toLowerCase()));
	const limparFormulario = () => {
		setCodigo("");
		setNome("");
		setTipo(TIPOS_SENSORES[0]);
		setEstacaoId(estacoes[0]?.id || "");
		setAtivo(true);
	};
	const handleSalvarSensor = async (e) => {
		e.preventDefault();
		const codigoTratado = codigo.trim().toUpperCase();
		if (lista.some((item) => item.codigo?.toUpperCase() === codigoTratado)) {
			toast.error(`O código "${codigoTratado}" já está em uso por outro sensor.`);
			return;
		}
		if (!estacaoId) {
			toast.error("Selecione uma estação para associar o sensor.");
			return;
		}
		setSalvando(true);
		try {
			await api.post("/sensores", {
				codigo: codigoTratado,
				nome: nome.trim(),
				tipo,
				unidade: UNIDADES_POR_TIPO[tipo] || "",
				estacao_id: estacaoId
			});
			toast.success(`Sensor ${codigoTratado} cadastrado com sucesso!`);
			setModalAberto(false);
			limparFormulario();
			await carregarDados();
		} catch (err) {
			toast.error(err?.response?.data?.erro || "Erro ao cadastrar sensor no servidor.");
		} finally {
			setSalvando(false);
		}
	};
	const handleAlternarAtivo = async (sensor, novoValor) => {
		setIdsEmAtualizacao((prev) => new Set(prev).add(sensor.id));
		setLista((prev) => prev.map((s) => s.id === sensor.id ? {
			...s,
			ativo: novoValor
		} : s));
		try {
			await api.patch(`/sensores/${sensor.id}/estado`, { ativo: novoValor });
			toast.success(`Sensor ${sensor.codigo || sensor.id} ${novoValor ? "ativado" : "desativado"}.`);
		} catch (err) {
			setLista((prev) => prev.map((s) => s.id === sensor.id ? {
				...s,
				ativo: !novoValor
			} : s));
			toast.error(err?.response?.data?.erro || "Erro ao atualizar estado do sensor.");
		} finally {
			setIdsEmAtualizacao((prev) => {
				const proximo = new Set(prev);
				proximo.delete(sensor.id);
				return proximo;
			});
		}
	};
	const handleRemoverSensor = async (sensor) => {
		setIdsEmAtualizacao((prev) => new Set(prev).add(sensor.id));
		try {
			await api.delete(`/sensores/${sensor.id}`);
			setLista((prev) => prev.filter((s) => s.id !== sensor.id));
			setSensorParaRemover(null);
			toast.success(`Sensor ${sensor.codigo || sensor.id} removido.`);
		} catch (err) {
			toast.error(err?.response?.data?.erro || "Erro ao remover sensor.");
		} finally {
			setIdsEmAtualizacao((prev) => {
				const proximo = new Set(prev);
				proximo.delete(sensor.id);
				return proximo;
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Sensores",
		descricao: "Sensores elétricos e estruturais (IMU / MPU6050)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						placeholder: "Pesquisar por código, nome, tipo ou estação…",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})]
				}), editar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setModalAberto(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Adicionar sensor"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SomenteLeitura, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
				titulo: `${filtrados.length} sensores associados`,
				className: "mt-4",
				children: carregando ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A carregar sensores…"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-xs uppercase text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Código / Nome"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Tipo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Estação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Último valor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Ativo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Ações"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [filtrados.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 font-medium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-4 w-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs text-primary mr-1.5",
											children: [
												"[",
												s.codigo || s.id,
												"]"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.nome })] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 text-muted-foreground",
									children: s.tipo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 font-medium",
									children: s.estacao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 font-mono",
									children: s.ativo ? `${s.ultimoValor} ${s.unidade}` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: s.ativo,
										disabled: !editar || idsEmAtualizacao.has(s.id),
										onCheckedChange: (novoValor) => handleAlternarAtivo(s, novoValor)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: editar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										disabled: idsEmAtualizacao.has(s.id),
										onClick: () => setSensorParaRemover(s),
										title: "Remover sensor",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
									})
								})
							] }, s.id)), filtrados.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "py-6 text-center text-sm text-muted-foreground",
								children: "Nenhum sensor encontrado."
							}) })]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmarAcaoDialog, {
				aberto: !!sensorParaRemover,
				titulo: "Remover sensor?",
				descricao: sensorParaRemover ? `O sensor ${sensorParaRemover.codigo || sensorParaRemover.id} será removido. Esta ação não pode ser desfeita.` : "",
				textoConfirmar: "Remover sensor",
				carregando: sensorParaRemover ? idsEmAtualizacao.has(sensorParaRemover.id) : false,
				onCancelar: () => setSensorParaRemover(null),
				onConfirmar: () => sensorParaRemover && void handleRemoverSensor(sensorParaRemover)
			}),
			modalAberto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Adicionar Sensor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Registe um novo sensor elétrico ou estrutural"
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
						onSubmit: handleSalvarSensor,
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "codigo",
										children: ["Código do sensor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "codigo",
										placeholder: "Ex: SEN-001",
										required: true,
										value: codigo,
										onChange: (e) => setCodigo(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "nome",
										children: ["Nome do sensor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "nome",
										placeholder: "Ex: MPU6050 - Eixo Z",
										required: true,
										value: nome,
										onChange: (e) => setNome(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "tipo",
										children: ["Tipo de sensor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "tipo",
										className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										value: tipo,
										onChange: (e) => setTipo(e.target.value),
										children: TIPOS_SENSORES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: t,
											children: [
												t,
												" (",
												UNIDADES_POR_TIPO[t],
												")"
											]
										}, t))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "estacao",
										children: ["Estação associada ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "estacao",
										className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										value: estacaoId,
										onChange: (e) => setEstacaoId(e.target.value),
										children: estacoes.map((est) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: est.id,
											children: [
												est.codigo,
												" - ",
												est.local
											]
										}, est.id))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ativo",
									className: "cursor-pointer font-medium",
									children: "Ativar sensor imediatamente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									id: "ativo",
									checked: ativo,
									onCheckedChange: setAtivo
								})]
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
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: salvando,
									children: [salvando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null, "Salvar Sensor"]
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
export { Sensores as component };
