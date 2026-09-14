import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as api, m as useAuth, n as Label, t as Input } from "./router-azIfNJtr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as LocateFixed, B as Cpu, Q as Calendar, R as Eye, S as Plus, T as MapPin, c as Trash2, g as Search, j as LoaderCircle, n as X, rt as Activity } from "../_libs/lucide-react.mjs";
import { i as cn, n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { i as SomenteLeitura, n as Painel, t as EstadoBadge } from "./ui-kit-NTPR4QmO.mjs";
import { t as Switch } from "./switch-DtEVXaE2.mjs";
import { t as ConfirmarAcaoDialog } from "./ConfirmarAcaoDialog-DG7Tt8ZW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.estacoes-C3jQuvRP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var MapaLeaflet = (0, import_react.lazy)(() => import("./MapaEstacaoLeaflet-CLyHI3rk.mjs"));
function MapaEstacao({ latitude, longitude, codigo, nome }) {
	const [modo, setModo] = (0, import_react.useState)("normal");
	const [montado, setMontado] = (0, import_react.useState)(false);
	const titulo = nome?.trim() ? `${codigo} - ${nome}` : codigo;
	(0, import_react.useEffect)(() => {
		setMontado(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-lg border border-border",
		children: [montado ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 w-full bg-muted" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapaLeaflet, {
				latitude,
				longitude,
				titulo,
				modo
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 w-full bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-3 top-3 z-[1000] flex gap-1 rounded-md border border-border bg-card/95 p-1 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: modo === "normal" ? "default" : "outline",
				onClick: () => setModo("normal"),
				children: "Normal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: modo === "satelite" ? "default" : "outline",
				onClick: () => setModo("satelite"),
				children: "Satélite"
			})]
		})]
	});
}
function mapearEstacaoApi(e) {
	const estadoFormatado = e.estado === "Inativa" || e.ativa === false ? "offline" : "ok";
	return {
		id: String(e.id),
		codigo: e.codigo,
		local: e.municipio ? `${e.municipio}${e.comuna ? `, ${e.comuna}` : ""}` : e.nome ?? e.local ?? "—",
		estado: estadoFormatado,
		ultimaComunicacao: e.ultima_comunicacao ? new Date(e.ultima_comunicacao).toLocaleString("pt-PT") : e.created_at ? new Date(e.created_at).toLocaleString("pt-PT") : "—",
		bateria: e.bateria ?? 100,
		devEui: e.device_id ?? e.dev_eui ?? "—",
		ativa: e.estado ? e.estado !== "Inativa" : e.ativa ?? true,
		latitude: e.latitude != null ? Number(e.latitude) : void 0,
		longitude: e.longitude != null ? Number(e.longitude) : void 0,
		nome: e.nome ?? void 0,
		descricao: e.descricao ?? void 0,
		descricaoLocal: e.descricao_local ?? void 0
	};
}
function Estacoes() {
	const { podeEditar } = useAuth();
	const editar = podeEditar("estacoes");
	const [q, setQ] = (0, import_react.useState)("");
	const [lista, setLista] = (0, import_react.useState)([]);
	const [carregando, setCarregando] = (0, import_react.useState)(true);
	const [salvando, setSalvando] = (0, import_react.useState)(false);
	const [modalAberto, setModalAberto] = (0, import_react.useState)(false);
	const [estacaoDetalhes, setEstacaoDetalhes] = (0, import_react.useState)(null);
	const [idsEmRemocao, setIdsEmRemocao] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [idsEmAtualizacao, setIdsEmAtualizacao] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [estacaoParaRemover, setEstacaoParaRemover] = (0, import_react.useState)(null);
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [nome, setNome] = (0, import_react.useState)("");
	const [deviceId, setDeviceId] = (0, import_react.useState)("ESP32-TESTE-01");
	const [descricao, setDescricao] = (0, import_react.useState)("");
	const [ativa, setAtiva] = (0, import_react.useState)(true);
	const [provincia, setProvincia] = (0, import_react.useState)("Huambo");
	const [municipio, setMunicipio] = (0, import_react.useState)("Caála");
	const [comuna, setComuna] = (0, import_react.useState)("");
	const [latitude, setLatitude] = (0, import_react.useState)("");
	const [longitude, setLongitude] = (0, import_react.useState)("");
	const [descricaoLocal, setDescricaoLocal] = (0, import_react.useState)("");
	const [aLocalizar, setALocalizar] = (0, import_react.useState)(false);
	const [localizacaoAutomatica, setLocalizacaoAutomatica] = (0, import_react.useState)(false);
	const buscarEstacoes = async () => {
		setCarregando(true);
		try {
			const resposta = await api.get("/estacoes");
			setLista((resposta.data ?? []).map(mapearEstacaoApi));
		} catch (err) {
			toast.error("Erro ao carregar as estações do servidor.");
		} finally {
			setCarregando(false);
		}
	};
	(0, import_react.useEffect)(() => {
		buscarEstacoes();
	}, []);
	const capturarLocalizacaoAtual = () => {
		if (!("geolocation" in navigator)) {
			toast.error("Este dispositivo/navegador não suporta geolocalização.");
			return;
		}
		setALocalizar(true);
		navigator.geolocation.getCurrentPosition((pos) => {
			setLatitude(pos.coords.latitude.toFixed(6));
			setLongitude(pos.coords.longitude.toFixed(6));
			setLocalizacaoAutomatica(true);
			setALocalizar(false);
			toast.success("Localização atual capturada.");
		}, () => {
			setALocalizar(false);
			setLocalizacaoAutomatica(false);
			toast.error("Não foi possível obter a localização. Permita o acesso ao GPS e tente novamente.");
		}, {
			enableHighAccuracy: true,
			timeout: 1e4
		});
	};
	(0, import_react.useEffect)(() => {
		if (!modalAberto) return;
		setLatitude("");
		setLongitude("");
		setLocalizacaoAutomatica(false);
		capturarLocalizacaoAtual();
	}, [modalAberto]);
	const filtradas = lista.filter((e) => e.codigo.toLowerCase().includes(q.toLowerCase()) || e.local.toLowerCase().includes(q.toLowerCase()));
	const limparFormulario = () => {
		setCodigo("");
		setNome("");
		setDeviceId("ESP32-TESTE-01");
		setDescricao("");
		setAtiva(true);
		setProvincia("Huambo");
		setMunicipio("Caála");
		setComuna("");
		setLatitude("");
		setLongitude("");
		setDescricaoLocal("");
		setLocalizacaoAutomatica(false);
	};
	const handleAbrirDetalhes = (estacao) => {
		const dadosCompletos = {
			...estacao,
			telemetria: {
				measurement: "energia",
				tags: {
					estacao: estacao.codigo,
					dispositivo: estacao.devEui || `ESP32-${estacao.codigo.split("-")[1] || "001"}`
				},
				fields: {
					temperatura: 32.1,
					tensao: 220,
					corrente: 4.2,
					vibracao: .08,
					inclinacao: 2.1
				},
				timestamp: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19)
			}
		};
		setEstacaoDetalhes(dadosCompletos);
	};
	const handleSalvarEstacao = async (e) => {
		e.preventDefault();
		const codigoTratado = codigo.trim().toUpperCase();
		const deviceIdTratado = deviceId.trim();
		if (!deviceIdTratado) {
			toast.error("Por favor informe o Device ID (ID do dispositivo IoT).");
			return;
		}
		if (lista.some((item) => item.codigo.toUpperCase() === codigoTratado)) {
			toast.error(`O código "${codigoTratado}" já está cadastrado. Escolha outro código.`);
			return;
		}
		const parseLat = parseFloat(latitude);
		const parseLng = parseFloat(longitude);
		if (!Number.isFinite(parseLat) || !Number.isFinite(parseLng)) {
			toast.error("Informe a latitude e a longitude exatas da estação.");
			return;
		}
		if (parseLat < -90 || parseLat > 90 || parseLng < -180 || parseLng > 180) {
			toast.error("As coordenadas informadas não são válidas.");
			return;
		}
		setSalvando(true);
		try {
			await api.post("/estacoes", {
				codigo: codigoTratado,
				nome: nome.trim(),
				descricao: descricao.trim(),
				estado: ativa ? "Ativa" : "Inativa",
				provincia,
				municipio,
				comuna,
				latitude: parseLat,
				longitude: parseLng,
				descricao_local: descricaoLocal.trim(),
				device_id: deviceIdTratado,
				dev_eui: deviceIdTratado
			});
			toast.success(`Estação ${codigoTratado} adicionada com sucesso!`);
			setModalAberto(false);
			limparFormulario();
			await buscarEstacoes();
		} catch (err) {
			toast.error(err?.response?.data?.error || "Erro ao criar estação no servidor.");
		} finally {
			setSalvando(false);
		}
	};
	const handleAlternarAtiva = async (estacao, novoValor) => {
		setIdsEmAtualizacao((prev) => new Set(prev).add(estacao.id));
		setLista((prev) => prev.map((e) => e.id === estacao.id ? {
			...e,
			ativa: novoValor,
			estado: novoValor ? "ok" : "offline"
		} : e));
		try {
			await api.patch(`/estacoes/${estacao.id}/estado`, { ativa: novoValor });
			toast.success(`Estação ${estacao.codigo} ${novoValor ? "ativada" : "desativada"}.` + (!novoValor ? " Deixa de aceitar telemetria enquanto estiver inativa." : ""));
		} catch (err) {
			setLista((prev) => prev.map((e) => e.id === estacao.id ? {
				...e,
				ativa: !novoValor,
				estado: !novoValor ? "ok" : "offline"
			} : e));
			toast.error(err?.response?.data?.error || "Erro ao atualizar estado da estação.");
		} finally {
			setIdsEmAtualizacao((prev) => {
				const proximo = new Set(prev);
				proximo.delete(estacao.id);
				return proximo;
			});
		}
	};
	const handleRemoverEstacao = async (estacao) => {
		setIdsEmRemocao((prev) => new Set(prev).add(estacao.id));
		try {
			await api.delete(`/estacoes/${estacao.id}`);
			setLista((prev) => prev.filter((e) => e.id !== estacao.id));
			setEstacaoParaRemover(null);
			toast.success(`Estação ${estacao.codigo} removida.`);
		} catch (err) {
			toast.error(err?.response?.data?.error || "Erro ao remover estação.");
		} finally {
			setIdsEmRemocao((prev) => {
				const proximo = new Set(prev);
				proximo.delete(estacao.id);
				return proximo;
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Estações IoT",
		descricao: "Todas as estações e o seu estado atual",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						placeholder: "Pesquisar estação ou local…",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})]
				}), editar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						limparFormulario();
						setModalAberto(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Adicionar"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SomenteLeitura, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Painel, {
				titulo: `${filtradas.length} estações`,
				className: "mt-4",
				children: carregando ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " A carregar estações…"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[760px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-xs uppercase text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Código"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Nome / local"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Estado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Última comunicação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Bateria"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Device ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Ativa"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 text-right",
									children: "Ações"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [filtradas.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 font-medium",
									children: e.codigo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2.5 pr-3 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-foreground",
										children: e.nome || e.codigo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: e.local })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: e.estado })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 text-muted-foreground",
									children: e.ultimaComunicacao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2.5 pr-3",
									children: [e.bateria, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 font-mono text-xs text-muted-foreground",
									children: e.devEui
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: e.ativa,
										disabled: !editar || idsEmAtualizacao.has(e.id),
										onCheckedChange: (novoValor) => handleAlternarAtiva(e, novoValor)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 pr-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => handleAbrirDetalhes(e),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-1.5 h-3.5 w-3.5" }), " Ver"]
										}), editar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											disabled: idsEmRemocao.has(e.id),
											onClick: () => setEstacaoParaRemover(e),
											title: "Remover estação",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 text-destructive" })
										})]
									})
								})
							] }, e.id)), filtradas.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "py-6 text-center text-sm text-muted-foreground",
								children: "Nenhuma estação encontrada."
							}) })]
						})]
					})
				})
			}),
			estacaoDetalhes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold",
								children: estacaoDetalhes.codigo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setEstacaoDetalhes(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 sm:grid-cols-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Estado: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: estacaoDetalhes.estado })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-4 w-4 text-muted-foreground" }),
										" Device ID: ",
										estacaoDetalhes.devEui
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
										" ",
										estacaoDetalhes.ultimaComunicacao
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
										" ",
										estacaoDetalhes.local
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Nome:"
									}),
									" ",
									estacaoDetalhes.nome || "—"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Descrição:"
									}),
									" ",
									estacaoDetalhes.descricao || "—"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Descrição do local:"
									}),
									" ",
									estacaoDetalhes.descricaoLocal || "—"
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: estacaoDetalhes.latitude != null && estacaoDetalhes.longitude != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapaEstacao, {
								latitude: estacaoDetalhes.latitude,
								longitude: estacaoDetalhes.longitude,
								codigo: estacaoDetalhes.codigo,
								nome: estacaoDetalhes.nome
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground text-center",
								children: [
									"Coordenadas: ",
									estacaoDetalhes.latitude,
									", ",
									estacaoDetalhes.longitude
								]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground",
								children: "Esta estação ainda não tem coordenadas cadastradas."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end border-t border-border pt-4 mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setEstacaoDetalhes(null),
								children: "Fechar"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmarAcaoDialog, {
				aberto: !!estacaoParaRemover,
				titulo: "Remover estação?",
				descricao: estacaoParaRemover ? `A estação ${estacaoParaRemover.codigo} e os sensores associados serão removidos. Esta ação não pode ser desfeita.` : "",
				textoConfirmar: "Remover estação",
				carregando: estacaoParaRemover ? idsEmRemocao.has(estacaoParaRemover.id) : false,
				onCancelar: () => setEstacaoParaRemover(null),
				onConfirmar: () => estacaoParaRemover && void handleRemoverEstacao(estacaoParaRemover)
			}),
			modalAberto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Adicionar Nova Estação IoT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Preencha as informações para registar a estação"
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
						onSubmit: handleSalvarEstacao,
						className: "mt-4 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold uppercase tracking-wider text-primary",
										children: "A. Identificação"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "codigo",
												children: ["Código da estação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "codigo",
												placeholder: "Ex: CAALA-001",
												required: true,
												value: codigo,
												onChange: (e) => setCodigo(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "nome",
												children: ["Nome da estação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "nome",
												placeholder: "Ex: Estação CAALA 001",
												required: true,
												value: nome,
												onChange: (e) => setNome(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "deviceId",
											children: ["Device ID (IoT) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "deviceId",
											placeholder: "Ex: ESP32-TESTE-01",
											required: true,
											value: deviceId,
											onChange: (e) => setDeviceId(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "descricao",
											children: "Descrição"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "descricao",
											rows: 2,
											placeholder: "Estação de monitoramento da rede elétrica",
											value: descricao,
											onChange: (e) => setDescricao(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estado *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-6 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center gap-2 text-sm cursor-pointer font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "estado",
													checked: ativa,
													onChange: () => setAtiva(true),
													className: "accent-primary h-4 w-4"
												}), "Ativa"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center gap-2 text-sm cursor-pointer font-medium text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "estado",
													checked: !ativa,
													onChange: () => setAtiva(false),
													className: "accent-primary h-4 w-4"
												}), "Inativa"]
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold uppercase tracking-wider text-primary",
											children: "B. Localização"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: capturarLocalizacaoAtual,
											disabled: aLocalizar,
											children: [aLocalizar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "mr-1.5 h-3.5 w-3.5" }), aLocalizar ? "A localizar…" : "Usar localização atual"]
										})]
									}),
									localizacaoAutomatica && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "rounded-md bg-success/10 px-3 py-1.5 text-xs text-success",
										children: "Coordenadas capturadas automaticamente pelo GPS deste dispositivo."
									}),
									!localizacaoAutomatica && !aLocalizar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "rounded-md bg-warning/10 px-3 py-1.5 text-xs text-warning-foreground",
										children: "O cadastro aguarda a localização real. Permita o acesso ao GPS para continuar."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "provincia",
													children: "Província"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "provincia",
													value: provincia,
													onChange: (e) => setProvincia(e.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "municipio",
													children: "Município"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "municipio",
													value: municipio,
													onChange: (e) => setMunicipio(e.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "comuna",
													children: "Comuna"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "comuna",
													placeholder: "Nome da comuna",
													value: comuna,
													onChange: (e) => setComuna(e.target.value)
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "latitude",
												children: "Latitude"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "latitude",
												placeholder: "A capturar automaticamente…",
												readOnly: true,
												value: latitude
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "longitude",
												children: "Longitude"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "longitude",
												placeholder: "A capturar automaticamente…",
												readOnly: true,
												value: longitude
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "descricaoLocal",
											children: "Descrição do local"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "descricaoLocal",
											placeholder: "Ex: Próximo ao PT da zona industrial",
											value: descricaoLocal,
											onChange: (e) => setDescricaoLocal(e.target.value)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-3 border-t border-border pt-4",
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
									disabled: salvando || aLocalizar || !localizacaoAutomatica,
									children: [salvando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null, "Salvar Estação"]
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
export { Estacoes as component };
