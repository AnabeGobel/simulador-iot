import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { UserPlus, X, Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Painel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth, rotulosPerfil, Perfil } from "@/lib/auth";
import { toast } from "sonner";
import api from "@/services/api"; // Importação do cliente HTTP configurado com o Token JWT
import { ConfirmarAcaoDialog } from "@/components/ConfirmarAcaoDialog";

export const Route = createFileRoute("/app/utilizadores")({
  head: () => ({
    meta: [
      { title: "Utilizadores — SIMIE-Caála" },
      { name: "description", content: "Gestão de utilizadores, perfis e permissões do sistema." },
      { property: "og:title", content: "Utilizadores — SIMIE-Caála" },
      { property: "og:description", content: "Controle de acesso por perfil: admin, técnico e operador." },
    ],
  }),
  component: Utilizadores,
});

// Interface que espelha os dados retornados pela nossa tabela do Supabase
interface UtilizadorAPI {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  ultimoAcesso?: string;
  ativo: boolean;
}

const matriz: [string, string, string, string][] = [
  ["Dashboard", "✅", "✅", "✅"],
  ["Monitoramento", "✅", "✅", "✅"],
  ["Estações", "✅", "✅", "👁️"],
  ["Sensores", "✅", "✅", "👁️"],
  ["Anomalias", "✅", "✅", "👁️"],
  ["Alertas", "✅", "✅", "✅"],
  ["Grafana", "✅", "✅", "👁️"],
  ["Relatórios", "✅", "✅", "👁️"],
  ["Exportar dados", "✅", "✅", "❌"],
  ["Utilizadores", "✅", "❌", "❌"],
  ["Configurar limites", "✅", "❌", "❌"],
  ["Configurações", "✅", "❌", "❌"],
];

const DESCRICOES_PERFIL: Record<Perfil, string> = {
  admin: "Acesso total ao sistema, incluindo gestão de utilizadores, configurações globais e definição de limites.",
  tecnico: "Pode monitorar estações, consultar sensores, analisar anomalias, exportar dados e gerar relatórios.",
  operador: "Acesso focado em visualização do dashboard, relatórios e recepção de alertas operacionais.",
};

function Utilizadores() {
  const { pode, carregado, sessao } = useAuth();
  const navigate = useNavigate();

  // Estados de controlo da lista e carregamento
  const [lista, setLista] = useState<UtilizadorAPI[]>([]);
  const [carregandoTabela, setCarregandoTabela] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [idsEmRemocao, setIdsEmRemocao] = useState<Set<string>>(new Set());
  const [utilizadorParaRemover, setUtilizadorParaRemover] = useState<UtilizadorAPI | null>(null);

  // Campos do formulário de registo
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [perfil, setPerfil] = useState<Perfil>("tecnico");
  const [ativa, setAtiva] = useState(true);

  // Redireciona caso o utilizador não tenha permissão de visualização
  useEffect(() => {
    if (carregado && !pode("utilizadores")) navigate({ to: "/app", replace: true });
  }, [carregado, pode, navigate]);

  // Função para carregar os utilizadores vindos da API/Supabase
  const buscarUtilizadores = async () => {
    setCarregandoTabela(true);
    try {
      // Pedido GET para a API Node.js
      const resposta = await api.get("/usuarios");
      
      // Mapeamento dos campos do Backend para a interface do Frontend
      const dadosMapeados: UtilizadorAPI[] = resposta.data.map((u: any) => ({
        id: u.id,
        nome: u.nome_completo || u.nome || "Sem Nome",
        email: u.email,
        // Garante a conversão dos nomes de perfil recebidos do backend para a chave do frontend
        perfil: (u.perfil?.toLowerCase() === "administrador" ? "admin" : u.perfil?.toLowerCase()) as Perfil,
        ultimoAcesso: u.ultimo_acesso ? new Date(u.ultimo_acesso).toLocaleDateString("pt-AO") : "Nunca",
        ativo: u.estado === "Ativa" || u.ativo === true,
      }));

      setLista(dadosMapeados);
    } catch (err: any) {
      toast.error("Erro ao carregar a lista de utilizadores da API.");
    } finally {
      setCarregandoTabela(false);
    }
  };

  // Executa a busca ao montar o componente
  useEffect(() => {
    if (carregado && pode("utilizadores")) {
      buscarUtilizadores();
    }
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

  // Função para submeter o novo utilizador para a API
  const handleSalvarUtilizador = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailLimpo = email.trim().toLowerCase();

    // 1. Validação simples de formato
    if (!emailLimpo.includes("@") || !emailLimpo.includes(".")) {
      toast.error("Por favor, introduza um e-mail válido.");
      return;
    }

    // 2. Validação de tamanho da senha
    if (senha.length < 6) {
      toast.error("A palavra-passe deve conter pelo menos 6 caracteres.");
      return;
    }

    // 3. Validação de confirmação de palavra-passe
    if (senha !== confirmarSenha) {
      toast.error("A palavra-passe e a confirmação não coincidem.");
      return;
    }

    setSalvando(true);

    try {
      // Converte a chave do frontend (admin, tecnico, operador) para a string esperada no Supabase
      const perfilBackend = perfil === "admin" ? "Administrador" : perfil === "tecnico" ? "Técnico" : "Operador";

      // Chamada HTTP POST para a rota de registo do Supabase Auth
      await api.post("/auth/registrar", {
        email: emailLimpo,
        password: senha,
        nome_completo: nome.trim(),
        username: emailLimpo.split("@")[0], // Gera um username a partir do e-mail
        telefone: telefone.trim(),
        perfil: perfilBackend,
      });

      toast.success(`Utilizador ${nome.trim()} criado com sucesso!`);
      
      // Recarrega a lista diretamente do Supabase e fecha o modal
      await buscarUtilizadores();
      setModalAberto(false);
      limparFormulario();
    } catch (err: any) {
      // Trata mensagens de erro retornadas pelo backend/Supabase
      const mensagemErro = err.response?.data?.error || "Erro ao criar conta no servidor.";
      toast.error(mensagemErro);
    } finally {
      setSalvando(false);
    }
  };

  // Alterna o estado (Ativo/Inativo) de um utilizador na API
  const handleToggleEstado = async (id: string, novoEstado: boolean) => {
    try {
      const estadoTexto = novoEstado ? "Ativa" : "Inativa";
      await api.patch(`/usuarios/${id}`, { estado: estadoTexto });

      // Atualiza o estado local para uma resposta imediata na UI
      setLista((l) => l.map((x) => (x.id === id ? { ...x, ativo: novoEstado } : x)));
      toast.success(`Conta ${novoEstado ? "ativada" : "bloqueada"}.`);
    } catch (err: any) {
      toast.error("Erro ao alterar o estado da conta no servidor.");
    }
  };

  // Remove definitivamente um utilizador (conta de acesso + perfil)
  const handleRemoverUtilizador = async (utilizador: UtilizadorAPI) => {
    setIdsEmRemocao((prev) => new Set(prev).add(utilizador.id));
    try {
      await api.delete(`/usuarios/${utilizador.id}`);
      setLista((prev) => prev.filter((u) => u.id !== utilizador.id));
      setUtilizadorParaRemover(null);
      toast.success(`Utilizador ${utilizador.nome} removido.`);
    } catch (err: any) {
      toast.error(err?.response?.data?.erro || "Erro ao remover utilizador.");
    } finally {
      setIdsEmRemocao((prev) => {
        const proximo = new Set(prev);
        proximo.delete(utilizador.id);
        return proximo;
      });
    }
  };

  return (
    <AppShell titulo="Utilizadores" descricao="Gestão de contas, perfis e permissões">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <p className="min-w-0 truncate text-sm text-muted-foreground">{lista.length} contas registadas</p>
        <Button onClick={() => setModalAberto(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Adicionar utilizador
        </Button>
      </div>

      <Painel titulo="Todos os utilizadores" className="mt-4">
        <div className="overflow-x-auto">
          {carregandoTabela ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> A carregar utilizadores do Supabase...
            </div>
          ) : (
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3">Nome</th>
                  <th className="py-2 pr-3">E-mail</th>
                  <th className="py-2 pr-3">Perfil</th>
                  <th className="py-2 pr-3">Último acesso</th>
                  <th className="py-2 pr-3">Conta ativa</th>
                  <th className="py-2 pr-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lista.map((u) => (
                  <tr key={u.id}>
                    <td className="py-2.5 pr-3 font-medium">{u.nome}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{u.email}</td>
                    <td className="py-2.5 pr-3">{rotulosPerfil[u.perfil] || u.perfil}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{u.ultimoAcesso}</td>
                    <td className="py-2.5 pr-3">
                      <Switch
                        checked={u.ativo}
                        onCheckedChange={(v) => handleToggleEstado(u.id, v)}
                      />
                    </td>
                    <td className="py-2.5 pr-3">
                      {u.id !== sessao?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={idsEmRemocao.has(u.id)}
                          onClick={() => setUtilizadorParaRemover(u)}
                          title="Remover utilizador"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Painel>

      <ConfirmarAcaoDialog
        aberto={!!utilizadorParaRemover}
        titulo="Remover utilizador?"
        descricao={utilizadorParaRemover ? `A conta de ${utilizadorParaRemover.nome} (${utilizadorParaRemover.email}) será removida e deixará de aceder ao sistema. Esta ação não pode ser desfeita.` : ""}
        textoConfirmar="Remover utilizador"
        carregando={utilizadorParaRemover ? idsEmRemocao.has(utilizadorParaRemover.id) : false}
        onCancelar={() => setUtilizadorParaRemover(null)}
        onConfirmar={() => utilizadorParaRemover && void handleRemoverUtilizador(utilizadorParaRemover)}
      />

      <Painel titulo="Matriz de permissões" className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-3">Funcionalidade</th>
                <th className="py-2 pr-3">Admin</th>
                <th className="py-2 pr-3">Técnico</th>
                <th className="py-2 pr-3">Operador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {matriz.map((linha) => (
                <tr key={linha[0]}>
                  <td className="py-2 pr-3">{linha[0]}</td>
                  <td className="py-2 pr-3">{linha[1]}</td>
                  <td className="py-2 pr-3">{linha[2]}</td>
                  <td className="py-2 pr-3">{linha[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">👁️ significa somente consulta.</p>
      </Painel>

      {/* MODAL ADICIONAR UTILIZADOR */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-lg font-bold">Adicionar Utilizador</h2>
                <p className="text-xs text-muted-foreground">Registe uma nova conta no sistema</p>
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

            {/* Formulário */}
            <form onSubmit={handleSalvarUtilizador} className="mt-4 space-y-5">
              {/* Seção 1: Dados Pessoais */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Dados Pessoais
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="nome">
                    Nome completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Manuel António"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">
                      E-mail <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="utilizador@caala.ao"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      placeholder="+244 923 000 000"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {/* Seção 2: Conta */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Conta
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="senha">
                      Palavra-passe <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="senha"
                        type={verSenha ? "text" : "password"}
                        placeholder="Mínimo 6 caracteres"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setVerSenha((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {verSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirmarSenha">
                      Confirmar palavra-passe <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="confirmarSenha"
                      type={verSenha ? "text" : "password"}
                      placeholder="Repita a palavra-passe"
                      required
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {/* Seção 3: Acesso */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Acesso
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="perfil">
                    Perfil <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="perfil"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={perfil}
                    onChange={(e) => setPerfil(e.target.value as Perfil)}
                  >
                    <option value="admin">Administrador</option>
                    <option value="tecnico">Técnico</option>
                    <option value="operador">Operador</option>
                  </select>

                  {/* Descrição dinâmica do perfil */}
                  <div className="mt-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-0.5">{rotulosPerfil[perfil]}</p>
                    <p>{DESCRICOES_PERFIL[perfil]}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>Estado</Label>
                  <div className="flex items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="estadoConta"
                        checked={ativa}
                        onChange={() => setAtiva(true)}
                        className="accent-primary h-4 w-4"
                      />
                      Ativa
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer font-medium text-muted-foreground">
                      <input
                        type="radio"
                        name="estadoConta"
                        checked={!ativa}
                        onChange={() => setAtiva(false)}
                        className="accent-primary h-4 w-4"
                      />
                      Inativa
                    </label>
                  </div>
                </div>
              </div>

              {/* Rodapé do Modal */}
              <div className="flex justify-end gap-3 border-t border-border pt-4 mt-6">
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
                <Button type="submit" disabled={salvando}>
                  {salvando ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> A criar...
                    </>
                  ) : (
                    "Criar Utilizador"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}