package com.KafkaProducer.service;

import com.KafkaProducer.dto.KafkaMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class KafkaMessageProducerService {

    @Autowired
    KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    ObjectMapper objectMapper;

    public void sendMessage(String message) {
        System.out.println("Original message: " + message);

        String messageContent;
        try {
            // Extract the "message" field from the input JSON
            messageContent = objectMapper.readTree(message).get("message").asText();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON message", e);
        }

        // Log and prepare the extracted message content
        System.out.println("Extracted message content: " + messageContent);

        // Generate a unique message ID (UUID)
        String uniqueMessageId = UUID.randomUUID().toString();

        // Create a MessagePayload object
        KafkaMessage messagePayload = new KafkaMessage(messageContent, uniqueMessageId);

        // Convert the MessagePayload object to a JSON string
        String kafkaMessageJson;
        try {
            kafkaMessageJson = objectMapper.writeValueAsString(messagePayload);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error can't covert object into json", e);
        }

        // Send the JSON message to the Kafka topic
        kafkaTemplate.send("first", kafkaMessageJson);
        System.out.println("Message sent to Kafka: " + kafkaMessageJson);
    }
}
