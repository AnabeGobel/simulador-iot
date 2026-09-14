import { Request, Response, NextFunction } from 'express';
import supabase from '../config/supabase';

export const autenticarToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }

    const { data: usuarioPerfil } = await supabase
      .from('usuarios')
      .select('perfil, estado')
      .eq('email', user.email)
      .maybeSingle();

    // Se a linha em public.usuarios não existe mais (conta removida por um
    // Administrador), o utilizador não deve continuar a aceder ao sistema
    // só porque ainda tem um token do Supabase Auth válido.
    if (!usuarioPerfil) {
      return res.status(403).json({ erro: 'Conta de utilizador não encontrada. Contacte o administrador.' });
    }

    if (usuarioPerfil.estado === 'Inativa') {
      return res.status(403).json({ erro: 'Conta de utilizador inativa.' });
    }

    req.usuario = {
      id: user.id,
      email: user.email || '',
      perfil: usuarioPerfil.perfil || 'Operador',
      rawUser: user,
    };

    next();
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro ao validar autenticação.', detalhe: err.message });
  }
};

export const autorizarPerfis = (...perfisPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Utilizador não autenticado.' });
    }

    if (!perfisPermitidos.includes(req.usuario.perfil || '')) {
      return res.status(403).json({ 
        erro: `Acesso negado. Perfil '${req.usuario.perfil}' não tem permissão.` 
      });
    }

    next();
  };
};