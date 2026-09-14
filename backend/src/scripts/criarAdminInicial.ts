/**
 * Cria a PRIMEIRA conta de Administrador do sistema.
 *
 * Este script NÃO é uma rota HTTP — corre-se uma única vez, manualmente,
 * no terminal do servidor. É a única forma de "entrar" no sistema quando
 * a base de dados ainda está vazia, sem abrir nenhuma porta pública de
 * autorregisto.
 *
 * Como usar:
 *   1. Garante que o .env do backend tem SUPABASE_URL e SUPABASE_KEY
 *      (tem de ser a chave privilegiada — Secret key / service_role —
 *      necessária para usar supabase.auth.admin.createUser).
 *   2. Corre a partir da pasta do backend:
 *        npx ts-node src/scripts/criarAdminInicial.ts "Nome Completo" email@caala.ao "palavraPasse123"
 *   3. Depois de criada, entra em /login com esse e-mail e palavra-passe.
 *      A partir daí, esse Administrador cria todas as outras contas em
 *      /app/utilizadores — este script não deve voltar a ser necessário.
 */

import supabase from '../config/supabase';

async function criarAdminInicial() {
  const [, , nomeArg, emailArg, senhaArg] = process.argv;

  if (!nomeArg || !emailArg || !senhaArg) {
    console.error('Uso: npx ts-node scripts/criarAdminInicial.ts "Nome Completo" email@caala.ao "palavraPasse"');
    process.exit(1);
  }

  const nome_completo = nomeArg;
  const email = emailArg.trim().toLowerCase();
  const password = senhaArg;

  // Verifica se já existe algum Administrador — para não criar duplicados
  // por engano.
  const { count, error: erroContagem } = await supabase
    .from('usuarios')
    .select('id', { count: 'exact', head: true })
    .eq('perfil', 'Administrador');

  if (erroContagem) {
    console.error('Erro ao verificar administradores existentes:', erroContagem.message);
    process.exit(1);
  }

  if ((count ?? 0) > 0) {
    console.error('Já existe pelo menos um Administrador no sistema. Este script não vai criar outro.');
    console.error('Para criar mais contas, entra com um Administrador existente e usa /app/utilizadores.');
    process.exit(1);
  }

  // Usa a API de administração (não signUp) para criar a conta já com o
  // e-mail confirmado — evita o bug de "Credenciais inválidas" causado por
  // contas criadas mas nunca confirmadas por e-mail.
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError || !authData.user) {
    console.error('Erro ao criar a conta de acesso (Supabase Auth):', authError?.message);
    process.exit(1);
  }

  const { error: dbError } = await supabase.from('usuarios').insert([
    {
      id: authData.user.id,
      nome_completo,
      email,
      username: email.split('@')[0],
      perfil: 'Administrador',
      estado: 'Ativa',
    },
  ]);

  if (dbError) {
    console.error('A conta de acesso foi criada, mas falhou ao gravar o perfil em `usuarios`:', dbError.message);
    process.exit(1);
  }

  console.log(`✅ Administrador "${nome_completo}" <${email}> criado com sucesso.`);
  console.log('Já podes entrar em /login com este e-mail e palavra-passe.');
  process.exit(0);
}

criarAdminInicial();
