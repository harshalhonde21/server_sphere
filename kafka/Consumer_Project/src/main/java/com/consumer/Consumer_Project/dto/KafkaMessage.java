package com.consumer.Consumer_Project.dto;


public class KafkaMessage {
    private String message;
    private String uuid;

    public KafkaMessage(String message, String uuid) {
        this.message = message;
        this.uuid = uuid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
