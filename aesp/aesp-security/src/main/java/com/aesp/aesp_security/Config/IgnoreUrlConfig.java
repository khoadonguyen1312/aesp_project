package com.aesp.aesp_security.Config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

@ConfigurationProperties(prefix = "secure.ignored")
public class IgnoreUrlConfig {

    private List<String> urls =new ArrayList<>();
}
