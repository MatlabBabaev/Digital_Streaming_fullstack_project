package com.ultimatedigitallabs.kafka.consumer.config;

import com.ultimatedigitallabs.dto.ReviewRequest;
import com.ultimatedigitallabs.models.Review;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.Map;

@EnableKafka
@Configuration
public class ConfigConsumer {

    ///////////////////////////////////////////////////
    @Bean
    public ConsumerFactory<String, ReviewRequest> reviewCreateStateConsumerFactory(){
        JsonDeserializer<ReviewRequest> deserializer = new JsonDeserializer<>(ReviewRequest.class);
        deserializer.setUseTypeMapperForKey(true);

        Map<String, Object> config = Map.of(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:29092",
                ConsumerConfig.GROUP_ID_CONFIG, "udl-group",
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest",
                ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false,
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class,
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, deserializer
        );

        return new DefaultKafkaConsumerFactory<>(
                config,
                new StringDeserializer(),
                new ErrorHandlingDeserializer<>(deserializer)
        );
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, ReviewRequest> createKafkaListenerContainerFactory(){
        ConcurrentKafkaListenerContainerFactory<String, ReviewRequest> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(reviewCreateStateConsumerFactory());
        return factory;
    }

}
