package com.ultimatedigitallabs.kafka.consumer.listener;

import com.ultimatedigitallabs.dto.ReviewRequest;
import com.ultimatedigitallabs.models.Review;
import com.ultimatedigitallabs.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TopicListener {
    private final ReviewService service;

    @KafkaListener(topics = "create_review", containerFactory = "createKafkaListenerContainerFactory")
    public void consumeCreate(ConsumerRecord<String, ReviewRequest> payload){
        service.createReview(payload.value());
    }

}