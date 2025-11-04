package com.aesp_backend.aesp_backend.security.Config;

import com.aesp_backend.aesp_backend.security.component.DynamicAccessDeniedHandler;
import com.aesp_backend.aesp_backend.security.component.DynamicAuthenticationEntryPoint;
import com.aesp_backend.aesp_backend.security.component.JwtAuthencationTokenFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private IgnoreUrlConfig ignoreUrlConfig;
    @Autowired
    private DynamicAccessDeniedHandler dynamicAccessDeniedHandler;
    @Autowired
    private DynamicAuthenticationEntryPoint dynamicAuthenticationEntryPoint;
    @Autowired

    private JwtAuthencationTokenFilter jwtAuthencationTokenFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        for (String url : ignoreUrlConfig.getUrls()) {
            httpSecurity.authorizeRequests().antMatchers(url).permitAll();
        }


        httpSecurity.authorizeRequests().antMatchers("/admin/**").hasRole("ADMIN");
        httpSecurity.authorizeRequests().antMatchers("/mentor/**").hasRole("MENTOR");


        httpSecurity.authorizeRequests().anyRequest().authenticated(); // bat cu request nao cung phai xac thuc
        httpSecurity.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.exceptionHandling().accessDeniedHandler(dynamicAccessDeniedHandler).authenticationEntryPoint(dynamicAuthenticationEntryPoint);
        httpSecurity.addFilterBefore(jwtAuthencationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();


    }
}
