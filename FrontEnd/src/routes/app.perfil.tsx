import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff, KeyRound, Loader2, User } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Painel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, rotulosPerfil } from "@/lib/auth";
import { api } from "../services/api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({
    meta: [
      { title: "Meu Perfil — IoT Energia Caálá" },
      { name: "description", content: "Dados da conta, sessão e alteração de palavra-passe." },
      { property: "og:title", content: "Meu Perfil — IoT Energia Caálá" },
      { property: "og:description", content: "Gere a sua conta e a sua palavra-passe." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { sessao } = useAuth();

  const [mostrarAtual, setMostrarAtual] = useState(false);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [mostrarConf, setMostrarConf] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aGuardar, setAGuardar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const limparFormulario = () => {
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      await api.patch("/usuarios/alterar-senha", { senhaAtual, novaSenha });
      toast.success("Palavra-passe alterada com sucesso.");
      limparFormulario();
    } catch (err: any) {
      setErro(err?.response?.data?.erro || "Erro ao alterar a palavra-passe.");
    } finally {
      setAGuardar(false);
    }
  };

  return (
    <AppShell titulo="Meu Perfil" descricao="Dados da conta e segurança">
      <div className="grid gap-4 xl:grid-cols-2">
        <Painel titulo="Dados da conta">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
              <User className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{sessao?.nome}</p>
              <p className="truncate text-sm text-muted-foreground">{sessao?.email}</p>
              <p className="truncate text-xs text-primary">
                {sessao ? rotulosPerfil[sessao.perfil] : ""}
              </p>
            </div>
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
              <dt className="truncate text-muted-foreground">Sessão iniciada em</dt>
              <dd className="font-medium">
                {sessao ? new Date(sessao.entradaEm).toLocaleString("pt-PT") : "—"}
              </dd>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
              <dt className="truncate text-muted-foreground">Estado da conta</dt>
              <dd className="font-medium text-success">Ativa</dd>
            </div>
          </dl>
        </Painel>

        <Painel titulo="Alterar palavra-passe">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="atual">Palavra-passe atual</Label>
              <div className="relative">
                <Input
                  id="atual"
                  type={mostrarAtual ? "text" : "password"}
                  className="pr-10"
                  required
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarAtual(!mostrarAtual)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                  aria-label={mostrarAtual ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
                >
                  {mostrarAtual ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nova">Nova palavra-passe</Label>
              <div className="relative">
                <Input
                  id="nova"
                  type={mostrarNova ? "text" : "password"}
                  className="pr-10"
                  required
                  minLength={6}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarNova(!mostrarNova)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                  aria-label={mostrarNova ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
                >
                  {mostrarNova ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="conf">Confirmar nova palavra-passe</Label>
              <div className="relative">
                <Input
                  id="conf"
                  type={mostrarConf ? "text" : "password"}
                  className="pr-10"
                  required
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConf(!mostrarConf)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  tabIndex={-1}
                  aria-label={mostrarConf ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
                >
                  {mostrarConf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {erro && (
              <p className="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">{erro}</p>
            )}

            <Button type="submit" disabled={aGuardar}>
              {aGuardar ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
              Alterar palavra-passe
            </Button>
          </form>
        </Painel>
      </div>
    </AppShell>
  );
}
