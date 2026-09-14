import { Request, Response } from 'express';
import supabase from '../config/supabase';

export const listarUsuarios = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('nome_completo', { ascending: true });

  if (error) {
    return res.status(500).json({ erro: 'Erro ao listar utilizadores.', detalhe: error.message });
  }

  return res.json(data);
};

export const atualizarPerfilUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { perfil, estado } = req.body;

  const { data, error } = await supabase
    .from('usuarios')
    .update({ perfil, estado })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ erro: 'Erro ao atualizar utilizador.', detalhe: error.message });
  }

  return res.json({ mensagem: 'Utilizador atualizado com sucesso!', usuario: data });
};

// Qualquer utilizador autenticado pode alterar a SUA PRÓPRIA palavra-passe
// (não precisa de ser Administrador — ver usuariosRoutes.ts, esta rota só
// exige autenticarToken, não autorizarPerfis).
export const alterarSenha = async (req: Request, res: Response) => {
  const { senhaAtual, novaSenha } = req.body;
  const email = req.usuario?.email;

  if (!email) {
    return res.status(401).json({ erro: 'Utilizador não autenticado.' });
  }
  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ erro: 'Indique a palavra-passe atual e a nova palavra-passe.' });
  }
  if (novaSenha.length < 6) {
    return res.status(400).json({ erro: 'A nova palavra-passe deve ter pelo menos 6 caracteres.' });
  }

  // 1. Confirma que a palavra-passe atual está correta, tentando iniciar
  //    sessão com ela. Isto evita que alguém com o token roubado (mas sem
  //    saber a password atual) consiga trocar a palavra-passe de outra
  //    pessoa.
  const { error: erroLogin } = await supabase.auth.signInWithPassword({ email, password: senhaAtual });
  if (erroLogin) {
    return res.status(401).json({ erro: 'A palavra-passe atual está incorreta.' });
  }

  // 2. Atualiza para a nova palavra-passe usando a API de administração
  //    (precisa da chave privilegiada, que o backend já usa).
  const { error: erroAtualizar } = await supabase.auth.admin.updateUserById(req.usuario!.id, {
    password: novaSenha,
  });

  if (erroAtualizar) {
    return res.status(400).json({ erro: 'Erro ao atualizar a palavra-passe.', detalhe: erroAtualizar.message });
  }

  return res.json({ mensagem: 'Palavra-passe alterada com sucesso!' });
};

// Remove definitivamente um utilizador — apaga tanto o perfil em
// public.usuarios como a conta no Supabase Auth (auth.users). Só apagar a
// linha de public.usuarios não bastaria: a pessoa continuaria a conseguir
// fazer login normalmente, só que sem perfil associado.
export const removerUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Evita que um Administrador se remova a si próprio por engano, o que
  // deixaria o sistema sem ninguém com acesso à gestão de utilizadores.
  if (req.usuario?.id === id) {
    return res.status(400).json({ erro: 'Não podes remover a tua própria conta enquanto tens sessão iniciada.' });
  }

  // 1. Remove a conta de autenticação (impede novos logins)
  const { error: erroAuth } = await supabase.auth.admin.deleteUser(id);
  if (erroAuth) {
    return res.status(400).json({ erro: 'Erro ao remover a conta de acesso.', detalhe: erroAuth.message });
  }

  // 2. Remove o perfil estendido
  const { error: erroPerfil } = await supabase.from('usuarios').delete().eq('id', id);
  if (erroPerfil) {
    return res.status(400).json({
      erro: 'A conta de acesso foi removida, mas houve um erro ao remover o perfil.',
      detalhe: erroPerfil.message,
    });
  }

  return res.json({ mensagem: 'Utilizador removido com sucesso!' });
};
