package com.consoleapp.ConsoleApp;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ConsoleApp {

    public static void main(String[] args) {

        String kafkaProducerURL = "http://localhost:8080/kafkaproducer/message";

        HttpClient client = HttpClient.newHttpClient();
        ObjectMapper objectMapper = new ObjectMapper(); // Jackson ObjectMapper for object to JSON conversion

        for (int i = 1; i<10; i++) {
            try {
                // Construct the Message
                Message message = new Message();
                message.setMessage("Hello " + i);

                // Create HTTP Request Body (JSON)
                String requestBody = objectMapper.writeValueAsString(message);

                // Construct the HTTP Request
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(kafkaProducerURL))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(requestBody)) // Set JSON body
                        .build();

                // Send the HTTP Request to the Kafka Producer
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                // Check the response code
                if (response.statusCode() == 200) {
                    System.out.println("Message sent successfully.");
                } else {
                    System.out.println("Error: " + response.statusCode());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}


