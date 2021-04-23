package com.example.spring_boot_java11_config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class SpringBootJava11ConfigApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootJava11ConfigApplication.class, args);
	}

}
