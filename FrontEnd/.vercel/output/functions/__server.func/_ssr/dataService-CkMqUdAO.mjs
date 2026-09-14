import { c as api } from "./router-azIfNJtr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dataService-CkMqUdAO.js
async function getEstacoes() {
	const { data } = await api.get("/estacoes");
	return data.map((item) => {
		const ultima = item.ultima_telemetria;
		const estadoTempoReal = item.estado_tempo_real ?? "offline";
		return {
			id: item.id,
			codigo: item.codigo,
			local: item.municipio ? `${item.municipio}${item.comuna ? `, ${item.comuna}` : ""}` : item.nome ?? "Caála",
			estado: estadoTempoReal === "ok" ? "online" : estadoTempoReal === "offline" ? "offline" : "atencao",
			ativa: item.estado !== "Inativa",
			devEui: item.dev_eui || item.device_id || "N/A",
			ultimaComunicacao: ultima ? new Date(ultima.created_at).toLocaleString("pt-PT") : "Sem comunicação",
			bateria: 0,
			sinal: "Forte",
			tensao: ultima?.tensao ?? 0,
			corrente: ultima?.corrente ?? 0,
			temperatura: ultima?.temperatura ?? 0,
			potencia: ultima?.tensao && ultima?.corrente ? Number((ultima.tensao * ultima.corrente / 1e3).toFixed(2)) : 0,
			consumoHoje: 0,
			vibracao: ultima?.vibracao ?? 0,
			inclinacao: ultima?.inclinacao ?? 0,
			estadoTempoReal,
			ultimaTelemetria: ultima ?? null
		};
	});
}
async function getAlertas() {
	const { data } = await api.get("/alertas");
	return data.map((item) => ({
		id: item.id,
		tipo: item.tipo,
		estacao: item.estacao_codigo || item.estacao_id || "Estação desconhecida",
		valor: item.valor,
		limite: item.limite,
		severidade: item.severidade,
		data: item.data_ocorrencia ? new Date(item.data_ocorrencia).toLocaleString("pt-PT") : "—",
		lido: item.lido,
		resolvido: item.resolvido
	}));
}
async function getAnomalias() {
	const { data } = await api.get("/anomalias");
	return data.map((item) => ({
		id: item.id,
		tipo: item.tipo,
		estacao: item.estacao_codigo || item.estacao_id || "Estação desconhecida",
		descricao: item.descricao,
		severidade: item.severidade,
		data: item.data_ocorrencia ? new Date(item.data_ocorrencia).toLocaleString("pt-PT") : "—"
	}));
}
var LIMITES_PADRAO = [
	{
		parametro: "Tensão",
		valor_minimo: 200,
		valor_maximo: 240,
		unidade: "V"
	},
	{
		parametro: "Corrente",
		valor_minimo: null,
		valor_maximo: 12,
		unidade: "A"
	},
	{
		parametro: "Temperatura",
		valor_minimo: null,
		valor_maximo: 60,
		unidade: "°C"
	},
	{
		parametro: "Vibração",
		valor_minimo: null,
		valor_maximo: 2,
		unidade: "g"
	},
	{
		parametro: "Inclinação",
		valor_minimo: null,
		valor_maximo: 5,
		unidade: "°"
	}
];
async function getLimites() {
	try {
		const { data } = await api.get("/configuracoes/limites");
		const lista = Array.isArray(data) ? data : data?.limites ?? [];
		if (lista.length === 0) return LIMITES_PADRAO;
		return lista.map((item) => ({
			id: item.id,
			parametro: item.parametro,
			valor_minimo: item.valor_minimo != null ? Number(item.valor_minimo) : null,
			valor_maximo: item.valor_maximo != null ? Number(item.valor_maximo) : null,
			unidade: item.unidade || extrairUnidade(item.parametro)
		}));
	} catch (error) {
		console.warn("Rota /configuracoes/limites indisponível. A usar limites padrão.", error);
		return LIMITES_PADRAO;
	}
}
function extrairUnidade(parametro) {
	return {
		tensão: "V",
		corrente: "A",
		temperatura: "°C",
		vibração: "g",
		inclinação: "°"
	}[parametro.toLowerCase()] || "";
}
async function atualizarLimites(limites) {
	const payload = limites.map((l) => ({
		parametro: l.parametro,
		valor_minimo: l.valor_minimo,
		valor_maximo: l.valor_maximo
	}));
	const { data } = await api.put("/configuracoes/limites", payload);
	return data;
}
async function getTelemetriaEstacao(codigo, limit = 50) {
	const { data } = await api.get(`/telemetria/estacao/${codigo}?limit=${limit}`);
	return data;
}
async function getTelemetriaRecente(limit = 200) {
	const { data } = await api.get(`/telemetria/recente?limit=${limit}`);
	return data;
}
//#endregion
export { getLimites as a, getEstacoes as i, getAlertas as n, getTelemetriaEstacao as o, getAnomalias as r, getTelemetriaRecente as s, atualizarLimites as t };
