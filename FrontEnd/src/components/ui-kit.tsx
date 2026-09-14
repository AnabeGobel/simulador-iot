import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Severidade, EstadoEstacao } from "@/lib/mock-data";

export function StatCard({
  titulo,
  valor,
  legenda,
  icone,
  cor = "primary",
}: {
  titulo: string;
  valor: ReactNode;
  legenda?: string;
  icone: ReactNode;
  cor?: "primary" | "info" | "warning" | "destructive";
}) {
  const cores = {
    primary: "bg-primary/12 text-primary",
    info: "bg-info/12 text-info",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/12 text-destructive",
  } as const;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {titulo}
          </p>
          <p className="mt-1 text-2xl font-bold sm:text-3xl">{valor}</p>
          {legenda && <p className="mt-1 truncate text-xs text-muted-foreground">{legenda}</p>}
        </div>
        <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", cores[cor])}>
          {icone}
        </div>
      </div>
    </div>
  );
}

export function Painel({
  titulo,
  acao,
  children,
  className,
}: {
  titulo: string;
  acao?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-border bg-card p-4 shadow-sm", className)}>
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="truncate text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {titulo}
        </h2>
        {acao}
      </div>
      {children}
    </section>
  );
}

export function SeveridadeBadge({ nivel }: { nivel: Severidade }) {
  const estilos: Record<Severidade, string> = {
    NORMAL: "bg-success/15 text-success",
    ATENCAO: "bg-warning/20 text-warning",
    CRITICO: "bg-destructive/15 text-destructive",
  };
  const rotulos: Record<Severidade, string> = {
    NORMAL: "Normal",
    ATENCAO: "Atenção",
    CRITICO: "Crítico",
  };
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", estilos[nivel])}>
      {rotulos[nivel]}
    </span>
  );
}

export function EstadoBadge({ estado }: { estado: EstadoEstacao }) {
  const estilos: Record<EstadoEstacao, string> = {
    online: "bg-success/15 text-success",
    atencao: "bg-warning/20 text-warning",
    offline: "bg-destructive/15 text-destructive",
  };
  const rotulos: Record<EstadoEstacao, string> = {
    online: "Online",
    atencao: "Atenção",
    offline: "Offline",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        estilos[estado],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {rotulos[estado]}
    </span>
  );
}

export function SomenteLeitura() {
  return (
    <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
      👁️ Somente consulta
    </span>
  );
}
