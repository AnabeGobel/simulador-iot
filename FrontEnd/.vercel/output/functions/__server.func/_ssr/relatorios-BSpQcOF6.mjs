import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as obterEstacoes, u as obterDadosRelatorio } from "./router-azIfNJtr.mjs";
import { I as Funnel, L as FileText, W as CircleAlert, Z as ChartColumn, d as Square, f as SquareCheckBig, j as LoaderCircle, x as Printer } from "../_libs/lucide-react.mjs";
import { n as Button } from "./router-azIfNJtr2.mjs";
import { t as AppShell } from "./AppShell-DMvJZLBd.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C5Nmk_bj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/relatorios-BSpQcOF6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RelatoriosComponent() {
	const [estacoesLista, setEstacoesLista] = (0, import_react.useState)([]);
	const [loadingEstacoes, setLoadingEstacoes] = (0, import_react.useState)(true);
	const [estacao, setEstacao] = (0, import_react.useState)("TODAS");
	const [dataInicio, setDataInicio] = (0, import_react.useState)("2026-08-01");
	const [dataFim, setDataFim] = (0, import_react.useState)("2026-08-31");
	const [formato, setFormato] = (0, import_react.useState)("pdf");
	const [loadingGerar, setLoadingGerar] = (0, import_react.useState)(false);
	const [erro, setErro] = (0, import_react.useState)(null);
	const [dadosReais, setDadosReais] = (0, import_react.useState)(null);
	const [usuarioLogado, setUsuarioLogado] = (0, import_react.useState)("Artur Devo Catimba");
	const [parametros, setParametros] = (0, import_react.useState)({
		temperatura: true,
		tensao: true,
		corrente: true,
		consumo: true,
		vibracao: true,
		inclinacao: true,
		anomalias: true,
		alertas: true
	});
	(0, import_react.useEffect)(() => {
		async function carregarDadosIniciais() {
			try {
				setLoadingEstacoes(true);
				const lista = await obterEstacoes();
				setEstacoesLista(lista);
			} catch (err) {
				console.error("Erro ao carregar lista de estações:", err);
			} finally {
				setLoadingEstacoes(false);
			}
			const usuarioSalvo = localStorage.getItem("@iot_caala:usuario");
			if (usuarioSalvo) try {
				const parsed = JSON.parse(usuarioSalvo);
				if (parsed?.nome) setUsuarioLogado(parsed.nome);
			} catch {}
		}
		carregarDadosIniciais();
	}, []);
	const toggleParametro = (key) => {
		setParametros((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};
	const handleGerar = async (e) => {
		e.preventDefault();
		setLoadingGerar(true);
		setErro(null);
		try {
			const resposta = await obterDadosRelatorio({
				estacao,
				dataInicio,
				dataFim
			});
			setDadosReais(resposta);
		} catch (err) {
			console.error("Erro ao gerar relatório:", err);
			setErro(err?.response?.data?.message || "Falha ao buscar os dados do relatório na API.");
		} finally {
			setLoadingGerar(false);
		}
	};
	const handleImprimir = () => {
		window.print();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		titulo: "Relatórios Técnicos",
		descricao: "Geração de relatórios analíticos e de desempenho da rede SIMIE-CAÁLA",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "print:hidden lg:col-span-5 border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-base font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4 text-primary" }), "Configurar Relatório"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Selecione os parâmetros e o período desejado" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleGerar,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs font-medium text-foreground",
							children: "Estação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: estacao,
							onChange: (e) => setEstacao(e.target.value),
							disabled: loadingEstacoes,
							className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "TODAS",
								children: "Todas as Estações"
							}), estacoesLista.map((est) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: est.codigo,
								children: est.nome ? `${est.codigo} - ${est.nome}` : est.codigo
							}, est.id || est.codigo))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-foreground",
								children: "Data Inicial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: dataInicio,
								onChange: (e) => setDataInicio(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-foreground",
								children: "Data Final"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: dataFim,
								onChange: (e) => setDataFim(e.target.value),
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-2 block text-xs font-medium text-foreground",
							children: "Dados a incluir"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 text-xs",
							children: Object.keys(parametros).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleParametro(key),
								className: "flex items-center gap-2 rounded border border-border p-2 text-left hover:bg-accent",
								children: [parametros[key] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "h-4 w-4 text-primary shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-4 w-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: key
								})]
							}, key))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs font-medium text-foreground",
							children: "Formato de Exportação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formato,
							onChange: (e) => setFormato(e.target.value),
							className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pdf",
								children: "Documento PDF Técnico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "csv",
								children: "Planilha CSV (Dados Brutos)"
							})]
						})] }),
						erro && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-xs text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: erro })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loadingGerar,
							className: "w-full gap-2",
							children: loadingGerar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Consultando Banco de Dados..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), "Gerar Relatório"] })
						})
					]
				}) })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 print:col-span-12 print:w-full",
				children: [
					!dadosReais && !loadingGerar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-col items-center justify-center p-12 text-center print:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-12 w-12 text-muted-foreground/50 mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-lg",
								children: "Nenhum relatório gerado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1 max-w-sm",
								children: "Selecione os parâmetros no painel lateral e clique em \"Gerar Relatório\" para visualizar a análise técnica."
							})
						]
					}),
					loadingGerar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-col items-center justify-center p-12 text-center print:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 text-primary animate-spin mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-base",
								children: "Processando dados telemetricos..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "A agregar leituras, anomalias e alertas para o período selecionado."
							})
						]
					}),
					dadosReais && !loadingGerar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between print:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Pré-visualização do Relatório"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: handleImprimir,
									className: "gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), "Imprimir / Salvar PDF"]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-6 shadow-sm print:border-none print:shadow-none print:p-0 print:m-0 print:bg-white print:text-black",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-border pb-4 mb-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-bold tracking-widest text-primary uppercase print:text-black",
											children: "SISTEMA INTELIGENTE DE MONITORAMENTO DE INFRAESTRUTURAS ELÉTRICAS — SIMIE-CAÁLA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-xl font-bold text-foreground print:text-black mt-1",
											children: "RELATÓRIO TÉCNICO DE MONITORAMENTO"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground print:text-black",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground print:text-black",
														children: "Gerado Por:"
													}),
													" ",
													dadosReais.emissor?.nome || usuarioLogado
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground print:text-black",
														children: "Contato:"
													}),
													" ",
													dadosReais.emissor?.contato || "(+244) 923 000 000"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground print:text-black",
														children: "Período:"
													}),
													" ",
													dataInicio,
													" — ",
													dataFim
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-foreground print:text-black",
														children: "Data de Emissão:"
													}),
													" ",
													(/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT")
												] })
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6 rounded-md bg-accent/40 print:bg-gray-100 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-foreground print:text-black mb-1",
										children: "Informações da Estação"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground print:text-gray-700",
													children: "Estação:"
												}),
												" ",
												estacao
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground print:text-gray-700",
													children: "Dispositivo:"
												}),
												" ",
												dadosReais.estacaoInfo?.dispositivo || "ESP32-WOKWI-02"
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground print:text-gray-700",
													children: "Localização:"
												}),
												" ",
												dadosReais.estacaoInfo?.localizacao || "Subestação Caála Principal"
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground print:text-gray-700",
													children: "Status no Período:"
												}),
												" ",
												dadosReais.estacaoInfo?.status || "Ativo / Em Monitoramento"
											] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-foreground print:text-black mb-2",
										children: "3. Resumo do Período"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-left text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "border-b border-border bg-accent/50 print:bg-gray-200 text-muted-foreground print:text-black",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-2 font-medium",
													children: "Indicador"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-2 font-medium",
													children: "Resultado"
												})] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
												className: "divide-y divide-border print:divide-gray-300",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Total de medições"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2 font-semibold",
														children: dadosReais.resumo?.totalMedicoes?.toLocaleString("pt-PT") ?? 0
													})] }),
													parametros.temperatura && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Temperatura média"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-2 font-semibold",
														children: [dadosReais.resumo?.tempMedia ?? "N/A", " °C"]
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Temperatura máxima"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-2 font-semibold text-red-500 print:text-black",
														children: [dadosReais.resumo?.tempMax ?? "N/A", " °C"]
													})] })] }),
													parametros.tensao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Tensão média"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-2 font-semibold",
														children: [dadosReais.resumo?.tensaoMedia ?? "N/A", " V"]
													})] }),
													parametros.corrente && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Corrente média"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-2 font-semibold",
														children: [dadosReais.resumo?.correnteMedia ?? "N/A", " A"]
													})] }),
													parametros.consumo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Consumo total"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-2 font-semibold",
														children: [dadosReais.resumo?.consumoTotal ?? "N/A", " kWh"]
													})] }),
													parametros.vibracao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Vibração máxima"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-2 font-semibold",
														children: [dadosReais.resumo?.vibracaoMax ?? "N/A", " g"]
													})] }),
													parametros.inclinacao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Inclinação máxima"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-2 font-semibold",
														children: [dadosReais.resumo?.inclinacaoMax ?? "N/A", "°"]
													})] }),
													parametros.anomalias && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Anomalias detectadas"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2 font-semibold text-red-500 print:text-black",
														children: dadosReais.resumo?.totalAnomalias ?? 0
													})] }),
													parametros.alertas && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: "Alertas gerados"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2 font-semibold text-red-500 print:text-black",
														children: dadosReais.resumo?.totalAlertas ?? 0
													})] })
												]
											})]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-foreground print:text-black mb-2",
										children: "4. Extrato de Medições Selecionadas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-3 gap-3 text-xs print:grid-cols-3",
										children: [
											parametros.temperatura && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-2 border border-border print:border-gray-300 rounded",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-primary print:text-black",
														children: "Temperatura"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700 mt-1",
														children: [
															"├── Mínima: ",
															dadosReais.resumo?.tempMin ?? "N/A",
															" °C"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700",
														children: [
															"├── Média: ",
															dadosReais.resumo?.tempMedia ?? "N/A",
															" °C"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700",
														children: [
															"└── Máxima: ",
															dadosReais.resumo?.tempMax ?? "N/A",
															" °C"
														]
													})
												]
											}),
											parametros.tensao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-2 border border-border print:border-gray-300 rounded",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-primary print:text-black",
														children: "Tensão"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700 mt-1",
														children: [
															"├── Mínima: ",
															dadosReais.resumo?.tensaoMin ?? "N/A",
															" V"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700",
														children: [
															"├── Média: ",
															dadosReais.resumo?.tensaoMedia ?? "N/A",
															" V"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700",
														children: [
															"└── Máxima: ",
															dadosReais.resumo?.tensaoMax ?? "N/A",
															" V"
														]
													})
												]
											}),
											parametros.corrente && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-2 border border-border print:border-gray-300 rounded",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-primary print:text-black",
														children: "Corrente"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700 mt-1",
														children: [
															"├── Mínima: ",
															dadosReais.resumo?.correnteMin ?? "N/A",
															" A"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700",
														children: [
															"├── Média: ",
															dadosReais.resumo?.correnteMedia ?? "N/A",
															" A"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground print:text-gray-700",
														children: [
															"└── Máxima: ",
															dadosReais.resumo?.correnteMax ?? "N/A",
															" A"
														]
													})
												]
											})
										]
									})]
								}),
								parametros.anomalias && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-foreground print:text-black mb-2",
										children: "5. Anomalias Detectadas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-left text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "border-b border-border bg-accent/50 print:bg-gray-200 text-muted-foreground print:text-black",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Data/Hora"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Estação"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Parâmetro"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Valor"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Limite"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Situação"
													})
												] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-border print:divide-gray-300",
												children: dadosReais.anomalias && dadosReais.anomalias.length > 0 ? dadosReais.anomalias.map((anomalia) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: anomalia.dataHora
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: anomalia.estacao
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: anomalia.parametro
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2 font-semibold text-red-500 print:text-black",
														children: anomalia.valor
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: anomalia.limite
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2 text-red-500 print:text-black font-semibold",
														children: anomalia.situacao
													})
												] }, anomalia.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 6,
													className: "p-4 text-center text-muted-foreground",
													children: "Nenhuma anomalia registrada no período."
												}) })
											})]
										})
									})]
								}),
								parametros.alertas && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-foreground print:text-black mb-2",
										children: "6. Alertas Gerados"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-left text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "border-b border-border bg-accent/50 print:bg-gray-200 text-muted-foreground print:text-black",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Data"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Estação"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Tipo de Alerta"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Gravidade"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "p-2",
														children: "Estado"
													})
												] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-border print:divide-gray-300",
												children: dadosReais.alertas && dadosReais.alertas.length > 0 ? dadosReais.alertas.map((alerta) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: alerta.data
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: alerta.estacao
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: alerta.tipo
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2 font-semibold",
														children: alerta.gravidade
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-2",
														children: alerta.estado
													})
												] }, alerta.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 5,
													className: "p-4 text-center text-muted-foreground",
													children: "Nenhum alerta gerado no período."
												}) })
											})]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border print:border-gray-300 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-foreground print:text-black mb-1",
										children: "8. Conclusão Técnica"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground print:text-black leading-relaxed",
										children: dadosReais.conclusao || `Durante o período analisado (${dataInicio} — ${dataFim}), a estação ${estacao} registrou um total de ${dadosReais.resumo?.totalMedicoes?.toLocaleString("pt-PT") ?? 0} medições. Foram consolidadas ${dadosReais.resumo?.totalAnomalias ?? 0} anomalias e ${dadosReais.resumo?.totalAlertas ?? 0} alertas gerados.`
									})]
								})
							]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { RelatoriosComponent as component };
