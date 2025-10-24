package com.aesp.aesp_admin.controller;

import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Service.UmsAdminService;
import com.aesp.aesp_jpa.entity.UmsAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class UmsController {

    @Autowired
    private UmsAdminService umsAdminService;

    @PostMapping("/register")
    public ResponseEntity<UmsAdmin> register(@Validated @RequestBody UmsAdminParam umsAdminParam) {
        UmsAdmin umsAdmin = umsAdminService.register(umsAdminParam);
        if (umsAdmin != null) {
            return ResponseEntity.ok(umsAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/test")
    public String test() {
        return "Test";
    }

    // ✅ API lấy danh sách admin
    @GetMapping("/list")
    public ResponseEntity<List<UmsAdmin>> listAllAdmins() {
        List<UmsAdmin> admins = umsAdminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }
}


