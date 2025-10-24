package com.aesp.aesp_security.Config;

import com.aesp.aesp_security.component.DynamicAccessDeniedHandler;
import com.aesp.aesp_security.component.DynamicAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private IgnoreUrlConfig ignoreUrlConfig;
    @Autowired
    private  DynamicAccessDeniedHandler dynamicAccessDeniedHandler;
    @Autowired
    private DynamicAuthenticationEntryPoint dynamicAuthenticationEntryPoint;
//    @Bean
//    SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws  Exception{
//        ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = httpSecurity
//                .authorizeRequests();
//
//        for(String url: ignoreUrlConfig.getUrls())
//        {
//            registry.antMatchers(url).permitAll();
////            bỏ qua xác thực cho các url
//        }
//        registry.antMatchers(HttpMethod.OPTIONS).permitAll();
//        // cho phép các request có phương thức option đi qua
//        registry.antMatchers("/admin")
//                        .hasRole("ADMIN_ROLE");
//        registry.antMatchers("/MENTOR").hasRole("MENTOR_ROLE");
//        registry.and()
//                .authorizeRequests(
//                )
//                .anyRequest()
//                .authenticated()
//                // xác thực bất kỳ request nào
//                .and()
//                .csrf()
//                .disable()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                /*
//                tắt csrf
//                tắt tự tạo session
//                 */
//                .and()
//                .exceptionHandling()
//                .accessDeniedHandler(dynamicAccessDeniedHandler)
//                .authenticationEntryPoint(dynamicAuthenticationEntryPoint)
//
//
//
//                ;
//                return httpSecurity.build();
//
//    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws  Exception
    {

        for(String url: ignoreUrlConfig.getUrls())
        {
            httpSecurity.authorizeRequests().antMatchers(url).permitAll();
        }



        httpSecurity.authorizeRequests().antMatchers("/admin/").hasRole("ADMIN_ROLE");
        httpSecurity.authorizeRequests().antMatchers("/memtor").hasRole("MENTOR_ROLE");

        httpSecurity.csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.exceptionHandling()
                .accessDeniedHandler(dynamicAccessDeniedHandler)
                .authenticationEntryPoint(dynamicAuthenticationEntryPoint);

        return httpSecurity.build();



    }
}
