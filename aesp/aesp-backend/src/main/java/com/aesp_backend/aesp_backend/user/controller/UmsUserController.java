package com.aesp_backend.aesp_backend.user.controller;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.common.api.MapperUtil;
import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsLeasonDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsVocabularyDto;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import com.aesp_backend.aesp_backend.user.dto.UmsUserRegisterParam;
import com.aesp_backend.aesp_backend.user.service.UmsUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('USER')")
public class UmsUserController {
    @Autowired
    private UmsUserService umsUserService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

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
    public CommonResult<List<OmsCourseDto>> listCourses(@RequestParam int page, @RequestParam int size) {
        Page<OmsCourse> courses = umsUserService.getCourses(page, size); // hoặc service trả về List<OmsCourse>

        List<OmsCourseDto> courseDtos = courses.stream().map(course -> {
            OmsCourseDto courseDto = new OmsCourseDto();
            BeanUtils.copyProperties(course, courseDto);

            // map lessons
            if (course.getOmsLeasons() != null) {
                List<OmsLeasonDto> lessonsDto = course.getOmsLeasons().stream().map(lesson -> {
                    OmsLeasonDto lessonDto = new OmsLeasonDto();
                    BeanUtils.copyProperties(lesson, lessonDto);

                    // map vocabularies
                    if (lesson.getOmsVocabulary() != null && !lesson.getOmsVocabulary().isEmpty()) {
                        List<OmsVocabularyDto> vocabsDto = lesson.getOmsVocabulary().stream().map(vocab -> {
                            OmsVocabularyDto vocabDto = new OmsVocabularyDto();
                            BeanUtils.copyProperties(vocab, vocabDto);

                            if (vocab.getAudio() != null) {
                                vocabDto.setAudio(vocab.getAudio());
                            }

                            return vocabDto;
                        }).toList();
                        lessonDto.setVocabularies(vocabsDto);
                    }

                    if (lesson.getPdf() != null) {
                        lessonDto.setPdf(lesson.getPdf());
                    }

                    return lessonDto;
                }).toList();
                courseDto.setLeasons(lessonsDto);
            }

            if (course.getThumb() != null) {
                courseDto.setThumb(course.getThumb());
            }

            return courseDto;
        }).toList();

        return CommonResult.success(courseDtos);
    }

    @GetMapping("/my-course")
    public CommonResult<List<OmsCourseDto>> mycourse(@RequestParam int id, @RequestParam int page, @RequestParam int size) {
        Page<OmsCourse> pages = umsUserService.myCourse(page, size);
        List<OmsLeasonDto> omsLeasonDtos = new ArrayList<>();
        if (pages != null) {
            return CommonResult.success(MapperUtil.toCourseDtoList(pages.getContent()));
        }
        return CommonResult.failed(null);
    }

    @GetMapping("/see-course")

    public CommonResult<OmsCourseDto> see_course(@RequestParam int id) {
        OmsCourse omsCourse = umsUserService.getCourse(id);

        if (omsCourse != null) {
            return CommonResult.success(MapperUtil.toCourseDto(omsCourse));
        }
        return CommonResult.failed(null);
    }
}
