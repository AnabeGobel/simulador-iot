import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({
    meta: [{ title: "Definir nova palavra-passe — SIMIE-Caála" }],
  }),
  component: RedefinirSenha,
});

// Esta página é o destino do link enviado por e-mail (ver
// recuperar-senha.tsx: redirectTo). O supabase-js, ao carregar a página,
// lê automaticamente o token que vem na URL e cria uma sessão de
// recuperação temporária — é essa sessão que permite chamar
// supabase.auth.updateUser({ password }) sem precisar de mais nada.
function RedefinirSenha() {
  const navigate = useNavigate();
  const [pronto, setPronto] = useState(false);
  const [linkInvalido, setLinkInvalido] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [ver, setVer] = useState(false);
  const [aGuardar, setAGuardar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // Confirma que existe mesmo uma sessão de recuperação válida vinda do link.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setPronto(true);
      } else {
        setLinkInvalido(true);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">SIMIE</p>
            <p className="text-xs text-primary">CAALÁ</p>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-bold">Definir nova palavra-passe</h1>

        {linkInvalido && (
          <>
            <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Este link é inválido ou já expirou. Peça um novo pedido de recuperação.
            </p>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/recuperar-senha" className="font-medium text-primary">
                Pedir novo link
              </Link>
            </p>
          </>
        )}

        {pronto && (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="novaSenha">Nova palavra-passe</Label>
              <div className="relative">
                <Input
                  id="novaSenha"
                  type={ver ? "text" : "password"}
                  required
                  minLength={6}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setVer((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {ver ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmar">Confirmar nova palavra-passe</Label>
              <Input
                id="confirmar"
                type={ver ? "text" : "password"}
                required
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
              />
            </div>

            {erro && (
              <p className="rounded-md bg-destructive/10 p-3 text-center text-sm font-medium text-destructive">
                {erro}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={aGuardar}>
              {aGuardar ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
              Guardar nova palavra-passe
            </Button>
          </form>
        )}

        {!pronto && !linkInvalido && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> A validar o link…
          </div>
        )}
      </div>
    </div>
  );
}
