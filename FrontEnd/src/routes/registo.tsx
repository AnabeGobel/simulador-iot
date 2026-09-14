import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Mail, User, UserPlus, Zap } from "lucide-react";
import { useAuth, type Perfil } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/registo")({
  head: () => ({
    meta: [
      { title: "Registo — IoT Energia Caálá" },
      { name: "description", content: "Crie a sua conta de acesso ao sistema IoT Energia Caálá." },
      { property: "og:title", content: "Registo — IoT Energia Caálá" },
      { property: "og:description", content: "Preencha os dados para criar a sua conta de acesso." },
    ],
  }),
  component: RegistoPage,
});

export function RegistoPage() {
  const { registar, entrar } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [perfil, setPerfil] = useState<Perfil>("operador");
  const [aceite, setAceite] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
        <aside className="hidden flex-col justify-center gap-4 border-r border-border bg-muted/40 p-10 md:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">IoT Energia</p>
              <p className="text-xs text-primary">CAALÁ</p>
            </div>
          </div>
          <h2 className="mt-8 text-2xl font-bold">Crie a sua conta</h2>
          <p className="text-sm text-muted-foreground">
            Preencha os dados ao lado para criar a sua conta de acesso ao sistema.
          </p>
        </aside>

        <div className="p-6 sm:p-10">
          <h1 className="text-2xl font-bold">Registo</h1>
          <p className="text-sm text-muted-foreground">Crie a sua conta para começar</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (senha !== confirmar) return setErro("As palavras-passe não coincidem.");
              if (!aceite) return setErro("Deve aceitar os termos de uso.");
              registar(nome, email, perfil);
              entrar(email, senha);
              navigate({ to: "/app" });
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="nome">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="nome"
                    required
                    className="pl-9"
                    placeholder="O seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
              </div>
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
                    type="password"
                    required
                    className="pl-9"
                    placeholder="Crie uma palavra-passe"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmar">Confirmar palavra-passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmar"
                    type="password"
                    required
                    className="pl-9"
                    placeholder="Confirme a palavra-passe"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Perfil</Label>
              <Select value={perfil} onValueChange={(v) => setPerfil(v as Perfil)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o seu perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="tecnico">Técnico</SelectItem>
                  <SelectItem value="operador">Operador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={aceite}
                onCheckedChange={(v) => setAceite(v === true)}
                className="mt-0.5"
              />
              <span>
                Concordo com os <span className="text-primary">Termos de Uso</span> e a{" "}
                <span className="text-primary">Política de Privacidade</span>
              </span>
            </label>

            {erro && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {erro}
              </p>
            )}

            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Criar Conta
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-primary">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
