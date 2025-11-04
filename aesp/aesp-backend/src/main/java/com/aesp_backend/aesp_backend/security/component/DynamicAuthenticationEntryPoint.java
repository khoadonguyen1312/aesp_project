package com.aesp_backend.aesp_backend.security.component;

import cn.hutool.json.JSONUtil;
import com.aesp_backend.aesp_backend.common.api.CommonResult;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * handle trường hợp người dùng chưa đăng nhập hoặc token hết hạn
 */
public class DynamicAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response, AuthenticationException authException) throws IOException, javax.servlet.ServletException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Cache-Control", "no-cache");
        response.setContentType("UTF-8");
        response.setContentType("application/json");
        response.getWriter().println(JSONUtil.parse(CommonResult.unauthorized(authException.getMessage())));
        response.getWriter().flush();
    }
}
