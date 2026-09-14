import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, LogIn, Lock, Mail, Moon, Sun, Zap, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — IoT Energia Caálá" },
      { name: "description", content: "Aceda à sua conta do sistema de monitoramento IoT Energia Caálá." },
      { property: "og:title", content: "Login — IoT Energia Caálá" },
      { property: "og:description", content: "Entre para continuar a monitorar a sua infraestrutura." },
    ],
  }),
  component: LoginPage,
});

export function LoginPage() {
  const { entrar, sessao, carregado } = useAuth();
  const { tema, alternar } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ver, setVer] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [aEntrar, setAEntrar] = useState(false);

  useEffect(() => {
    if (carregado && sessao) navigate({ to: "/app", replace: true });
  }, [carregado, sessao, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setAEntrar(true);
    try {
      const res = await entrar(email, senha);
      if (!res.ok) {
        setErro(res.erro ?? "Falha ao entrar.");
      } else {
        // O que cada perfil vê/edita dentro de /app é decidido por
        // sessao.perfil em lib/auth.tsx (pode/podeEditar) — não há
        // redirecionamento separado por perfil, é a própria interface
        // que se adapta.
        navigate({ to: "/app", replace: true });
      }
    } finally {
      setAEntrar(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4 sm:p-6">
      {/* Botão de alternar tema no canto superior direito */}
      <div className="absolute right-4 top-4">
        <Button variant="ghost" size="icon" onClick={alternar} aria-label="Alternar tema">
          {tema === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Card único centralizado */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        {/* Logotipo centralizado por cima */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
            <Zap className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">IoT Energia</h1>
          <p className="text-xs font-semibold tracking-widest text-primary">CAALÁ</p>
        </div>

        {/* Título da seção */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Acesse a sua conta</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Informe as suas credenciais para aceder ao sistema
          </p>
        </div>

        {/* Formulário de Login */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <div className="space-y-1.5">
            <Label htmlFor="senha">Palavra-passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="senha"
                type={ver ? "text" : "password"}
                required
                className="px-9"
                placeholder="A sua palavra-passe"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setVer((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Mostrar palavra-passe"
              >
                {ver ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <Checkbox id="lembrar" /> Lembrar-me
            </label>
            <Link to="/recuperar-senha" className="font-medium text-primary hover:underline">
              Esqueceu a palavra-passe?
            </Link>
          </div>

          {erro && (
            <p className="rounded-md bg-destructive/10 p-3 text-center text-sm font-medium text-destructive">
              {erro}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={aEntrar}>
            {aEntrar ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> A entrar...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Entrar
              </>
            )}
          </Button>
        </form>

        {/* Sistema privado: sem link de registo. Só um Administrador
            cria contas, a partir de /app/utilizadores. */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Não tem conta? Contacte o administrador do sistema.
        </p>

        <Link
          to="/"
          className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar à página inicial
        </Link>
      </div>
    </div>
  );
}
