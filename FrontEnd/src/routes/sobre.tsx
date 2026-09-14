import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Zap,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Radio,
  Server,
  Activity,
  BarChart3,
  Users,
  CheckCircle2,
  Thermometer,
  Gauge,
  ZapOff,
  LineChart,
  RotateCw,
  Compass,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Plataforma — SIMIE-Caála" },
      {
        name: "description",
        content:
          "Saiba mais sobre o SIMIE-Caála, um sistema inteligente para monitoramento contínuo e análise das infraestruturas elétricas no município da Caála.",
      },
    ],
  }),
  component: SobrePlataforma,
});

const indicadores = [
  {
    icon: Thermometer,
    titulo: "Temperatura",
    objetivo: "Acompanhar alterações térmicas nas estações e prevenir sobreaquecimentos.",
    cor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Gauge,
    titulo: "Tensão",
    objetivo: "Monitorar variações e oscilações no nível de tensão da rede elétrica.",
    cor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Zap,
    titulo: "Corrente",
    objetivo: "Acompanhar o comportamento da corrente e identificar picos imprevistos.",
    cor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: BarChart3,
    titulo: "Consumo",
    objetivo: "Analisar o consumo energético acumulado e padrões de utilização.",
    cor: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: RotateCw,
    titulo: "Vibração",
    objetivo: "Identificar vibrações anormais resultantes de desgastes ou alterações físicas.",
    cor: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Compass,
    titulo: "Inclinação",
    objetivo: "Identificar alterações na inclinação estrutural dos postes e suportes.",
    cor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
];

const funcionalidades = [
  "Monitoramento em tempo real",
  "Gestão de estações IoT",
  "Gestão de sensores",
  "Detecção de anomalias",
  "Alertas automáticos",
  "Histórico de medições",
  "Dashboards interativos",
  "Relatórios técnicos",
  "Gestão de utilizadores",
];

const beneficios = [
  "Centralização das informações de todas as estações de monitoramento",
  "Acompanhamento contínuo e preventivo das condições operacionais",
  "Identificação rápida de situações anormais e pontos de falha",
  "Apoio fundamentado à tomada de decisões por parte das equipas técnicas",
  "Histórico estruturado das medições para auditoria e análises futuras",
  "Maior organização dos processos de manutenção preventiva e corretiva",
];

function SobrePlataforma() {
  return (
    <div className="min-h-screen w-full bg-[#071328] text-white font-sans selection:bg-[#10b981] selection:text-white">
      {/* Camada de Fundo Gradiente */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#071328] to-[#030914]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-12">
        {/* Navegação Superior */}
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#10b981] text-white shadow-lg shadow-[#10b981]/20">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-white">IoT Energia</p>
              <p className="text-[10px] font-bold tracking-widest text-[#10b981]">CAÁLA</p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-white/10 bg-slate-900/50 text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Início
            </Link>
          </Button>
        </header>

        {/* Hero Banner / Apresentação */}
        <section className="py-12 md:py-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-xs font-semibold text-[#10b981] mb-6">
            <ShieldCheck className="h-4 w-4" /> Sobre o SIMIE-Caála
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl leading-tight text-white">
            Monitoramento Inteligente de Infraestruturas Elétricas
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed">
            O <strong className="text-white">SIMIE-Caála</strong> é uma plataforma inteligente desenvolvida para apoiar o monitoramento das infraestruturas elétricas no município da Caála. O sistema permite acompanhar dados provenientes das estações de monitoramento, identificar situações anormais e disponibilizar informações cruciais para apoiar a tomada de decisões técnicas.
          </p>
        </section>

        {/* Objetivo */}
        <section className="my-8 rounded-2xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Nosso Objetivo</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              O principal objetivo da plataforma é melhorar o acompanhamento das infraestruturas elétricas através da recolha e análise de dados em tempo real, permitindo identificar alterações nas condições de funcionamento e apoiar uma atuação mais rápida das equipas responsáveis pela manutenção.
            </p>
          </div>
        </section>

        {/* Como Funciona — Ilustração do Fluxo */}
        <section id="como-funciona" className="py-12 border-t border-white/10">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Como Funciona o Fluxo de Dados</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Desde a recolha física no terreno até ao painel analítico técnico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative">
            {/* Passo 1 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/20 text-amber-400 mb-3">
                <Cpu className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-400">PASSO 1</p>
              <h3 className="font-bold text-white text-sm mt-1">Sensores & IoT</h3>
              <p className="text-[11px] text-slate-300 mt-1">Recolha física de temperatura, corrente e vibração no local.</p>
            </div>

            {/* Passo 2 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-500/20 text-blue-400 mb-3">
                <Radio className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-400">PASSO 2</p>
              <h3 className="font-bold text-white text-sm mt-1">Estação ESP32</h3>
              <p className="text-[11px] text-slate-300 mt-1">Processamento local dos sinais das infraestruturas.</p>
            </div>

            {/* Passo 3 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-purple-500/20 text-purple-400 mb-3">
                <Server className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-400">PASSO 3</p>
              <h3 className="font-bold text-white text-sm mt-1">MQTT Broker</h3>
              <p className="text-[11px] text-slate-300 mt-1">Transmissão rápida e segura via mensagens em tempo real.</p>
            </div>

            {/* Passo 4 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/10 bg-slate-900/60">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-3">
                <Activity className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-400">PASSO 4</p>
              <h3 className="font-bold text-white text-sm mt-1">Plataforma API</h3>
              <p className="text-[11px] text-slate-300 mt-1">Armazenamento e cruzamento de limites de operação.</p>
            </div>

            {/* Passo 5 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-[#10b981]/30 bg-[#10b981]/10">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#10b981] text-white mb-3">
                <LineChart className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-[#10b981]">PASSO 5</p>
              <h3 className="font-bold text-white text-sm mt-1">Dashboard</h3>
              <p className="text-[11px] text-slate-200 mt-1">Apresentação gráfica, anomalias e relatórios técnicos.</p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            As estações de monitoramento recolhem informações como temperatura, tensão, corrente, consumo energético, vibração e inclinação. Os dados são transmitidos para a plataforma, onde são armazenados e analisados para apresentação em dashboards, identificação de anomalias e geração de alertas.
          </p>
        </section>

        {/* O que a plataforma monitora */}
        <section className="py-12 border-t border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">O que a Plataforma Monitora</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Parâmetros e grandezas elétricas e físicas acompanhadas continuamente
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {indicadores.map((ind) => (
              <div
                key={ind.titulo}
                className="rounded-xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-sm transition-all hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg border ${ind.cor}`}>
                    <ind.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{ind.titulo}</h3>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">{ind.objetivo}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Nota Técnica:</strong> A vibração e a inclinação são particularmente importantes no SIMIE-Caála porque auxiliam na sinalização preventiva de instabilidade mecânica ou possíveis danos estruturais nos postes e infraestruturas.
          </div>
        </section>

        {/* Funcionalidades & Benefícios */}
        <section className="py-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Funcionalidades */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#10b981]" /> Principais Funcionalidades
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {funcionalidades.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/40 p-3 text-slate-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" /> Benefícios para a Gestão
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              {beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 rounded-lg border border-white/5 bg-slate-900/20 p-2.5">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Perfis de Utilizadores */}
        <section className="py-12 border-t border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Para Quem é a Plataforma?</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">Perfis e papeis operacionais no sistema</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-white/10 bg-slate-900/50 text-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-[#10b981]">
                  <Users className="h-5 w-5" /> Administrador
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-300 leading-relaxed">
                Responsável pela gestão global do sistema, incluindo o cadastramento e controlo de acesso de utilizadores, configuração de estações IoT, parametrização de limites de sensores e gestão operacional das regras do sistema.
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-slate-900/50 text-white backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-blue-400">
                  <Activity className="h-5 w-5" /> Técnico Operador
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-300 leading-relaxed">
                Responsável pelo acompanhamento contínuo das estações no terreno, análise das medições em tempo real, consulta do histórico de anomalias, tratamento de alertas e emissão de relatórios técnicos de suporte às manutenções.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contexto Regional e Sobre o Projeto Académico */}
        <section className="py-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="h-6 w-6 text-[#10b981]" />
              <h3 className="font-bold text-white text-base">Aplicação no Município da Caála</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A solução foi concebida considerando o contexto da gestão das infraestruturas elétricas do município da Caála. A plataforma permite estruturar o monitoramento de diferentes pontos através de estações IoT, possibilitando a centralização das informações e o acompanhamento preventivo das condições das infraestruturas.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="h-6 w-6 text-purple-400" />
              <h3 className="font-bold text-white text-base">Sobre o Projeto Académico</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              O SIMIE-Caála foi desenvolvido no âmbito de um projeto académico no curso de Engenharia / Ciências da Computação, focado na aplicação prática de tecnologias de Internet das Coisas (IoT), comunicação em tempo real e análise de dados para o apoio ao setor elétrico.
            </p>
          </div>
        </section>

        {/* Chamada para Ação Final */}
        <section className="mt-8 rounded-2xl bg-gradient-to-r from-[#10b981]/20 via-slate-900 to-indigo-900/20 border border-[#10b981]/30 p-8 text-center">
          <h3 className="text-xl font-bold text-white">Pronto para aceder ao sistema?</h3>
          <p className="text-xs text-slate-300 mt-1 mb-6">
            Aceda à plataforma com as suas credenciais para visualizar o estado atual da rede.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-xl shadow-lg shadow-[#10b981]/20"
          >
            <Link to="/login">
              Acessar Plataforma <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>

        {/* Rodapé */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} SIMIE-Caála — Sistema Inteligente de Monitoramento de Infraestruturas Elétricas. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}