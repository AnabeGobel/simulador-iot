import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Tema = "light" | "dark";

interface ThemeCtx {
  tema: Tema;
  alternar: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ tema: "light", alternar: () => {} });

const KEY = "iot-energia-tema";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("light");

  useEffect(() => {
    const guardado = localStorage.getItem(KEY) as Tema | null;
    const inicial: Tema =
      guardado ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTema(inicial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "dark");
  }, [tema]);

  const alternar = () => {
    setTema((t) => {
      const novo: Tema = t === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, novo);
      return novo;
    });
  };

  return <ThemeContext.Provider value={{ tema, alternar }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
