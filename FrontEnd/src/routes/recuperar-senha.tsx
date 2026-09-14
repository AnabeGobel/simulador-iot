import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, Mail, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar palavra-passe — SIMIE-Caála" },
      {
        name: "description",
        content: "Recupere o acesso à sua conta do sistema de monitoramento SIMIE-Caála.",
      },
      { property: "og:title", content: "Recuperar palavra-passe — SIMIE-Caála" },
      { property: "og:description", content: "Enviaremos instruções de recuperação para o seu e-mail." },
    ],
  }),
  component: RecuperarPage,
});

export function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [aEnviar, setAEnviar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setAEnviar(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });

      if (error) {
        // Mostra o motivo real do Supabase (não a mensagem genérica) —
        // isto é temporário só para diagnosticar; depois de resolvido dá
        // para voltar a uma mensagem mais simples.
        console.error("Erro do Supabase ao pedir recuperação:", error);
        setErro(`Erro do Supabase: ${error.message} (status ${error.status ?? "?"})`);
        return;
      }

      setEnviado(true);
    } finally {
      setAEnviar(false);
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

        <h1 className="mt-8 text-2xl font-bold">Recuperar palavra-passe</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Informe o seu e-mail e enviaremos as instruções de recuperação.
        </p>

        {enviado ? (
          <div className="mt-6 rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
            Se existir uma conta com esse e-mail, as instruções foram enviadas. Verifique a sua caixa
            de correio (e a pasta de spam).
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  className="pl-9"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {erro && (
              <p className="rounded-md bg-destructive/10 p-3 text-center text-xs font-medium text-destructive">
                {erro}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={aEnviar}>
              {aEnviar ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
              Enviar instruções
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="font-medium text-primary">
            Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
}
