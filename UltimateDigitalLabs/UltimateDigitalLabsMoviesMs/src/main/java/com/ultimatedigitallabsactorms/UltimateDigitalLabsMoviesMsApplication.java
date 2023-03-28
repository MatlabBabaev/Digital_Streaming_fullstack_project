package com.ultimatedigitallabsactorms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class UltimateDigitalLabsMoviesMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(UltimateDigitalLabsMoviesMsApplication.class, args);
    }

}
