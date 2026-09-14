import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { AppShell } from '@/components/AppShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, Printer, CheckSquare, Square, Filter, BarChart3, Loader2, AlertCircle } from 'lucide-react'
import { obterEstacoes, obterDadosRelatorio } from '@/services/api'

export const Route = createFileRoute('/relatorios')({
  component: RelatoriosComponent,
})

interface ParametrosSelecao {
  temperatura: boolean
  tensao: boolean
  corrente: boolean
  consumo: boolean
  vibracao: boolean
  inclinacao: boolean
  anomalias: boolean
  alertas: boolean
}

interface EstacaoItem {
  id: string
  codigo: string
  nome?: string
}

interface DadosRelatorioBackend {
  emissor?: {
    nome: string
    contato: string
  }
  estacaoInfo?: {
    codigo: string
    dispositivo: string
    localizacao: string
    status: string
  }
  resumo: {
    totalMedicoes: number
    tempMedia?: number
    tempMax?: number
    tempMin?: number
    tensaoMedia?: number
    tensaoMin?: number
    tensaoMax?: number
    correnteMedia?: number
    correnteMin?: number
    correnteMax?: number
    consumoTotal?: number
    vibracaoMax?: number
    inclinacaoMax?: number
    totalAnomalias: number
    totalAlertas: number
  }
  anomalias: Array<{
    id: string
    dataHora: string
    estacao: string
    parametro: string
    valor: string | number
    limite: string | number
    situacao: string
  }>
  alertas: Array<{
    id: string
    data: string
    estacao: string
    tipo: string
    gravidade: string
    estado: string
  }>
  conclusao?: string
}

function RelatoriosComponent() {
  // Lista dinâmica de estações
  const [estacoesLista, setEstacoesLista] = useState<EstacaoItem[]>([])
  const [loadingEstacoes, setLoadingEstacoes] = useState(true)

  // Estados dos Filtros
  const [estacao, setEstacao] = useState('TODAS')
  const [dataInicio, setDataInicio] = useState('2026-08-01')
  const [dataFim, setDataFim] = useState('2026-08-31')
  const [formato, setFormato] = useState<'pdf' | 'csv'>('pdf')

  // Estados de Operação da API
  const [loadingGerar, setLoadingGerar] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [dadosReais, setDadosReais] = useState<DadosRelatorioBackend | null>(null)

  // Dados do Utilizador Logado
  const [usuarioLogado, setUsuarioLogado] = useState('Artur Devo Catimba')

  const [parametros, setParametros] = useState<ParametrosSelecao>({
    temperatura: true,
    tensao: true,
    corrente: true,
    consumo: true,
    vibracao: true,
    inclinacao: true,
    anomalias: true,
    alertas: true,
  })

  // Carrega a lista de estações e o utilizador logado na montagem
  useEffect(() => {
    async function carregarDadosIniciais() {
      try {
        setLoadingEstacoes(true)
        const lista = await obterEstacoes()
        setEstacoesLista(lista)
      } catch (err) {
        console.error('Erro ao carregar lista de estações:', err)
      } finally {
        setLoadingEstacoes(false)
      }

      // Recupera o nome do utilizador do localStorage se existir
      const usuarioSalvo = localStorage.getItem('@iot_caala:usuario')
      if (usuarioSalvo) {
        try {
          const parsed = JSON.parse(usuarioSalvo)
          if (parsed?.nome) setUsuarioLogado(parsed.nome)
        } catch {
          // Mantém o valor padrão caso ocorra erro no parse
        }
      }
    }

    carregarDadosIniciais()
  }, [])

  const toggleParametro = (key: keyof ParametrosSelecao) => {
    setParametros((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleGerar = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingGerar(true)
    setErro(null)

    try {
      const resposta = await obterDadosRelatorio({
        estacao,
        dataInicio,
        dataFim,
      })
      setDadosReais(resposta)
    } catch (err: any) {
      console.error('Erro ao gerar relatório:', err)
      setErro(err?.response?.data?.message || 'Falha ao buscar os dados do relatório na API.')
    } finally {
      setLoadingGerar(false)
    }
  }

  const handleImprimir = () => {
    window.print()
  }

  return (
    <AppShell
      titulo="Relatórios Técnicos"
      descricao="Geração de relatórios analíticos e de desempenho da rede SIMIE-CAÁLA"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Painel Lateral de Configuração (Oculto na impressão) */}
        <div className="print:hidden lg:col-span-5 border-border">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Filter className="h-4 w-4 text-primary" />
                Configurar Relatório
              </CardTitle>
              <CardDescription>
                Selecione os parâmetros e o período desejado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGerar} className="space-y-4">
                {/* Seleção da Estação */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Estação
                  </label>
                  <select
                    value={estacao}
                    onChange={(e) => setEstacao(e.target.value)}
                    disabled={loadingEstacoes}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="TODAS">Todas as Estações</option>
                    {estacoesLista.map((est) => (
                      <option key={est.id || est.codigo} value={est.codigo}>
                        {est.nome ? `${est.codigo} - ${est.nome}` : est.codigo}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Período */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground">
                      Data Final
                    </label>
                    <input
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Parâmetros a incluir */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-foreground">
                    Dados a incluir
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(Object.keys(parametros) as (keyof ParametrosSelecao)[]).map((key) => (
                      <button
                        type="button"
                        key={key}
                        onClick={() => toggleParametro(key)}
                        className="flex items-center gap-2 rounded border border-border p-2 text-left hover:bg-accent"
                      >
                        {parametros[key] ? (
                          <CheckSquare className="h-4 w-4 text-primary shrink-0" />
                        ) : (
                          <Square className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <span className="capitalize">{key}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formato */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Formato de Exportação
                  </label>
                  <select
                    value={formato}
                    onChange={(e) => setFormato(e.target.value as 'pdf' | 'csv')}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pdf">Documento PDF Técnico</option>
                    <option value="csv">Planilha CSV (Dados Brutos)</option>
                  </select>
                </div>

                {erro && (
                  <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-xs text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{erro}</span>
                  </div>
                )}

                <Button type="submit" disabled={loadingGerar} className="w-full gap-2">
                  {loadingGerar ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Consultando Banco de Dados...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Gerar Relatório
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Exibição do Relatório Técnico */}
        <div className="lg:col-span-7 print:col-span-12 print:w-full">
          {!dadosReais && !loadingGerar && (
            <Card className="flex flex-col items-center justify-center p-12 text-center print:hidden">
              <BarChart3 className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="font-semibold text-lg">Nenhum relatório gerado</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                Selecione os parâmetros no painel lateral e clique em "Gerar Relatório" para visualizar a análise técnica.
              </p>
            </Card>
          )}

          {loadingGerar && (
            <Card className="flex flex-col items-center justify-center p-12 text-center print:hidden">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
              <h3 className="font-semibold text-base">Processando dados telemetricos...</h3>
              <p className="text-xs text-muted-foreground mt-1">
                A agregar leituras, anomalias e alertas para o período selecionado.
              </p>
            </Card>
          )}

          {dadosReais && !loadingGerar && (
            <div className="space-y-4">
              <div className="flex items-center justify-between print:hidden">
                <span className="text-xs text-muted-foreground">Pré-visualização do Relatório</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleImprimir} className="gap-1.5">
                    <Printer className="h-3.5 w-3.5" />
                    Imprimir / Salvar PDF
                  </Button>
                </div>
              </div>

              {/* Folha do Relatório */}
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm print:border-none print:shadow-none print:p-0 print:m-0 print:bg-white print:text-black">
                {/* Header Exclusivo do Documento */}
                <div className="border-b border-border pb-4 mb-6">
                  <p className="text-[10px] font-bold tracking-widest text-primary uppercase print:text-black">
                    SISTEMA INTELIGENTE DE MONITORAMENTO DE INFRAESTRUTURAS ELÉTRICAS — SIMIE-CAÁLA
                  </p>
                  <h2 className="text-xl font-bold text-foreground print:text-black mt-1">RELATÓRIO TÉCNICO DE MONITORAMENTO</h2>
                  
                  {/* Dados do Emissor do Documento */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground print:text-black">
                    <div>
                      <span className="font-semibold text-foreground print:text-black">Gerado Por:</span> {dadosReais.emissor?.nome || usuarioLogado}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground print:text-black">Contato:</span> {dadosReais.emissor?.contato || '(+244) 923 000 000'}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground print:text-black">Período:</span> {dataInicio} — {dataFim}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground print:text-black">Data de Emissão:</span> {new Date().toLocaleDateString('pt-PT')}
                    </div>
                  </div>
                </div>

                {/* Informações da Estação */}
                <div className="mb-6 rounded-md bg-accent/40 print:bg-gray-100 p-3 text-xs">
                  <h4 className="font-semibold text-foreground print:text-black mb-1">Informações da Estação</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p><span className="text-muted-foreground print:text-gray-700">Estação:</span> {estacao}</p>
                    <p><span className="text-muted-foreground print:text-gray-700">Dispositivo:</span> {dadosReais.estacaoInfo?.dispositivo || 'ESP32-WOKWI-02'}</p>
                    <p><span className="text-muted-foreground print:text-gray-700">Localização:</span> {dadosReais.estacaoInfo?.localizacao || 'Subestação Caála Principal'}</p>
                    <p><span className="text-muted-foreground print:text-gray-700">Status no Período:</span> {dadosReais.estacaoInfo?.status || 'Ativo / Em Monitoramento'}</p>
                  </div>
                </div>

                {/* Resumo do Período */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground print:text-black mb-2">3. Resumo do Período</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-border bg-accent/50 print:bg-gray-200 text-muted-foreground print:text-black">
                        <tr>
                          <th className="p-2 font-medium">Indicador</th>
                          <th className="p-2 font-medium">Resultado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border print:divide-gray-300">
                        <tr>
                          <td className="p-2">Total de medições</td>
                          <td className="p-2 font-semibold">{dadosReais.resumo?.totalMedicoes?.toLocaleString('pt-PT') ?? 0}</td>
                        </tr>
                        {parametros.temperatura && (
                          <>
                            <tr>
                              <td className="p-2">Temperatura média</td>
                              <td className="p-2 font-semibold">{dadosReais.resumo?.tempMedia ?? 'N/A'} °C</td>
                            </tr>
                            <tr>
                              <td className="p-2">Temperatura máxima</td>
                              <td className="p-2 font-semibold text-red-500 print:text-black">{dadosReais.resumo?.tempMax ?? 'N/A'} °C</td>
                            </tr>
                          </>
                        )}
                        {parametros.tensao && (
                          <tr>
                            <td className="p-2">Tensão média</td>
                            <td className="p-2 font-semibold">{dadosReais.resumo?.tensaoMedia ?? 'N/A'} V</td>
                          </tr>
                        )}
                        {parametros.corrente && (
                          <tr>
                            <td className="p-2">Corrente média</td>
                            <td className="p-2 font-semibold">{dadosReais.resumo?.correnteMedia ?? 'N/A'} A</td>
                          </tr>
                        )}
                        {parametros.consumo && (
                          <tr>
                            <td className="p-2">Consumo total</td>
                            <td className="p-2 font-semibold">{dadosReais.resumo?.consumoTotal ?? 'N/A'} kWh</td>
                          </tr>
                        )}
                        {parametros.vibracao && (
                          <tr>
                            <td className="p-2">Vibração máxima</td>
                            <td className="p-2 font-semibold">{dadosReais.resumo?.vibracaoMax ?? 'N/A'} g</td>
                          </tr>
                        )}
                        {parametros.inclinacao && (
                          <tr>
                            <td className="p-2">Inclinação máxima</td>
                            <td className="p-2 font-semibold">{dadosReais.resumo?.inclinacaoMax ?? 'N/A'}°</td>
                          </tr>
                        )}
                        {parametros.anomalias && (
                          <tr>
                            <td className="p-2">Anomalias detectadas</td>
                            <td className="p-2 font-semibold text-red-500 print:text-black">{dadosReais.resumo?.totalAnomalias ?? 0}</td>
                          </tr>
                        )}
                        {parametros.alertas && (
                          <tr>
                            <td className="p-2">Alertas gerados</td>
                            <td className="p-2 font-semibold text-red-500 print:text-black">{dadosReais.resumo?.totalAlertas ?? 0}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Extrato de Medições Selecionadas */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground print:text-black mb-2">4. Extrato de Medições Selecionadas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs print:grid-cols-3">
                    {parametros.temperatura && (
                      <div className="p-2 border border-border print:border-gray-300 rounded">
                        <p className="font-semibold text-primary print:text-black">Temperatura</p>
                        <p className="text-muted-foreground print:text-gray-700 mt-1">├── Mínima: {dadosReais.resumo?.tempMin ?? 'N/A'} °C</p>
                        <p className="text-muted-foreground print:text-gray-700">├── Média: {dadosReais.resumo?.tempMedia ?? 'N/A'} °C</p>
                        <p className="text-muted-foreground print:text-gray-700">└── Máxima: {dadosReais.resumo?.tempMax ?? 'N/A'} °C</p>
                      </div>
                    )}
                    {parametros.tensao && (
                      <div className="p-2 border border-border print:border-gray-300 rounded">
                        <p className="font-semibold text-primary print:text-black">Tensão</p>
                        <p className="text-muted-foreground print:text-gray-700 mt-1">├── Mínima: {dadosReais.resumo?.tensaoMin ?? 'N/A'} V</p>
                        <p className="text-muted-foreground print:text-gray-700">├── Média: {dadosReais.resumo?.tensaoMedia ?? 'N/A'} V</p>
                        <p className="text-muted-foreground print:text-gray-700">└── Máxima: {dadosReais.resumo?.tensaoMax ?? 'N/A'} V</p>
                      </div>
                    )}
                    {parametros.corrente && (
                      <div className="p-2 border border-border print:border-gray-300 rounded">
                        <p className="font-semibold text-primary print:text-black">Corrente</p>
                        <p className="text-muted-foreground print:text-gray-700 mt-1">├── Mínima: {dadosReais.resumo?.correnteMin ?? 'N/A'} A</p>
                        <p className="text-muted-foreground print:text-gray-700">├── Média: {dadosReais.resumo?.correnteMedia ?? 'N/A'} A</p>
                        <p className="text-muted-foreground print:text-gray-700">└── Máxima: {dadosReais.resumo?.correnteMax ?? 'N/A'} A</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Anomalias Detectadas */}
                {parametros.anomalias && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground print:text-black mb-2">5. Anomalias Detectadas</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-border bg-accent/50 print:bg-gray-200 text-muted-foreground print:text-black">
                          <tr>
                            <th className="p-2">Data/Hora</th>
                            <th className="p-2">Estação</th>
                            <th className="p-2">Parâmetro</th>
                            <th className="p-2">Valor</th>
                            <th className="p-2">Limite</th>
                            <th className="p-2">Situação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border print:divide-gray-300">
                          {dadosReais.anomalias && dadosReais.anomalias.length > 0 ? (
                            dadosReais.anomalias.map((anomalia) => (
                              <tr key={anomalia.id}>
                                <td className="p-2">{anomalia.dataHora}</td>
                                <td className="p-2">{anomalia.estacao}</td>
                                <td className="p-2">{anomalia.parametro}</td>
                                <td className="p-2 font-semibold text-red-500 print:text-black">{anomalia.valor}</td>
                                <td className="p-2">{anomalia.limite}</td>
                                <td className="p-2 text-red-500 print:text-black font-semibold">{anomalia.situacao}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                Nenhuma anomalia registrada no período.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Alertas Gerados */}
                {parametros.alertas && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground print:text-black mb-2">6. Alertas Gerados</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-border bg-accent/50 print:bg-gray-200 text-muted-foreground print:text-black">
                          <tr>
                            <th className="p-2">Data</th>
                            <th className="p-2">Estação</th>
                            <th className="p-2">Tipo de Alerta</th>
                            <th className="p-2">Gravidade</th>
                            <th className="p-2">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border print:divide-gray-300">
                          {dadosReais.alertas && dadosReais.alertas.length > 0 ? (
                            dadosReais.alertas.map((alerta) => (
                              <tr key={alerta.id}>
                                <td className="p-2">{alerta.data}</td>
                                <td className="p-2">{alerta.estacao}</td>
                                <td className="p-2">{alerta.tipo}</td>
                                <td className="p-2 font-semibold">{alerta.gravidade}</td>
                                <td className="p-2">{alerta.estado}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                Nenhum alerta gerado no período.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Conclusão Técnica */}
                <div className="border-t border-border print:border-gray-300 pt-4">
                  <h4 className="text-sm font-semibold text-foreground print:text-black mb-1">8. Conclusão Técnica</h4>
                  <p className="text-xs text-muted-foreground print:text-black leading-relaxed">
                    {dadosReais.conclusao ||
                      `Durante o período analisado (${dataInicio} — ${dataFim}), a estação ${estacao} registrou um total de ${dadosReais.resumo?.totalMedicoes?.toLocaleString('pt-PT') ?? 0} medições. Foram consolidadas ${dadosReais.resumo?.totalAnomalias ?? 0} anomalias e ${dadosReais.resumo?.totalAlertas ?? 0} alertas gerados.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}