package com.aesp_backend.aesp_backend.admin.controller;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.admin.dto.LoginRefeshTokenParam;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
@CrossOrigin
public class TokenController {

    @Autowired
    private UmsMemberRepository umsMemberRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private final Logger logger = LoggerFactory.getLogger(TokenController.class);

    // 🔐 Đăng nhập và lấy token mới
    @PostMapping("/login-get-token")
    public CommonResult<String> login_get_token(@RequestBody LoginRefeshTokenParam loginRefeshTokenParam) {
        UmsMember umsMember = umsMemberRepository.findByusername(loginRefeshTokenParam.getUsername());
        if (umsMember == null) {
            return CommonResult.failed("Không tìm được tài khoản trong DB");
        }
        if (!umsMember.getPassword().equals(loginRefeshTokenParam.getPassword())) {
            return CommonResult.failed("Password không đúng");
        }
        String token = jwtTokenUtil.generateToken(new DynamicUserDetail(umsMember));
        return CommonResult.success(token);
    }

    // 🔄 Làm mới token
    @GetMapping("/refresh-token")
    public CommonResult<String> refreshToken(@RequestParam String token) {
        String refreshed = jwtTokenUtil.refreshHeadToken(token);
        logger.debug("Refreshed Token: " + refreshed);
        return CommonResult.success(refreshed);
    }
}
