import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconeEstacao = L.divIcon({
  className: "estacao-marker",
  html: '<span class="estacao-marker-ponto"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface MapaEstacaoLeafletProps {
  latitude: number;
  longitude: number;
  titulo: string;
  modo: "normal" | "satelite";
}

export default function MapaEstacaoLeaflet({ latitude, longitude, titulo, modo }: MapaEstacaoLeafletProps) {
  return (
    <MapContainer center={[latitude, longitude]} zoom={15} scrollWheelZoom className="h-80 w-full">
      {modo === "normal" ? (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      ) : (
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      )}
      <Marker position={[latitude, longitude]} icon={iconeEstacao}>
        <Tooltip permanent direction="top" offset={[0, -12]}>
          {titulo}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}