import { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const MapaLeaflet = lazy(() => import("./MapaEstacaoLeaflet"));

interface MapaEstacaoProps {
  latitude: number;
  longitude: number;
  codigo: string;
  nome?: string;
}

export function MapaEstacao({ latitude, longitude, codigo, nome }: MapaEstacaoProps) {
  const [modo, setModo] = useState<"normal" | "satelite">("normal");
  const [montado, setMontado] = useState(false);
  const titulo = nome?.trim() ? `${codigo} - ${nome}` : codigo;

  useEffect(() => {
    setMontado(true);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      {montado ? (
        <Suspense fallback={<div className="h-80 w-full bg-muted" />}>
          <MapaLeaflet latitude={latitude} longitude={longitude} titulo={titulo} modo={modo} />
        </Suspense>
      ) : (
        <div className="h-80 w-full bg-muted" />
      )}

      <div className="absolute right-3 top-3 z-[1000] flex gap-1 rounded-md border border-border bg-card/95 p-1 shadow-sm">
        <Button
          type="button"
          size="sm"
          variant={modo === "normal" ? "default" : "outline"}
          onClick={() => setModo("normal")}
        >
          Normal
        </Button>
        <Button
          type="button"
          size="sm"
          variant={modo === "satelite" ? "default" : "outline"}
          onClick={() => setModo("satelite")}
        >
          Satélite
        </Button>
      </div>
    </div>
  );
}