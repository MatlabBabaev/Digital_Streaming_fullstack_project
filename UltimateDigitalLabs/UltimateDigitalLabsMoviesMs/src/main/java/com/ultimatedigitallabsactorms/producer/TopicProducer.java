package com.ultimatedigitallabsactorms.producer;

import com.ultimatedigitallabsactorms.dto.ReviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicProducer {
    private final String createTopic= "create_review";
    private final KafkaTemplate<String, ReviewDto> kafkaCreateTemplate;
    public void createReview(ReviewDto reviewRequest){
        kafkaCreateTemplate.send(createTopic, reviewRequest);
    }
}