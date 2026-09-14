import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// 1. Carrega as variáveis de ambiente definidas no arquivo .env
dotenv.config();

// 2. Obtém as credenciais do ambiente
const supabaseUrl: string | undefined = process.env.SUPABASE_URL;
const supabaseKey: string | undefined = process.env.SUPABASE_KEY;

// 3. Valida se as variáveis de ambiente foram configuradas corretamente
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERRO: SUPABASE_URL ou SUPABASE_KEY não foram encontradas no arquivo .env.");
  process.exit(1);
}

// 4. Interface simples para representar os dados da tabela de estações
interface Estacao {
  id?: number;
  codigo: string;
  local: string;
  latitude?: number;
  longitude?: number;
  ativa: boolean;
  created_at?: string;
}

// 5. Inicializa o cliente do Supabase com tipagem forte
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * Função assíncrona responsável por testar a leitura no Supabase
 */
async function testarConexao(): Promise<void> {
  console.log("🔄 Testando conexão com o banco de dados do Supabase...");

  try {
    // Tenta realizar uma consulta simples trazendo no máximo 1 registro da tabela 'estacoes'
    const { data, error } = await supabase
      .from("estacoes")
      .select("*")
      .limit(1);

    // Se o Supabase retornar algum erro de query, permissão ou tabela inexistente
    if (error) {
      console.error("❌ Erro ao consultar a tabela do banco de dados:");
      console.error(`  Mensagem: ${error.message}`);
      console.error(`  Detalhes: ${error.details}`);
      return;
    }

    // Sucesso na conexão e consulta
    console.log("✅ Conexão com o Supabase estabelecida com sucesso!");
    
    // Cast dos dados retornados para a interface definida
    const estacoesRetornadas = data as Estacao[];

    if (estacoesRetornadas.length === 0) {
      console.log("ℹ️ A tabela 'estacoes' existe e está acessível, mas ainda não possui nenhum registro cadastrado.");
    } else {
      console.log("📊 Exemplo de registro encontrado no banco:");
      console.dir(estacoesRetornadas[0], { depth: null });
    }
  } catch (err) {
    // Captura erros de rede ou exceções não tratadas
    const mensagemErro = err instanceof Error ? err.message : String(err);
    console.error("❌ Erro inesperado ao tentar conectar:", mensagemErro);
  }
}

// Executa o teste de conexão
testarConexao();