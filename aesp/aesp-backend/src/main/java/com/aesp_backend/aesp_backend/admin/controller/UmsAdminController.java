package com.aesp_backend.aesp_backend.admin.controller;


import com.aesp_backend.aesp_backend.admin.UmsAdminParam;
import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.admin.dto.UmsAdminInfoResponse;
import com.aesp_backend.aesp_backend.admin.dto.UpdatePasswordParam;
import com.aesp_backend.aesp_backend.admin.service.UmsAdminService;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import lombok.Data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;

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

    /**
     * list mentor in db
     *
     * @param page
     * @param size
     * @return
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/list-mentor")
    public CommonResult<Data> list_mentor(@RequestParam int page, @RequestParam int size) {
        return null;


    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/list-user")
    public CommonResult<String> list_user(@RequestParam int page, @RequestParam int size) {
        return null;
    }

    /**
     * delete member account with id
     *
     * @param id
     * @return
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-member")
    public CommonResult<String> delete_member(@RequestParam int id) {
        int delete_member = umsAdminService.deleteMemberAccount(id);
        if (delete_member == 0) {
            return CommonResult.failed("khong xoa duoc tai khoang .Ly do id khong ton tai");
        }
        return CommonResult.success("xoa thanh cong tai khoan voi id: " + id);
    }

    /**
     * lock user account with id
     *
     * @param id
     * @return
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/lock-member")
    public CommonResult<String> lock_member(@RequestParam int id) {
        int lock = umsAdminService.lock_member(id);
        if (lock == 1) {
            return CommonResult.success("lock thanh cong account voi id :" + id);


        }
        return CommonResult.failed("khong lock duoc account voi id :" + id);
    }

    /**
     * unlock account
     *
     * @param id
     * @return
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/unlock-member")
    public CommonResult<String> unlock_member(@RequestParam int id) {
        int unlock = umsAdminService.unlock_member(id);
        if (unlock == 1) {
            return CommonResult.success("unlock thanh cong account voi id :" + id);
        }
        return CommonResult.failed("khong unlock duoc account");
    }

    /**
     * ypdate password
     *
     * @param updatePasswordParam
     * @return
     */
    @PreAuthorize(("hasRole('ADMIN')"))
    @PostMapping("/update-password")
    public CommonResult<String> update_password(@RequestBody UpdatePasswordParam updatePasswordParam) {
        int update_password = umsAdminService.update_password(updatePasswordParam.getId(), updatePasswordParam.getPassword());
        if (update_password == 1) {
            return CommonResult.success("doi password thanh cong");
        }

        return CommonResult.failed("khong doi duoc password");
    }


}
