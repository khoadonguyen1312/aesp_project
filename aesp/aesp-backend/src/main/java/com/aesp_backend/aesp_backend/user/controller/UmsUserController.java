package com.aesp_backend.aesp_backend.user.controller;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import com.aesp_backend.aesp_backend.user.dto.UmsUserRegisterParam;
import com.aesp_backend.aesp_backend.user.service.UmsUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UmsUserController {
    @Autowired
    private UmsUserService umsUserService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/register")
    public CommonResult register(@RequestBody UmsUserRegisterParam userRegisterParam) {
        UmsMember umsMember = umsUserService.register(userRegisterParam);

        if (umsMember == null) {
            return CommonResult.failed("trung email hoac username");
        }
        String token = jwtTokenUtil.generateToken(new DynamicUserDetail(umsMember));
        return CommonResult.success(token);
    }

}
