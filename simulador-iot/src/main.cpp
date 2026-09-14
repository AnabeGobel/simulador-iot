#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

// ============================================================
// CONFIGURAÇÕES DE REDE E BROKER MQTT
// ============================================================

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASSWORD = "";

// HiveMQ: substitua pelos seus dados reais do cluster
const char* MQTT_HOST = "a4eb17181781469595bc0d470a537e32.s1.eu.hivemq.cloud";
const int   MQTT_PORT = 8883;
const char* MQTT_USER = "backend_caala";
const char* MQTT_PASS = "Des242001";


#define ONE_WIRE_PIN 4
#define VOLTAGE_PIN  34
#define CURRENT_PIN  35

OneWire oneWire(ONE_WIRE_PIN);
DallasTemperature tempSensor(&oneWire);
Adafruit_MPU6050 mpu;

WiFiClientSecure secureClient;
PubSubClient mqtt(secureClient);

int currentStationIndex = 1; // Controla a estação atual (1 a 5)

struct TelemetryData {
  String codigo_estacao;
  String device_id;
  float temperatura;
  float tensao;
  float corrente;
  float vibracao;
  float inclinacao;
};

void connectWiFi() {
  Serial.print("WiFi: Conectando");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD, 6);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println("\nWiFi Conectado!");
}

void connectMQTT() {
  while (!mqtt.connected()) {
    Serial.print("MQTT: Conectando... ");
    String clientId = "ESP32-VSCODE-MULTI-" + String((uint32_t)ESP.getEfuseMac(), HEX);

    if (mqtt.connect(clientId.c_str(), MQTT_USER, MQTT_PASS)) {
      Serial.println("Conectado ao HiveMQ!");
    } else {
      Serial.print("Falhou, rc=");
      Serial.println(mqtt.state());
      delay(3000);
    }
  }
}

// Gera dados específicos para validar as anomalias no backend
TelemetryData generateTelemetryForStation(int stationNumber) {
  TelemetryData data;

  switch (stationNumber) {
    case 1: // CAALA-001: Operação Normal (Tudo OK)
      data.codigo_estacao = "CAALA-001";
      data.device_id      = "ESP32-TESTE-00";
      data.temperatura    = 28.5f + (random(-10, 10) / 10.0f);
      data.tensao         = 220.0f + (random(-30, 30) / 10.0f); // 217V - 223V
      data.corrente       = 14.0f + (random(-10, 10) / 10.0f);  // 13A - 15A
      data.vibracao       = 0.12f;
      data.inclinacao     = 1.1f;
      break;

    case 2: // CAALA-002: Sobretensão e Sobrecorrente (ANOMALIA ELÉTRICA)
      data.codigo_estacao = "CAALA-002";
      data.device_id      = "ESP32-TESTE-01";
      data.temperatura    = 42.0f;
      data.tensao         = 264.5f; // ANOMALIA: > 253V
      data.corrente       = 39.2f;  // ANOMALIA: > 32A
      data.vibracao       = 0.35f;
      data.inclinacao     = 2.0f;
      break;

    case 3: // CAALA-003: Vibração Elevada e Inclinação Crítica (ANOMALIA MECÂNICA / QUEDA)
      data.codigo_estacao = "CAALA-003";
      data.device_id      = "ESP32-TESTE-03";
      data.temperatura    = 31.0f;
      data.tensao         = 218.0f;
      data.corrente       = 9.5f;
      data.vibracao       = 3.95f;  // ANOMALIA: > 2.5g
      data.inclinacao     = 27.8f;  // ANOMALIA: > 15°
      break;

    case 4: // CAALA-004: Sobreaquecimento (ANOMALIA DE TEMPERATURA)
      data.codigo_estacao = "CAALA-004";
      data.device_id      = "ESP32-TESTE-04";
      data.temperatura    = 78.2f;  // ANOMALIA: > 65°C
      data.tensao         = 212.0f;
      data.corrente       = 28.0f;
      data.vibracao       = 0.18f;
      data.inclinacao     = 0.8f;
      break;

    case 5: // CAALA-005: Subtensão (ANOMALIA DE TENSÃO BAIXA)
    default:
      data.codigo_estacao = "CAALA-005";
      data.device_id      = "ESP32-TESTE-01";
      data.temperatura    = 25.0f;
      data.tensao         = 192.0f; // ANOMALIA: < 208V
      data.corrente       = 5.0f;
      data.vibracao       = 0.05f;
      data.inclinacao     = 0.3f;
      break;
  }

  return data;
}

void publishTelemetry() {
  TelemetryData data = generateTelemetryForStation(currentStationIndex);

  char topic[128];
  snprintf(topic, sizeof(topic), "caala/estacoes/%s/telemetria", data.codigo_estacao.c_str());

  char payload[384];
  snprintf(
    payload,
    sizeof(payload),
    "{\"codigo_estacao\":\"%s\",\"device_id\":\"%s\","
    "\"temperatura\":%.2f,\"tensao\":%.2f,\"corrente\":%.2f,"
    "\"vibracao\":%.3f,\"inclinacao\":%.2f}",
    data.codigo_estacao.c_str(),
    data.device_id.c_str(),
    data.temperatura,
    data.tensao,
    data.corrente,
    data.vibracao,
    data.inclinacao
  );

  Serial.println("================================================");
  Serial.print("Enviando Estação: "); Serial.println(data.codigo_estacao);
  Serial.print("Tópico: "); Serial.println(topic);
  Serial.print("Payload: "); Serial.println(payload);

  if (mqtt.publish(topic, payload)) {
    Serial.println("MQTT: Mensagem enviada com sucesso!");
  } else {
    Serial.println("MQTT: Erro ao enviar mensagem.");
  }

  // Avança para a próxima estação (rotaciona de 1 a 5)
  currentStationIndex++;
  if (currentStationIndex > 5) {
    currentStationIndex = 1;
  }
}

void setup() {
  Serial.begin(115200);
  delay(500);

  analogReadResolution(12);
  Wire.begin(21, 22);

  tempSensor.begin();
  mpu.begin();

  connectWiFi();

  secureClient.setInsecure();
  mqtt.setServer(MQTT_HOST, MQTT_PORT);
  mqtt.setBufferSize(1024);

  connectMQTT();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) connectWiFi();
  if (!mqtt.connected()) connectMQTT();

  mqtt.loop();
  publishTelemetry();

  // Publica a cada 5 segundos
  delay(5000);
}