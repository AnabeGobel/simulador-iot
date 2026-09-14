import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Cloud,
  ShieldCheck,
  Users,
  Zap,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IoT Energia Caálá — Monitoramento Inteligente de Energia" },
      {
        name: "description",
        content:
          "Sistema de monitoramento em tempo real de infraestruturas elétricas com sensores IoT, deteção de anomalias e alertas inteligentes.",
      },
    ],
  }),
  component: Landing,
});

const cards = [
  {
    icon: Activity,
    color: "bg-[#10b981] text-white",
    titulo: "Monitoramento em Tempo Real",
    texto: "Acompanhe tensão, corrente, temperatura e outros parâmetros em tempo real.",
  },
  {
    icon: ShieldCheck,
    color: "bg-[#6366f1] text-white",
    titulo: "Detecção de Anomalias",
    texto: "Identificação inteligente de situações anormais e geração de alertas.",
  },
  {
    icon: BarChart3,
    color: "bg-[#f59e0b] text-white",
    titulo: "Relatórios e Análises",
    texto: "Gere relatórios detalhados e analise o histórico dos dados da sua infraestrutura.",
  },
  {
    icon: Users,
    color: "bg-[#3b82f6] text-white",
    titulo: "Gestão de Usuários",
    texto: "Controle de acesso por perfis e permissões de forma simples e segura.",
  },
];

function Landing() {
  return (
    // Removido w-screen e ajustado o background base da aplicação
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#071328] text-white font-sans flex flex-col justify-between">
      
      {/* Container da Imagem de Fundo em Camada Fixa e Absoluta */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('/bg-hero.jpg')`,
          }}
        />
        {/* Overlays de gradiente para suavizar e sincronizar com o tom escuro #071328 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071328] via-[#071328]/85 to-[#071328]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071328] via-transparent to-[#071328]/60" />
      </div>

      {/* Conteúdo Principal (por cima da camada de fundo com z-10) */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 py-8 md:px-12">
        
        {/* Cabeçalho / Logo */}
        <header className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#10b981] text-white shadow-lg shadow-[#10b981]/20">
            <Zap className="h-7 w-7 fill-current" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-white">IoT Energia</p>
            <p className="text-xs font-bold tracking-widest text-[#10b981]">CAALÁ</p>
          </div>
        </header>

        {/* Hero Section */}
        <main className="my-auto max-w-2xl py-10">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-white">
            Bem-vindo ao <br />
            Sistema de Monitoramento <br />
            Inteligente de{" "}
            <span className="text-[#10b981]">Energia</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Monitoramento em tempo real de infraestruturas elétricas com sensores IoT, análise de dados e alertas inteligentes para uma rede mais segura e eficiente.
          </p>

          {/* Grid de Cards (2x2) */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {cards.map((c) => (
              <div
                key={c.titulo}
                className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-md transition-all hover:bg-slate-900/70 hover:border-white/20"
              >
                <div className={`grid h-10 w-10 place-items-center rounded-full ${c.color}`}>
                  <c.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-bold text-white text-base">{c.titulo}</h2>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{c.texto}</p>
              </div>
            ))}
          </div>

          {/* Destaques (Seguro, Confiável, Inteligente) */}
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-6">
            {[
              { icon: ShieldCheck, t: "Seguro", s: "Seus dados protegidos" },
              { icon: Cloud, t: "Confiável", s: "Sistema estável 24/7" },
              { icon: Zap, t: "Inteligente", s: "Decisões baseadas em dados" },
            ].map((f) => (
              <div key={f.t} className="flex items-center gap-2">
                <f.icon className="h-5 w-5 shrink-0 text-[#10b981]" />
                <div>
                  <p className="text-xs font-bold text-white">{f.t}</p>
                  <p className="text-[10px] text-slate-400 hidden sm:block">{f.s}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Botão de Ação */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="w-full max-w-xs bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-xl h-12 shadow-lg shadow-[#10b981]/25 text-base"
            >
              <Link to="/login">
                Acessar Sistema <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

              <Link
      to="/sobre"
      className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mt-2"
    >
      <span>Saiba mais sobre o sistema</span>
      <ArrowRight className="h-3.5 w-3.5 text-[#10b981]" />
    </Link>
          </div>
        </main>

        {/* Footer / Espaçador inferior */}
        <footer className="py-4 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} IoT Energia Caálá. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}