package com.ultimatedigitallabconfigserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class UltimateDigitalLabsConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(UltimateDigitalLabsConfigServerApplication.class, args);
	}

}