import { useEffect, useRef } from "react";

export function useRealtimePolling(callback: () => Promise<void> | void, intervalMs = 15000) {
  const callbackRef = useRef(callback);
  const executandoRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
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