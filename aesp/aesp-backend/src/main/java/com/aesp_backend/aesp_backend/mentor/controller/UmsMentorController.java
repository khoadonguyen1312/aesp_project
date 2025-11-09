package com.aesp_backend.aesp_backend.mentor.controller;

import com.aesp_backend.aesp_backend.common.api.CommonResult;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mentor")
public class UmsMentorController {
    @PostMapping("/create-course")
    @PreAuthorize("hasRole('MENTOR')")
    public CommonResult createCourse() {
        return null;
    }
    @GetMapping("/course")
    public  CommonResult getCourse(int id)
    {
        return null;
    }
    @DeleteMapping("/course")
    public  CommonResult deleteCourse(int id)
    {
        return null;
    }
    @PutMapping("/course")
    public  CommonResult updateCourse(int id)
    {
        return null;
    }
}
