package com.aesp_backend.aesp_backend.mentor.controller;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.mentor.dto.UmsMentorDto;
import com.aesp_backend.aesp_backend.mentor.service.UmsMentorService;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mentor")
public class UmsMentorController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UmsMentorService umsMentorService;

    @PostMapping("/register")
    public CommonResult<String> register(@Validated @RequestBody UmsMentorDto umsMentorDto) {

        UmsMember umsMember = umsMentorService.register(umsMentorDto);
        if (umsMember == null) {
            return CommonResult.failed("trung username hoac email");
        }
        DynamicUserDetail dynamicUserDetail = new DynamicUserDetail(umsMember);


        return CommonResult.success(jwtTokenUtil.generateToken(dynamicUserDetail));
    }

    @PostMapping("/course/create")
    @PreAuthorize("hasRole('MENTOR')")
    public CommonResult createCourse() {
        return null;
    }

    @GetMapping("/course")
    public CommonResult getCourse(@RequestParam int id) {
        return null;
    }

    @DeleteMapping("/course")
    public CommonResult deleteCourse(@RequestParam int id) {
        return null;
    }

    @PutMapping("/course")
    public CommonResult updateCourse(int id) {
        return null;
    }
}
