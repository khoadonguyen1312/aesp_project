package com.aesp.aesp_security.Config;

import com.aesp.aesp_security.component.DynamicAccessDeniedHandler;
import com.aesp.aesp_security.component.DynamicAuthenticationEntryPoint;
import com.aesp.aesp_security.util.JwtTokenUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonSecurityConfig {
    @Bean
    public IgnoreUrlConfig ignoreUrlConfig() {
        return new IgnoreUrlConfig();
    }



    @Bean
    public DynamicAccessDeniedHandler dynamicAccessDeniedHandler() {
        return new DynamicAccessDeniedHandler();
    }

    @Bean
    public DynamicAuthenticationEntryPoint dynamicAuthenticationEntryPoint() {
        return new DynamicAuthenticationEntryPoint();
    }
}
