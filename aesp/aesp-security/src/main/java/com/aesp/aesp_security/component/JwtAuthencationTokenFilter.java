package com.aesp.aesp_security.component;

import com.aesp.aesp_security.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthencationTokenFilter extends OncePerRequestFilter {

    private  String tokenHeader ="Authorization";
    private  String tokenHead ="Bearer ";
    private static final Logger logger =LoggerFactory.getLogger(JwtAuthencationTokenFilter.class);
    @Autowired
    private UserDetailsService userDetailsService ;
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

                UserDetails userDetails =userDetailsService.loadUserByUsername(username);
                  if(jwtTokenUtil.validateToken(token,userDetails))
                  {
                      UsernamePasswordAuthenticationToken authentication =new UsernamePasswordAuthenticationToken(userDetails,
                              null

                              ,userDetails.getAuthorities());
                      //ép chi tiết thông tin từ client lấy từ request cho authencation
                      authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                      //set authencation cho context
                      SecurityContextHolder.getContext().setAuthentication(authentication);

                  }
            }
        }
        filterChain.doFilter(request,response);
    }
}
