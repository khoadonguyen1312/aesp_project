package com.aesp.aesp_admin.Controller;


import api.CommonResult;
import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Service.UmsAdminService;
import com.aesp.aesp_jpa.entity.UmsAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")

public class UmsController {
    @Autowired
    private UmsAdminService umsAdminService;

    @PostMapping("/register")
    public CommonResult<UmsAdmin> register(@Validated @RequestBody UmsAdminParam umsAdminParam) {

        UmsAdmin umsAdmin = umsAdminService.register(umsAdminParam);
        if (umsAdmin != null) {
            return CommonResult.success(umsAdmin,"tạo thành công tài khoản admin");
        } else {
            return CommonResult.failed("tạo tài khoản admin không thành công .Lý do :email hoặc username đã tồn tại trong db");
        }
    }

    @GetMapping("/test")
    public String test() {

        return "Test";
    }

}
