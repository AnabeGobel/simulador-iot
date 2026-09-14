import { createClient } from "@supabase/supabase-js";

// Estas duas variáveis vão no ficheiro .env do FrontEnd (Vite):
//   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=eyJ...   <- a chave "anon/public", NUNCA a service_role
//
// A chave anon é segura para expor no frontend (é para isso que existe).
// A service_role fica só no backend (config/supabase.ts), nunca aqui.
//
// Nota: acedemos com colchetes (env["VITE_..."]) em vez de env.VITE_...
// porque o tsconfig deste projeto tem noPropertyAccessFromIndexSignature
// ativo, que exige essa forma para propriedades vindas de index signatures.
const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "❌ VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não definidos no .env do FrontEnd."
  );
}

// Mantém o SSR renderizável quando as variáveis ainda não foram cadastradas
// no provedor de deploy. As operações Supabase continuarão a falhar até que
// as variáveis reais sejam configuradas na Vercel.
export const supabase = createClient(
  supabaseUrl || "https://configuracao-supabase-incompleta.invalid",
  supabaseAnonKey || "configuracao-supabase-incompleta",
);
