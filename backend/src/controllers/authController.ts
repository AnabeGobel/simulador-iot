import { Request, Response } from 'express';
import supabase from '../config/supabase';

// Login de Utilizador
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ erro: 'E-mail e palavra-passe são obrigatórios.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // O Supabase devolve mensagens diferentes consoante o motivo — mas até
    // agora estávamos a esconder isso atrás de "Credenciais inválidas.",
    // o que faz parecer sempre que a password está errada, mesmo quando
    // o problema real é o e-mail ainda não confirmado.
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return res.status(401).json({
        erro: 'Esta conta ainda não confirmou o e-mail. Peça ao administrador para confirmar a conta.',
      });
    }
    return res.status(401).json({ erro: 'Credenciais inválidas.', detalhe: error.message });
  }

  // Busca o perfil na tabela usuarios
  const { data: perfil } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (perfil && perfil.estado === 'Inativa') {
    return res.status(403).json({ erro: 'Esta conta está inativa. Contacte o administrador.' });
  }

  return res.json({
    mensagem: 'Login efetuado com sucesso!',
    session: data.session,
    usuario: perfil,
  });
};

// Regista um novo utilizador.
//
// Sistema privado: NÃO existe autorregisto. Esta rota está sempre protegida
// (ver authRoutes.ts: autenticarToken + autorizarPerfis('Administrador')) —
// só um Administrador com sessão iniciada pode chegar até aqui, a partir da
// página /app/utilizadores. A criação da primeiríssima conta de
// administrador (quando a base de dados ainda está vazia) NÃO passa por
// aqui — é feita uma única vez com o script scripts/criarAdminInicial.ts,
// correndo diretamente no servidor/terminal, nunca pela internet.
export const registar = async (req: Request, res: Response) => {
  const { nome_completo, email, password, username, telefone, perfil } = req.body;

  if (!email || !password || !nome_completo) {
    return res.status(400).json({ erro: 'Nome, e-mail e palavra-passe são obrigatórios.' });
  }

  const perfilFinal = perfil || 'Técnico';

  // 1. Cria a conta de Auth já confirmada (email_confirm: true).
  //    Usamos supabase.auth.admin.createUser em vez de supabase.auth.signUp
  //    porque aqui é um Administrador a criar a conta de outra pessoa —
  //    não faz sentido essa pessoa ter de clicar num link de confirmação
  //    antes de conseguir entrar pela primeira vez. Isto exige a chave
  //    privilegiada (Secret key) no backend, que já é a que usas.
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    return res.status(400).json({ erro: 'Erro ao criar conta de acesso.', detalhe: authError.message });
  }

  // 2. Regista o perfil estendido na tabela public.usuarios
  const { data: usuarioData, error: dbError } = await supabase
    .from('usuarios')
    .insert([
      {
        id: authData.user?.id,
        nome_completo,
        email,
        username,
        telefone,
        perfil: perfilFinal,
        estado: 'Ativa',
      },
    ])
    .select()
    .single();

  if (dbError) {
    return res.status(400).json({ erro: 'Erro ao registar perfil no banco de dados.', detalhe: dbError.message });
  }

  return res.status(201).json({
    mensagem: 'Utilizador registado com sucesso!',
    usuario: usuarioData,
  });
};
