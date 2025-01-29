package com.consumer.Consumer_Project.service;

import com.consumer.Consumer_Project.modal.DataTable;
import com.consumer.Consumer_Project.repository.DataTableRepo;
import com.consumer.Consumer_Project.dto.KafkaMessage; // Renamed DTO for clarity
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class KafkaMessageConsumerService {

    @Autowired
    DataTableRepo dataTableRepository;

    @Autowired
    ObjectMapper objectMapper;

    String dummyApiUrl = "http://localhost:1111/dummyapi";

    @KafkaListener(topics = "first")
    public void consumeMessage(String kafkaMessageJson) {
        try {
            // Converting JSON into Object of KafkaMessage DTO
            KafkaMessage messagePayload = objectMapper.readValue(kafkaMessageJson, KafkaMessage.class);

            // Extract UUID and message content
            String messageId = messagePayload.getUuid();
            String receivedMessage = messagePayload.getMessage();

            // Save message data to the database
            DataTable dataTableEntry = new DataTable(messageId, receivedMessage, null);
            dataTableRepository.save(dataTableEntry);

            // Send message to external API and get response
            RestTemplate apiRestTemplate = new RestTemplate();
            String response = apiRestTemplate.postForObject(dummyApiUrl, receivedMessage, String.class);

            // Update the database with the API response
            Optional<DataTable> optionalDataTable = dataTableRepository.findById(messageId);
            if(optionalDataTable.isPresent()) {
                DataTable dataTable = optionalDataTable.get();
                dataTable.setResponse(response);
                dataTableRepository.save(dataTable);
            }

        } catch (Exception e) {
            System.err.println("Error processing Kafka message: " + kafkaMessageJson);
            e.printStackTrace();
        }
    }
}
