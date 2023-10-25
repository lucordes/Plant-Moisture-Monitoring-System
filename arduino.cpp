#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";
const char* serverUrl = "http://your_backend_server_ip_or_domain:3000/moisture"; // Replace with your backend server URL

void setup() {
  Serial.begin(115200);
  delay(4000);  // Delay to ensure Serial Monitor is ready

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Send data to the backend
  sendDataToBackend("Plant Name", 75);  // Example data (plantname and moisturePercentage)
}

void loop() {
  // Do other tasks if needed
}

void sendDataToBackend(const char* plantname, int moisturePercentage) {
  HTTPClient http;

  // Create JSON object
  String jsonPayload = "{\"plantname\":\"" + String(plantname) + "\",\"moisturePercentage\":" + String(moisturePercentage) + "}";

  // Start HTTP POST request
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  // Send JSON data
  int httpResponseCode = http.POST(jsonPayload);

  // Handle response code (optional)
  if (httpResponseCode > 0) {
    Serial.printf("HTTP Response code: %d\n", httpResponseCode);
  } else {
    Serial.printf("Error sending data. HTTP Response code: %d\n", httpResponseCode);
  }

  // Free resources
  http.end();
}
