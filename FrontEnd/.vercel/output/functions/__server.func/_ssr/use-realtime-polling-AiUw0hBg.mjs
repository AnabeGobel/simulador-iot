import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-realtime-polling-AiUw0hBg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useRealtimePolling(callback, intervalMs = 15e3) {
	const callbackRef = (0, import_react.useRef)(callback);
	const executandoRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		callbackRef.current = callback;
	}, [callback]);
	(0, import_react.useEffect)(() => {
		const interval = window.setInterval(() => {
			if (executandoRef.current || document.visibilityState === "hidden") return;
			executandoRef.current = true;
			Promise.resolve(callbackRef.current()).finally(() => {
				executandoRef.current = false;
			});
		}, intervalMs);
		return () => window.clearInterval(interval);
	}, [intervalMs]);
}
//#endregion
export { useRealtimePolling as t };
