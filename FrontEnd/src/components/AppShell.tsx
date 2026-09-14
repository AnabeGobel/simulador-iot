import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Gauge,
  Home,
  LineChart,
  LogOut,
  Menu,
  Moon,
  Radio,
  Settings,
  Sun,
  Thermometer,
  User,
  Users,
  Zap,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useAuth, rotulosPerfil, type Recurso } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ItemMenu {
  to: string;
  label: string;
  icon: typeof Home;
  recurso: Recurso;
}

const menu: ItemMenu[] = [

  { to: "/app", label: "Dashboard", icon: Home, recurso: "dashboard" },
  { to: "/app/monitoramento", label: "Monitoramento", icon: Gauge, recurso: "monitoramento" },
  { to: "/app/estacoes", label: "Estações IoT", icon: Radio, recurso: "estacoes" },
  { to: "/app/sensores", label: "Sensores", icon: Thermometer, recurso: "sensores" },
  { to: "/app/anomalias", label: "Anomalias", icon: AlertTriangle, recurso: "anomalias" },
  { to: "/app/alertas", label: "Alertas", icon: Bell, recurso: "alertas" },
  { to: "/relatorios", label: "Relatórios", icon: FileText, recurso: "relatorios" },
  { to: "/app/utilizadores", label: "Utilizadores", icon: Users, recurso: "utilizadores" },
  { to: "/app/configuracoes", label: "Configurações", icon: Settings, recurso: "configuracoes" },

];

const CHAVE_COLAPSADO = "@iot_caala:sidebar_colapsado";

function obterIniciais(nome: string) {
  const nomeNormalizado = String(nome ?? "").trim().replace(/\s+/g, " ");
  if (!nomeNormalizado) return "U";

  const primeiraLetra = nomeNormalizado.charAt(0) || "U";
  const ultimoEspaco = nomeNormalizado.lastIndexOf(" ");
  if (ultimoEspaco < 0) return nomeNormalizado.slice(0, 2).toUpperCase();

  const ultimaLetra = nomeNormalizado.charAt(ultimoEspaco + 1) || "U";
  return `${primeiraLetra}${ultimaLetra}`.toUpperCase();
}

export function AppShell({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao?: string;
  children: ReactNode;
}) {
  const { sessao, carregado, sair, pode } = useAuth();
  const { tema, alternar } = useTheme();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [colapsado, setColapsado] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (carregado && !sessao) navigate({ to: "/login", replace: true });
  }, [carregado, sessao, navigate]);

  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  useEffect(() => {
    const guardado = localStorage.getItem(CHAVE_COLAPSADO);
    if (guardado === "1") setColapsado(true);
  }, []);

  const alternarColapso = () => {
    setColapsado((v) => {
      const novo = !v;
      localStorage.setItem(CHAVE_COLAPSADO, novo ? "1" : "0");
      return novo;
    });
  };

  if (!carregado || !sessao) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">A carregar sessão…</p>
      </div>
    );
  }

  const itens = menu.filter((m) => pode(m.recurso));
  const iniciais = obterIniciais(sessao.nome || sessao.email);

  const perfilUsuario = (mostrarDados: boolean) => (
    <div
      className={cn(
        "border-t border-sidebar-border p-3",
        !mostrarDados && "flex justify-center px-2"
      )}
    >
      <div className={cn("flex items-center gap-3", !mostrarDados && "justify-center")}>
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            {iniciais}
          </AvatarFallback>
        </Avatar>
        {mostrarDados && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">{sessao.nome}</p>
            <p className="truncate text-xs text-sidebar-foreground/70">{sessao.email}</p>
          </div>
        )}
      </div>
    </div>
  );

  const nav = (forcarLabel = false) => (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
      {itens.map((item) => {
        const ativo = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
        const mostrarLabel = forcarLabel || !colapsado;
        return (
          <Link
            key={item.to}
            to={item.to}
            title={!mostrarLabel ? item.label : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              !mostrarLabel && "justify-center px-0",
              ativo
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {mostrarLabel && <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
      <Link
        to="/app/perfil"
        title={!(forcarLabel || !colapsado) ? "Meu Perfil" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          !(forcarLabel || !colapsado) && "justify-center px-0",
          pathname === "/app/perfil"
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <User className="h-4 w-4 shrink-0" />
        {(forcarLabel || !colapsado) && <span className="truncate">Meu Perfil</span>}
      </Link>
      <button
        onClick={() => {
          sair();
        }}
        title={!(forcarLabel || !colapsado) ? "Terminar sessão" : undefined}
        className={cn(
          "mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          !(forcarLabel || !colapsado) && "justify-center px-0"
        )}
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {(forcarLabel || !colapsado) && "Terminar sessão"}
      </button>
    </nav>
  );

  // Sem linha divisória inferior (border-b removida)
  const marca = (mostrarLabel = true) => (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-4",
        !mostrarLabel && "justify-center px-2"
      )}
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
        <Zap className="h-5 w-5" />
      </div>
      {mostrarLabel && (
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-sidebar-foreground">IoT Energia</p>
          <p className="truncate text-xs text-primary">CAALÁ</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Fixa no Desktop com borda lateral continua */}
      <aside
        className={cn(
          "relative hidden shrink-0 flex-col bg-sidebar border-r border-sidebar-border transition-[width] duration-200 lg:flex",
          colapsado ? "w-16" : "w-64"
        )}
      >
        {marca(!colapsado)}
        {nav()}
        {perfilUsuario(!colapsado)}

        {/* Botão de colapsar/expandir — reposicionado mais abaixo e com maior destaque visual */}
      <button
        onClick={alternarColapso}
        aria-label={colapsado ? "Expandir menu" : "Colapsar menu"}
        className="absolute -right-3.5 top-20 z-20 grid h-7 w-7 place-items-center rounded-full border border-border bg-card text-primary shadow-md transition-transform hover:scale-110 hover:bg-accent"
      >
        {colapsado ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
      </aside>

      {/* Drawer Mobile */}
      {aberto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setAberto(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-sidebar">
            <div className="flex items-center justify-between">
              <div className="flex-1">{marca(true)}</div>
            </div>
            <button
              onClick={() => setAberto(false)}
              className="absolute right-3 top-4 text-sidebar-foreground/70"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
            {nav(true)}
            {perfilUsuario(true)}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            {/* O botão de 3 linhas só aparece no mobile (lg:hidden) */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setAberto(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold sm:text-lg">{titulo}</h1>
              {descricao && (
                <p className="truncate text-xs text-muted-foreground">{descricao}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="icon" onClick={alternar} aria-label="Alternar tema">
              {tema === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="hidden items-center gap-2 rounded-lg border border-border px-3 py-1.5 sm:flex">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-xs font-semibold">{rotulosPerfil[sessao.perfil]}</p>
                <p className="truncate text-[11px] text-primary">Online</p>
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>

        <footer className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
          <BarChart3 className="mr-1 inline h-3 w-3" /> Sistema de Monitoramento Inteligente de
          Energia — Caála
        </footer>
      </div>
    </div>
  );
}