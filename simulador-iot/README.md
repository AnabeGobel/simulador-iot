# Estação IoT Caála — Wokwi + ESP32 + HiveMQ

Este projeto simula a estação IoT do sistema de monitoramento energético.

## Componentes simulados

- ESP32 DevKitC
- DS18B20 — temperatura
- MPU6050 — aceleração/vibração e inclinação
- Potenciômetro 1 — simulação de tensão
- Potenciômetro 2 — simulação de corrente

O Wokwi suporta ESP32, DS18B20 e MPU6050, e o ESP32 simulado possui conectividade Wi-Fi para serviços como MQTT.

## Estrutura

Sensores virtuais
→ ESP32
→ Wi-Fi do Wokwi
→ HiveMQ MQTT
→ teu backend
→ banco de dados
→ telemetria/alertas/dashboard

## Antes de executar

Abra `sketch.ino` e altere:

MQTT_HOST
MQTT_PORT
MQTT_USER
MQTT_PASS
MQTT_TOPIC

Use o mesmo tópico que o teu backend já consome.

## Importante

Os valores de tensão e corrente são simulados por potenciômetros. Não representam uma medição elétrica real.

O campo `vibracao` é calculado a partir do acelerómetro do MPU6050. A métrica deverá ser calibrada se quiseres utilizá-la como indicador técnico de vibração.

O `secureClient.setInsecure()` foi usado somente para simplificar a demonstração no Wokwi. Em uma implementação real, deves validar o certificado TLS do broker.

## Como usar no Wokwi

1. Cria um novo projeto ESP32 no Wokwi.
2. Substitui o `diagram.json`.
3. Substitui o código pelo `sketch.ino`.
4. Adiciona as bibliotecas de `libraries.txt`.
5. Preenche os dados do HiveMQ.
6. Executa a simulação.
7. Abre o Serial Monitor.
8. Verifica no HiveMQ se o tópico recebe o JSON.

Depois, gira os potenciômetros para alterar tensão/corrente e altera os parâmetros do MPU6050 para testar vibração/inclinação.
