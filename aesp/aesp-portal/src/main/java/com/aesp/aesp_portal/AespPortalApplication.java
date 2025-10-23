package com.aesp.aesp_portal;

import com.aesp.aesp_security.Config.IgnoreUrlConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication(scanBasePackages = "com.aesp")
public class AespPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(AespPortalApplication.class, args);
	}

}
