package com.aesp.aesp_admin.Controller;


import api.CommonResult;
import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Service.UmsAdminService;

import com.aesp.aesp_admin.bo.DynamicUserDetails;
import com.aesp.aesp_jpa.entity.UmsMember;
import com.aesp.aesp_security.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin")

public class UmsAdminController {
    private final static Logger logger = LoggerFactory.getLogger(UmsAdminController.class);
    @Autowired
    private UmsAdminService umsAdminService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/register")
    public CommonResult<String> register(@Validated @RequestBody UmsAdminParam umsAdminParam) {
        logger.info("đang bắt đầu đăng ký cho admin");
        UmsMember umsMember = umsAdminService.register(umsAdminParam);
        if (umsMember == null) {
            return CommonResult.failed("không tạo được tài khoản bị trùng user hoặc email");
        }
        DynamicUserDetails dynamicUserDetails = new DynamicUserDetails(umsMember);
        String token = jwtTokenUtil.generateToken(dynamicUserDetails);
        return CommonResult.success(token);
    }

    @GetMapping("/test")
    public String test() {

        return "Test";
    }

}
