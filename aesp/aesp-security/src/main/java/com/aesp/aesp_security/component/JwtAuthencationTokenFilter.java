package com.aesp.aesp_security.component;

import com.aesp.aesp_security.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthencationTokenFilter extends OncePerRequestFilter {

    private  String tokenHeader ="Authorization";
    private  String tokenHead ="Bearer ";

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader =request.getHeader(tokenHeader);

        if(authHeader!=null&&authHeader.startsWith(tokenHead))
        {
            String token =authHeader.substring(tokenHead.length());
            String username =jwtTokenUtil.getUsernameFormToken(token);

            if(username!=null&& SecurityContextHolder.getContext().getAuthentication()==null)
            {

            }
        }
    }
}
