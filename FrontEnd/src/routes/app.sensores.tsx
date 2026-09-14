import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Search, X, Cpu, Loader2, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Painel, SomenteLeitura } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { api } from "../services/api";
import { toast } from "sonner";
import { ConfirmarAcaoDialog } from "@/components/ConfirmarAcaoDialog";

export const Route = createFileRoute("/app/sensores")({
  head: () => ({
    meta: [
      { title: "Sensores — SIMIE-Caála" },
      { name: "description", content: "Sensores elétricos e estruturais associados às estações IoT." },
      { property: "og:title", content: "Sensores — SIMIE-Caála" },
      { property: "og:description", content: "Configuração e estado dos sensores da rede." },
    ],
  }),
  component: Sensores,
});

export interface Sensor {
  id: string;
  codigo: string;
  nome: string;
  tipo: string;
  estacao: string;
  estacaoId?: string;
  ultimoValor: number;
  unidade: string;
  ativo: boolean;
  fabricante?: string;
  modelo?: string;
  numeroSerie?: string;
}

interface EstacaoOpcao {
  id: string;
  codigo: string;
  local: string;
}

const TIPOS_SENSORES = [
  "Temperatura",
  "Tensão",
  "Corrente",
  "Energia",
  "Vibração",
  "Inclinação",
  "Aceleração/Movimento",
  "Impacto",
] as const;

const UNIDADES_POR_TIPO: Record<string, string> = {
  Temperatura: "°C",
  Tensão: "V",
  Corrente: "A",
  Energia: "kWh",
  Vibração: "Hz",
  Inclinação: "°",
  "Aceleração/Movimento": "m/s²",
  Impacto: "G",
};

function mapearSensorApi(s: any): Sensor {
  return {
    id: String(s.id),
    codigo: s.codigo ?? String(s.id),
    nome: s.nome,
    tipo: s.tipo,
    estacao: s.estacoes?.codigo ?? s.estacao_id ?? "—",
    estacaoId: s.estacao_id,
    ultimoValor: s.ultimo_valor ?? 0,
    unidade: s.unidade ?? UNIDADES_POR_TIPO[s.tipo] ?? "",
    ativo: s.estado ? s.estado === "Ativo" : (s.ativo ?? true),
  };
}

function Sensores() {
  const { podeEditar } = useAuth();
  const editar = podeEditar("sensores");

  const [q, setQ] = useState("");
  const [lista, setLista] = useState<Sensor[]>([]);
  const [estacoes, setEstacoes] = useState<EstacaoOpcao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [idsEmAtualizacao, setIdsEmAtualizacao] = useState<Set<string>>(new Set());
  const [sensorParaRemover, setSensorParaRemover] = useState<Sensor | null>(null);

  // Estados do formulário
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<string>(TIPOS_SENSORES[0]);
  const [estacaoId, setEstacaoId] = useState("");
  const [ativo, setAtivo] = useState(true);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const [respSensores, respEstacoes] = await Promise.all([
        api.get("/sensores"),
        api.get("/estacoes"),
      ]);
      setLista((respSensores.data ?? []).map(mapearSensorApi));
      const opcoesEstacoes: EstacaoOpcao[] = (respEstacoes.data ?? []).map((e: any) => ({
        id: String(e.id),
        codigo: e.codigo,
        local: e.municipio ?? e.nome ?? e.codigo,
      }));
      setEstacoes(opcoesEstacoes);
      if (opcoesEstacoes[0]) setEstacaoId(opcoesEstacoes[0].id);
    } catch (err) {
      toast.error("Erro ao carregar sensores do servidor.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const filtrados = lista.filter(
    (s) =>
      s.codigo?.toLowerCase().includes(q.toLowerCase()) ||
      s.nome.toLowerCase().includes(q.toLowerCase()) ||
      s.estacao.toLowerCase().includes(q.toLowerCase()) ||
      s.tipo.toLowerCase().includes(q.toLowerCase())
  );

  const limparFormulario = () => {
    setCodigo("");
    setNome("");
    setTipo(TIPOS_SENSORES[0]);
    setEstacaoId(estacoes[0]?.id || "");
    setAtivo(true);
  };

  const handleSalvarSensor = async (e: React.FormEvent) => {
    e.preventDefault();
    const codigoTratado = codigo.trim().toUpperCase();

    const existe = lista.some((item) => item.codigo?.toUpperCase() === codigoTratado);
    if (existe) {
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
        estacao_id: estacaoId,
      });
      toast.success(`Sensor ${codigoTratado} cadastrado com sucesso!`);
      setModalAberto(false);
      limparFormulario();
      await carregarDados();
    } catch (err: any) {
      toast.error(err?.response?.data?.erro || "Erro ao cadastrar sensor no servidor.");
    } finally {
      setSalvando(false);
    }
  };

  const handleAlternarAtivo = async (sensor: Sensor, novoValor: boolean) => {
    setIdsEmAtualizacao((prev) => new Set(prev).add(sensor.id));
    // Atualização otimista: reflete já na tabela, e reverte se a API falhar.
    setLista((prev) => prev.map((s) => (s.id === sensor.id ? { ...s, ativo: novoValor } : s)));

    try {
      await api.patch(`/sensores/${sensor.id}/estado`, { ativo: novoValor });
      toast.success(`Sensor ${sensor.codigo || sensor.id} ${novoValor ? "ativado" : "desativado"}.`);
    } catch (err: any) {
      setLista((prev) => prev.map((s) => (s.id === sensor.id ? { ...s, ativo: !novoValor } : s)));
      toast.error(err?.response?.data?.erro || "Erro ao atualizar estado do sensor.");
    } finally {
      setIdsEmAtualizacao((prev) => {
        const proximo = new Set(prev);
        proximo.delete(sensor.id);
        return proximo;
      });
    }
  };

  const handleRemoverSensor = async (sensor: Sensor) => {
    setIdsEmAtualizacao((prev) => new Set(prev).add(sensor.id));
    try {
      await api.delete(`/sensores/${sensor.id}`);
      setLista((prev) => prev.filter((s) => s.id !== sensor.id));
      setSensorParaRemover(null);
      toast.success(`Sensor ${sensor.codigo || sensor.id} removido.`);
    } catch (err: any) {
      toast.error(err?.response?.data?.erro || "Erro ao remover sensor.");
    } finally {
      setIdsEmAtualizacao((prev) => {
        const proximo = new Set(prev);
        proximo.delete(sensor.id);
        return proximo;
      });
    }
  };

  return (
    <AppShell titulo="Sensores" descricao="Sensores elétricos e estruturais (IMU / MPU6050)">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="relative min-w-0 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Pesquisar por código, nome, tipo ou estação…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        {editar ? (
          <Button onClick={() => setModalAberto(true)}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar sensor
          </Button>
        ) : (
          <SomenteLeitura />
        )}
      </div>

      <Painel titulo={`${filtrados.length} sensores associados`} className="mt-4">
        {carregando ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> A carregar sensores…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3">Código / Nome</th>
                  <th className="py-2 pr-3">Tipo</th>
                  <th className="py-2 pr-3">Estação</th>
                  <th className="py-2 pr-3">Último valor</th>
                  <th className="py-2 pr-3">Ativo</th>
                  <th className="py-2 pr-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtrados.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2.5 pr-3 font-medium">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div>
                          <span className="font-mono text-xs text-primary mr-1.5">[{s.codigo || s.id}]</span>
                          <span>{s.nome}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{s.tipo}</td>
                    <td className="py-2.5 pr-3 font-medium">{s.estacao}</td>
                    <td className="py-2.5 pr-3 font-mono">
                      {s.ativo ? `${s.ultimoValor} ${s.unidade}` : "—"}
                    </td>
                    <td className="py-2.5 pr-3">
                      <Switch
                        checked={s.ativo}
                        disabled={!editar || idsEmAtualizacao.has(s.id)}
                        onCheckedChange={(novoValor) => handleAlternarAtivo(s, novoValor)}
                      />
                    </td>
                    <td className="py-2.5 pr-3">
                      {editar && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={idsEmAtualizacao.has(s.id)}
                          onClick={() => setSensorParaRemover(s)}
                          title="Remover sensor"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-sm text-muted-foreground">
                      Nenhum sensor encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Painel>

      <ConfirmarAcaoDialog
        aberto={!!sensorParaRemover}
        titulo="Remover sensor?"
        descricao={sensorParaRemover ? `O sensor ${sensorParaRemover.codigo || sensorParaRemover.id} será removido. Esta ação não pode ser desfeita.` : ""}
        textoConfirmar="Remover sensor"
        carregando={sensorParaRemover ? idsEmAtualizacao.has(sensorParaRemover.id) : false}
        onCancelar={() => setSensorParaRemover(null)}
        onConfirmar={() => sensorParaRemover && void handleRemoverSensor(sensorParaRemover)}
      />

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-lg font-bold">Adicionar Sensor</h2>
                <p className="text-xs text-muted-foreground">Registe um novo sensor elétrico ou estrutural</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { setModalAberto(false); limparFormulario(); }}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSalvarSensor} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="codigo">Código do sensor <span className="text-destructive">*</span></Label>
                  <Input id="codigo" placeholder="Ex: SEN-001" required value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nome">Nome do sensor <span className="text-destructive">*</span></Label>
                  <Input id="nome" placeholder="Ex: MPU6050 - Eixo Z" required value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="tipo">Tipo de sensor <span className="text-destructive">*</span></Label>
                  <select
                    id="tipo"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    {TIPOS_SENSORES.map((t) => (
                      <option key={t} value={t}>{t} ({UNIDADES_POR_TIPO[t]})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="estacao">Estação associada <span className="text-destructive">*</span></Label>
                  <select
                    id="estacao"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={estacaoId}
                    onChange={(e) => setEstacaoId(e.target.value)}
                  >
                    {estacoes.map((est) => (
                      <option key={est.id} value={est.id}>{est.codigo} - {est.local}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="ativo" className="cursor-pointer font-medium">Ativar sensor imediatamente</Label>
                <Switch id="ativo" checked={ativo} onCheckedChange={setAtivo} />
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-6">
                <Button type="button" variant="outline" onClick={() => { setModalAberto(false); limparFormulario(); }}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={salvando}>
                  {salvando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Salvar Sensor
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
