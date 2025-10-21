package com.aesp.aesp_admin.Controller;


import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Service.UmsAdminService;
import com.aesp.aesp_jpa.entity.UmsAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class UmsController {
    @Autowired
    private UmsAdminService umsAdminService;

    @PostMapping("/regiser")

    public ResponseEntity<UmsAdmin> register(@Validated @RequestBody UmsAdminParam umsAdminParam) {

        UmsAdmin umsAdmin = umsAdminService.register(umsAdminParam);
        return ResponseEntity.ok(umsAdmin);
    }

    @GetMapping("/test")
    public String test() {

        return "Test";
    }

}
