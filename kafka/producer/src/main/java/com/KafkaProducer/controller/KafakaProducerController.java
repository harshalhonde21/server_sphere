package com.KafkaProducer.controller;

import com.KafkaProducer.service.KafkaMessageProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafkaproducer")
public class KafakaProducerController {

    @Autowired
    KafkaMessageProducerService service;

    @PostMapping("/message")
    public void sentMessage(@RequestBody String message)
    {
       service.sendMessage(message);
    }
}
