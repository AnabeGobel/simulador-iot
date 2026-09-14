import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../services/api";

export type Perfil = "admin" | "tecnico" | "operador";

export const rotulosPerfil: Record<Perfil, string> = {
  admin: "Administrador",
  tecnico: "Técnico",
  operador: "Operador",
};

// Cada valor aqui corresponde ao "recurso" de um item do menu em
// AppShell.tsx. Se acrescentares uma página nova, junta a chave aqui e
// decide, na matriz mais abaixo, quem pode vê-la/editá-la.
export type Recurso =
  | "dashboard"
  | "monitoramento"
  | "estacoes"
  | "sensores"
  | "anomalias"
  | "alertas"
  | "grafana"
  | "relatorios"
  | "utilizadores"
  | "configuracoes";

function perfilBackendParaFrontend(p?: string | null): Perfil {
  const v = (p || "").toLowerCase();
  if (v.startsWith("admin")) return "admin";
  if (v.startsWith("t")) return "tecnico";
  return "operador";
}

export function perfilFrontendParaBackend(p: Perfil): string {
  return p === "admin" ? "Administrador" : p === "tecnico" ? "Técnico" : "Operador";
}

export interface Sessao {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  entradaEm: string;
}

// MATRIZ DE PERMISSÕES
// --------------------
// pode VER:
//   admin    -> tudo
//   tecnico  -> tudo exceto Utilizadores e Configurações (só o admin gere
//               contas e define os limites do sistema)
//   operador -> tudo exceto Utilizadores e Configurações (acompanha a rede
//               no dia a dia, mas não a administra)
const PERMISSOES_VER: Record<Perfil, Recurso[]> = {
  admin: [
    "dashboard", "monitoramento", "estacoes", "sensores",
    "anomalias", "alertas", "grafana", "relatorios",
    "utilizadores", "configuracoes",
  ],
  tecnico: [
    "dashboard", "monitoramento", "estacoes", "sensores",
    "anomalias", "alertas", "grafana", "relatorios",
  ],
  operador: [
    "dashboard", "monitoramento", "estacoes", "sensores",
    "anomalias", "alertas", "grafana", "relatorios",
  ],
};

// pode EDITAR / criar / resolver:
//   admin    -> estações, sensores, utilizadores, configurações (limites)
//   tecnico  -> estações, sensores (trabalho de campo/manutenção) e
//               resolver alertas (o backend já só aceita Administrador ou
//               Técnico em /alertas/:id/resolver)
//   operador -> não edita nada, só visualiza (pode marcar alertas como lidos)
const PERMISSOES_EDITAR: Record<Perfil, Recurso[]> = {
  admin: ["estacoes", "sensores", "utilizadores", "configuracoes"],
  tecnico: ["estacoes", "sensores", "alertas"],
  operador: [],
};

interface AuthContextValue {
  sessao: Sessao | null;
  carregado: boolean;
  entrar: (email: string, senha: string) => Promise<{ ok: boolean; erro?: string }>;
  sair: () => void;
  pode: (area: Recurso) => boolean;
  podeEditar: (area: Recurso) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const CHAVE_TOKEN = "@iot_caala:token";
const CHAVE_REFRESH_TOKEN = "@iot_caala:refresh_token";
const CHAVE_USUARIO = "@iot_caala:usuario";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(CHAVE_TOKEN);
    const usuarioBruto = localStorage.getItem(CHAVE_USUARIO);
    if (token && usuarioBruto) {
      try {
        setSessao(JSON.parse(usuarioBruto));
      } catch {
        localStorage.removeItem(CHAVE_TOKEN);
        localStorage.removeItem(CHAVE_USUARIO);
      }
    }
    setCarregado(true);
  }, []);

  const entrar: AuthContextValue["entrar"] = async (email, senha) => {
    try {
      const resposta = await api.post("/auth/login", { email, password: senha });
      const { session, usuario } = resposta.data;

      if (!session?.access_token) {
        return { ok: false, erro: "Resposta inválida do servidor." };
      }
      if (usuario?.estado === "Inativa") {
        return { ok: false, erro: "Esta conta está inativa. Contacte o administrador." };
      }

      const novaSessao: Sessao = {
        id: usuario?.id ?? "",
        nome: usuario?.nome_completo ?? usuario?.nome ?? email,
        email: usuario?.email ?? email,
        perfil: perfilBackendParaFrontend(usuario?.perfil),
        entradaEm: new Date().toISOString(),
      };

      localStorage.setItem(CHAVE_TOKEN, session.access_token);
      if (session.refresh_token) {
        localStorage.setItem(CHAVE_REFRESH_TOKEN, session.refresh_token);
      }
      localStorage.setItem(CHAVE_USUARIO, JSON.stringify(novaSessao));
      setSessao(novaSessao);

      return { ok: true };
    } catch (err: any) {
      const msg = err?.response?.data?.erro || "E-mail ou palavra-passe incorretos.";
      return { ok: false, erro: msg };
    }
  };

  const sair = () => {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_REFRESH_TOKEN);
    localStorage.removeItem(CHAVE_USUARIO);
    setSessao(null);
    if (typeof window !== "undefined") window.location.replace("/login");
  };

  const pode = (area: Recurso) => !!sessao && PERMISSOES_VER[sessao.perfil].includes(area);
  const podeEditar = (area: Recurso) => !!sessao && PERMISSOES_EDITAR[sessao.perfil].includes(area);

  return (
    <AuthContext.Provider value={{ sessao, carregado, entrar, sair, pode, podeEditar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
