package com.aesp.aesp_security.Config;

import com.aesp.aesp_security.component.DynamicAccessDeniedHandler;
import com.aesp.aesp_security.component.DynamicAuthenticationEntryPoint;
import com.aesp.aesp_security.component.JwtAuthencationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
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
        httpSecurity.authorizeRequests().antMatchers("/memtor/**").hasRole("MENTOR");

        httpSecurity.csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.exceptionHandling()
                .accessDeniedHandler(dynamicAccessDeniedHandler)
                .authenticationEntryPoint(dynamicAuthenticationEntryPoint);
        httpSecurity.addFilterBefore(jwtAuthencationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();


    }
}
