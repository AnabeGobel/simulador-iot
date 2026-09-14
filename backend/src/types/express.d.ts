import { User } from '@supabase/supabase-js';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: string;
        email: string;
        perfil?: string;
        rawUser?: User;
      };
    }
  }
}