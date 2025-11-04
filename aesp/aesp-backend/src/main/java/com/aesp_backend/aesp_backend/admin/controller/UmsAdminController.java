package com.aesp_backend.aesp_backend.admin.controller;


import com.aesp_backend.aesp_backend.admin.UmsAdminParam;
import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.admin.dto.UmsAdminInfoResponse;
import com.aesp_backend.aesp_backend.admin.service.UmsAdminService;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import lombok.Data;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;

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
            logger.debug("không tạo được");
            return CommonResult.failed("không tạo được tài khoản bị trùng user hoặc email");
        }
        logger.debug("tạo được");
        DynamicUserDetail dynamicUserDetails = new DynamicUserDetail(umsMember);
        String token = jwtTokenUtil.generateToken(dynamicUserDetails);
        logger.debug(token);
        return CommonResult.success(token);
    }

    @GetMapping("/test")
    public String test() {

        return "Test";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/info")
    public CommonResult<UmsAdminInfoResponse> info(@RequestParam int id) {
        UmsAdminInfoResponse umsAdminInfoResponse = umsAdminService.info(id);
        return umsAdminInfoResponse == null ? CommonResult.failed("không tìm thấy tài khoản trong hệ thống") : CommonResult.success(umsAdminInfoResponse);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/list-user")
    public  CommonResult<Data> list_user(@RequestParam int page,@RequestParam int size)
    {
        return null;


    }

}
