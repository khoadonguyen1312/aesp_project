package com.aesp.aesp_portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.aesp")
public class AespPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(AespPortalApplication.class, args);
	}

}
