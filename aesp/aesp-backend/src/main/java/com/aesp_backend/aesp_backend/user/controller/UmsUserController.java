package com.aesp_backend.aesp_backend.user.controller;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.common.api.MapperUtil;
import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.mentor.dto.CourseResponseDTO;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsLeasonDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsVocabularyDto;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import com.aesp_backend.aesp_backend.user.dto.UmsUserRegisterParam;
import com.aesp_backend.aesp_backend.user.service.UmsUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('USER')")
public class UmsUserController {
    @Autowired
    private UmsUserService umsUserService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private Logger logger = LoggerFactory.getLogger(UmsUserController.class);

    @PostMapping("/register")
    public CommonResult register(@RequestBody UmsUserRegisterParam userRegisterParam) {
        UmsMember umsMember = umsUserService.register(userRegisterParam);

        if (umsMember == null) {
            return CommonResult.failed("trung email hoac username");
        }
        DynamicUserDetail dynamicUserDetail = new DynamicUserDetail(umsMember);
        String token = jwtTokenUtil.generateToken(dynamicUserDetail);
        return CommonResult.success(token);
    }

    @PostMapping("/learn-course")

    public CommonResult<OmsCourse> learn_course(@RequestParam int id) {
        OmsCourse omsCourse = umsUserService.learnCourse(id);
        if (omsCourse == null) {
            return CommonResult.failed(null);
        }
        return CommonResult.success(omsCourse);
    }

    @GetMapping("/list-courses")
    public CommonResult<List<CourseResponseDTO>> listCourses(@RequestParam int page, @RequestParam int size) {
        Page<OmsCourse> courses = umsUserService.getCourses(page, size); // hoặc service trả về List<OmsCourse>


        return CommonResult.success(courses.stream().map(CourseResponseDTO::new).collect(Collectors.toList()));
    }

    @GetMapping("/my-course")
    public CommonResult<List<CourseResponseDTO>> mycourse(@RequestParam int page, @RequestParam int size) {
        Page<OmsCourse> pages = umsUserService.myCourse(page, size);
        List<OmsLeasonDto> omsLeasonDtos = new ArrayList<>();
        if (pages != null) {
            return CommonResult.success(pages.stream().map(CourseResponseDTO::new).collect(Collectors.toList()));
        }
        return CommonResult.failed(null);
    }

    @GetMapping("/see-course")

    public CommonResult<OmsCourseDto> see_course(@RequestParam int id) {
        logger.debug("dang lay thong tin cho khoa hoc co id:" + id);

        OmsCourse omsCourse = umsUserService.getCourse(id);

        if (omsCourse != null) {
            logger.debug("lay duoc thong tin khoa hoc");
            return CommonResult.success(MapperUtil.toCourseDto(omsCourse));
        }
        return CommonResult.failed(null);
    }
}
