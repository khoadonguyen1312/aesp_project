package com.aesp_backend.aesp_backend.mentor.controller;

import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.mentor.dto.UmsMentorDto;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mentor")
public class UmsMentorController {

    @PostMapping
    public CommonResult<String> register(@RequestBody UmsMentorDto umsMentorDto) {


        return null;
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
