import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Search, X, Eye, MapPin, Activity, Cpu, Calendar, Loader2, LocateFixed, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Painel, EstadoBadge, SomenteLeitura } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { api } from "../services/api";
import { toast } from "sonner";
import { MapaEstacao } from "@/components/MapaEstacao";
import { ConfirmarAcaoDialog } from "@/components/ConfirmarAcaoDialog";

export const Route = createFileRoute("/app/estacoes")({
  head: () => ({
    meta: [
      { title: "Estações IoT — IoT Energia Caálá" },
      { name: "description", content: "Cadastro, estado e gestão das estações IoT de monitoramento." },
      { property: "og:title", content: "Estações IoT — IoT Energia Caálá" },
      { property: "og:description", content: "Todas as estações, estado e última comunicação." },
    ],
  }),
  component: Estacoes,
});

export type EstadoEstacao = "ok" | "alerta" | "perigo" | "offline";

export interface EstacaoBase {
  id: string;
  codigo: string;
  local: string;
  estado: EstadoEstacao;
  ultimaComunicacao: string;
  bateria: number;
  devEui: string;
  ativa: boolean;
  latitude?: number;
  longitude?: number;
  nome?: string;
  descricao?: string;
  descricaoLocal?: string;
}

export interface EstacaoDetalhada extends EstacaoBase {
  telemetria?: {
    measurement: string;
    tags: { estacao: string; dispositivo: string };
    fields: {
      temperatura: number;
      tensao: number;
      corrente: number;
      vibracao: number;
      inclinacao: number;
    };
    timestamp: string;
  };
}

function mapearEstacaoApi(e: any): EstacaoBase {
  const estadoFormatado: EstadoEstacao = 
    e.estado === "Inativa" || e.ativa === false ? "offline" : "ok";

  return {
    id: String(e.id),
    codigo: e.codigo,
    local: e.municipio ? `${e.municipio}${e.comuna ? `, ${e.comuna}` : ""}` : e.nome ?? e.local ?? "—",
    estado: estadoFormatado,
    ultimaComunicacao: e.ultima_comunicacao
      ? new Date(e.ultima_comunicacao).toLocaleString("pt-PT")
      : e.created_at
        ? new Date(e.created_at).toLocaleString("pt-PT")
        : "—",
    bateria: e.bateria ?? 100,
    devEui: e.device_id ?? e.dev_eui ?? "—",
    ativa: e.estado ? e.estado !== "Inativa" : (e.ativa ?? true),
    latitude: e.latitude != null ? Number(e.latitude) : undefined,
    longitude: e.longitude != null ? Number(e.longitude) : undefined,
    nome: e.nome ?? undefined,
    descricao: e.descricao ?? undefined,
    descricaoLocal: e.descricao_local ?? undefined,
  };
}

function Estacoes() {
  const { podeEditar } = useAuth();
  const editar = podeEditar("estacoes");

  const [q, setQ] = useState("");
  const [lista, setLista] = useState<EstacaoBase[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [estacaoDetalhes, setEstacaoDetalhes] = useState<EstacaoDetalhada | null>(null);
  const [idsEmRemocao, setIdsEmRemocao] = useState<Set<string>>(new Set());
  const [idsEmAtualizacao, setIdsEmAtualizacao] = useState<Set<string>>(new Set());
  const [estacaoParaRemover, setEstacaoParaRemover] = useState<EstacaoBase | null>(null);

  // Estados do formulário de criação
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [deviceId, setDeviceId] = useState("ESP32-TESTE-01");
  const [descricao, setDescricao] = useState("");
  const [ativa, setAtiva] = useState(true);

  // Localização
  const [provincia, setProvincia] = useState("Huambo");
  const [municipio, setMunicipio] = useState("Caála");
  const [comuna, setComuna] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [descricaoLocal, setDescricaoLocal] = useState("");
  const [aLocalizar, setALocalizar] = useState(false);
  const [localizacaoAutomatica, setLocalizacaoAutomatica] = useState(false);

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

  useEffect(() => {
    buscarEstacoes();
  }, []);

  const capturarLocalizacaoAtual = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Este dispositivo/navegador não suporta geolocalização.");
      return;
    }
    setALocalizar(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
        setLocalizacaoAutomatica(true);
        setALocalizar(false);
        toast.success("Localização atual capturada.");
      },
      () => {
        setALocalizar(false);
        setLocalizacaoAutomatica(false);
        toast.error("Não foi possível obter a localização. Permita o acesso ao GPS e tente novamente.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (!modalAberto) return;

    setLatitude("");
    setLongitude("");
    setLocalizacaoAutomatica(false);
    capturarLocalizacaoAtual();
    // A captura acontece automaticamente uma vez, ao abrir o formulário.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalAberto]);

  const filtradas = lista.filter(
    (e) =>
      e.codigo.toLowerCase().includes(q.toLowerCase()) ||
      e.local.toLowerCase().includes(q.toLowerCase())
  );

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

  const handleAbrirDetalhes = (estacao: EstacaoBase) => {
    const dadosCompletos: EstacaoDetalhada = {
      ...estacao,
      telemetria: {
        measurement: "energia",
        tags: {
          estacao: estacao.codigo,
          dispositivo: estacao.devEui || `ESP32-${estacao.codigo.split("-")[1] || "001"}`,
        },
        fields: { temperatura: 32.1, tensao: 220, corrente: 4.2, vibracao: 0.08, inclinacao: 2.1 },
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      },
    };
    setEstacaoDetalhes(dadosCompletos);
  };

  const handleSalvarEstacao = async (e: React.FormEvent) => {
    e.preventDefault();

    const codigoTratado = codigo.trim().toUpperCase();
    const deviceIdTratado = deviceId.trim();

    if (!deviceIdTratado) {
      toast.error("Por favor informe o Device ID (ID do dispositivo IoT).");
      return;
    }

    const existe = lista.some((item) => item.codigo.toUpperCase() === codigoTratado);
    if (existe) {
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
        dev_eui: deviceIdTratado,
      });

      toast.success(`Estação ${codigoTratado} adicionada com sucesso!`);
      setModalAberto(false);
      limparFormulario();
      await buscarEstacoes();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Erro ao criar estação no servidor.");
    } finally {
      setSalvando(false);
    }
  };

  const handleAlternarAtiva = async (estacao: EstacaoBase, novoValor: boolean) => {
    setIdsEmAtualizacao((prev) => new Set(prev).add(estacao.id));
    // Atualização otimista: reflete já na tabela, e reverte se a API falhar.
    setLista((prev) =>
      prev.map((e) => (e.id === estacao.id ? { ...e, ativa: novoValor, estado: novoValor ? "ok" : "offline" } : e))
    );

    try {
      await api.patch(`/estacoes/${estacao.id}/estado`, { ativa: novoValor });
      toast.success(
        `Estação ${estacao.codigo} ${novoValor ? "ativada" : "desativada"}.` +
          (!novoValor ? " Deixa de aceitar telemetria enquanto estiver inativa." : "")
      );
    } catch (err: any) {
      setLista((prev) =>
        prev.map((e) => (e.id === estacao.id ? { ...e, ativa: !novoValor, estado: !novoValor ? "ok" : "offline" } : e))
      );
      toast.error(err?.response?.data?.error || "Erro ao atualizar estado da estação.");
    } finally {
      setIdsEmAtualizacao((prev) => {
        const proximo = new Set(prev);
        proximo.delete(estacao.id);
        return proximo;
      });
    }
  };

  const handleRemoverEstacao = async (estacao: EstacaoBase) => {
    setIdsEmRemocao((prev) => new Set(prev).add(estacao.id));
    try {
      await api.delete(`/estacoes/${estacao.id}`);
      setLista((prev) => prev.filter((e) => e.id !== estacao.id));
      setEstacaoParaRemover(null);
      toast.success(`Estação ${estacao.codigo} removida.`);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Erro ao remover estação.");
    } finally {
      setIdsEmRemocao((prev) => {
        const proximo = new Set(prev);
        proximo.delete(estacao.id);
        return proximo;
      });
    }
  };

  return (
    <AppShell titulo="Estações IoT" descricao="Todas as estações e o seu estado atual">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="relative min-w-0 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Pesquisar estação ou local…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        {editar ? (
          <Button onClick={() => {
            limparFormulario();
            setModalAberto(true);
          }}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        ) : (
          <SomenteLeitura />
        )}
      </div>

      <Painel titulo={`${filtradas.length} estações`} className="mt-4">
        {carregando ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> A carregar estações…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3">Código</th>
                  <th className="py-2 pr-3">Nome / local</th>
                  <th className="py-2 pr-3">Estado</th>
                  <th className="py-2 pr-3">Última comunicação</th>
                  <th className="py-2 pr-3">Bateria</th>
                  <th className="py-2 pr-3">Device ID</th>
                  <th className="py-2 pr-3">Ativa</th>
                  <th className="py-2 pr-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtradas.map((e) => (
                  <tr key={e.id}>
                    <td className="py-2.5 pr-3 font-medium">{e.codigo}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">
                      <div className="font-medium text-foreground">{e.nome || e.codigo}</div>
                      <div>{e.local}</div>
                    </td>
                    <td className="py-2.5 pr-3">
                      <EstadoBadge estado={e.estado as any} />
                    </td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{e.ultimaComunicacao}</td>
                    <td className="py-2.5 pr-3">{e.bateria}%</td>
                    <td className="py-2.5 pr-3 font-mono text-xs text-muted-foreground">{e.devEui}</td>
                    <td className="py-2.5 pr-3">
                      <Switch
                        checked={e.ativa}
                        disabled={!editar || idsEmAtualizacao.has(e.id)}
                        onCheckedChange={(novoValor) => handleAlternarAtiva(e, novoValor)}
                      />
                    </td>
                    <td className="py-2.5 pr-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAbrirDetalhes(e)}>
                          <Eye className="mr-1.5 h-3.5 w-3.5" /> Ver
                        </Button>
                        {editar && (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={idsEmRemocao.has(e.id)}
                            onClick={() => setEstacaoParaRemover(e)}
                            title="Remover estação"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtradas.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-sm text-muted-foreground">
                      Nenhuma estação encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Painel>

      {/* MODAL DETALHES */}
      {estacaoDetalhes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-bold">{estacaoDetalhes.codigo}</h2>
              <Button variant="ghost" size="icon" onClick={() => setEstacaoDetalhes(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span>Estado: <EstadoBadge estado={estacaoDetalhes.estado as any} /></span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" /> Device ID: {estacaoDetalhes.devEui}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" /> {estacaoDetalhes.ultimaComunicacao}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" /> {estacaoDetalhes.local}
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Nome:</span> {estacaoDetalhes.nome || "—"}
              </p>
              <p>
                <span className="font-medium">Descrição:</span> {estacaoDetalhes.descricao || "—"}
              </p>
              <p>
                <span className="font-medium">Descrição do local:</span> {estacaoDetalhes.descricaoLocal || "—"}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {estacaoDetalhes.latitude != null && estacaoDetalhes.longitude != null ? (
                <>
                  <MapaEstacao
                    latitude={estacaoDetalhes.latitude}
                    longitude={estacaoDetalhes.longitude}
                    codigo={estacaoDetalhes.codigo}
                    nome={estacaoDetalhes.nome}
                  />
                  <p className="text-[11px] text-muted-foreground text-center">
                    Coordenadas: {estacaoDetalhes.latitude}, {estacaoDetalhes.longitude}
                  </p>
                </>
              ) : (
                <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  Esta estação ainda não tem coordenadas cadastradas.
                </p>
              )}
            </div>

            <div className="flex justify-end border-t border-border pt-4 mt-6">
              <Button variant="outline" onClick={() => setEstacaoDetalhes(null)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmarAcaoDialog
        aberto={!!estacaoParaRemover}
        titulo="Remover estação?"
        descricao={estacaoParaRemover ? `A estação ${estacaoParaRemover.codigo} e os sensores associados serão removidos. Esta ação não pode ser desfeita.` : ""}
        textoConfirmar="Remover estação"
        carregando={estacaoParaRemover ? idsEmRemocao.has(estacaoParaRemover.id) : false}
        onCancelar={() => setEstacaoParaRemover(null)}
        onConfirmar={() => estacaoParaRemover && void handleRemoverEstacao(estacaoParaRemover)}
      />

      {/* MODAL DE ADICIONAR ESTAÇÃO */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-lg font-bold">Adicionar Nova Estação IoT</h2>
                <p className="text-xs text-muted-foreground">Preencha as informações para registar a estação</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setModalAberto(false);
                  limparFormulario();
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSalvarEstacao} className="mt-4 space-y-6">
              {/* Seção A */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">A. Identificação</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="codigo">
                      Código da estação <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="codigo"
                      placeholder="Ex: CAALA-001"
                      required
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="nome">
                      Nome da estação <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nome"
                      placeholder="Ex: Estação CAALA 001"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="deviceId">
                    Device ID (IoT) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="deviceId"
                    placeholder="Ex: ESP32-TESTE-01"
                    required
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    rows={2}
                    placeholder="Estação de monitoramento da rede elétrica"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Estado *</Label>
                  <div className="flex items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
                      <input type="radio" name="estado" checked={ativa} onChange={() => setAtiva(true)} className="accent-primary h-4 w-4" />
                      Ativa
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer font-medium text-muted-foreground">
                      <input type="radio" name="estado" checked={!ativa} onChange={() => setAtiva(false)} className="accent-primary h-4 w-4" />
                      Inativa
                    </label>
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {/* Seção B */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">B. Localização</h3>
                  <Button type="button" size="sm" variant="outline" onClick={capturarLocalizacaoAtual} disabled={aLocalizar}>
                    {aLocalizar ? (
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <LocateFixed className="mr-1.5 h-3.5 w-3.5" />
                    )}
                    {aLocalizar ? "A localizar…" : "Usar localização atual"}
                  </Button>
                </div>

                {localizacaoAutomatica && (
                  <p className="rounded-md bg-success/10 px-3 py-1.5 text-xs text-success">
                    Coordenadas capturadas automaticamente pelo GPS deste dispositivo.
                  </p>
                )}

                {!localizacaoAutomatica && !aLocalizar && (
                  <p className="rounded-md bg-warning/10 px-3 py-1.5 text-xs text-warning-foreground">
                    O cadastro aguarda a localização real. Permita o acesso ao GPS para continuar.
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="provincia">Província</Label>
                    <Input id="provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="municipio">Município</Label>
                    <Input id="municipio" value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comuna">Comuna</Label>
                    <Input id="comuna" placeholder="Nome da comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="A capturar automaticamente…"
                      readOnly
                      value={latitude}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="A capturar automaticamente…"
                      readOnly
                      value={longitude}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="descricaoLocal">Descrição do local</Label>
                  <Input
                    id="descricaoLocal"
                    placeholder="Ex: Próximo ao PT da zona industrial"
                    value={descricaoLocal}
                    onChange={(e) => setDescricaoLocal(e.target.value)}
                  />
                </div>
              </div>

              {/* Rodapé */}
              <div className="flex justify-end gap-3 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setModalAberto(false);
                    limparFormulario();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={salvando || aLocalizar || !localizacaoAutomatica}>
                  {salvando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Salvar Estação
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}