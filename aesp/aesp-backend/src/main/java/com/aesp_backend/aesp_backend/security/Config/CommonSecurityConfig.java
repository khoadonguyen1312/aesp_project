package com.aesp_backend.aesp_backend.security.Config;

import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import com.aesp_backend.aesp_backend.security.component.DynamicAccessDeniedHandler;
import com.aesp_backend.aesp_backend.security.component.DynamicAuthenticationEntryPoint;
import com.aesp_backend.aesp_backend.security.component.JwtAuthencationTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonSecurityConfig {
    @Bean
    public IgnoreUrlConfig ignoreUrlConfig() {
        return new IgnoreUrlConfig();
    }


    @Bean
    public JwtTokenUtil jwtTokenUtil() {
        return new JwtTokenUtil();
    }

    @Bean
    public DynamicAccessDeniedHandler dynamicAccessDeniedHandler() {
        return new DynamicAccessDeniedHandler();
    }

    @Bean
    public DynamicAuthenticationEntryPoint dynamicAuthenticationEntryPoint() {
        return new DynamicAuthenticationEntryPoint();
    }
    @Bean
    public JwtAuthencationTokenFilter jwtAuthencationTokenFilter ()
    {
        return new JwtAuthencationTokenFilter();
    }
}
