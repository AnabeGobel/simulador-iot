import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as require_leaflet_src } from "../_libs/leaflet.mjs";
import { i as MapContainer, n as TileLayer, r as Marker, t as Tooltip } from "../_libs/react-leaflet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MapaEstacaoLeaflet-CLyHI3rk.js
var import_jsx_runtime = require_jsx_runtime();
var iconeEstacao = (/* @__PURE__ */ __toESM(require_leaflet_src())).default.divIcon({
	className: "estacao-marker",
	html: "<span class=\"estacao-marker-ponto\"></span>",
	iconSize: [24, 24],
	iconAnchor: [12, 12]
});
function MapaEstacaoLeaflet({ latitude, longitude, titulo, modo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
		center: [latitude, longitude],
		zoom: 15,
		scrollWheelZoom: true,
		className: "h-80 w-full",
		children: [modo === "normal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
			attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
			url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
			attribution: "Tiles © Esri",
			url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
			position: [latitude, longitude],
			icon: iconeEstacao,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				permanent: true,
				direction: "top",
				offset: [0, -12],
				children: titulo
			})
		})]
	});
}
//#endregion
export { MapaEstacaoLeaflet as default };
