export interface TelemetriaPayload {
  codigo_estacao: string;
  device_id: string;
  temperatura?: number;
  tensao?: number;
  corrente?: number;
  vibracao?: number;
  inclinacao?: number;
}