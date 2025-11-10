package com.aesp_backend.aesp_backend.admin.controller;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.admin.dto.LoginRefeshTokenParam;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
public class TokenController {
    @Autowired
    private UmsMemberRepository umsMemberRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/login-get-token")
    public CommonResult<String> login_get_token(@RequestBody LoginRefeshTokenParam loginRefeshTokenParam) {
        UmsMember umsMember = umsMemberRepository.findByusername(loginRefeshTokenParam.getUsername());
        if (umsMember == null) {
            return CommonResult.failed("khong tim duoc tai khoan trong db");
        }
        if (umsMember.getPassword() != loginRefeshTokenParam.getPassword()) {
            return CommonResult.failed("passwod khong dung");
        }
        return CommonResult.success(jwtTokenUtil.generateToken(new DynamicUserDetail(umsMember)));
    }

    @GetMapping("/refresh-token")

    public CommonResult<String> refreshToken(@RequestParam String token) {
        return CommonResult.success(jwtTokenUtil.refreshHeadToken(token));
    }

}
