import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl: string | undefined = process.env.SUPABASE_URL;
const supabaseKey: string | undefined = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erro: SUPABASE_URL ou SUPABASE_KEY não foram definidos no ficheiro .env');
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

export default supabase;