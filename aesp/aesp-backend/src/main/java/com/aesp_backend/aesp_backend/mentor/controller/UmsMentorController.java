package com.aesp_backend.aesp_backend.mentor.controller;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.common.api.CommonResult;
import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.mentor.dto.*;
import com.aesp_backend.aesp_backend.mentor.service.UmsMentorService;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mentor")

public class UmsMentorController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UmsMentorService umsMentorService;

    @PostMapping("/register")
    public CommonResult<String> register(@RequestBody UmsMentorDto umsMentorDto) {

        UmsMember umsMember = umsMentorService.register(umsMentorDto);
        if (umsMember == null) {
            return CommonResult.failed("trung username hoac email");
        }
        DynamicUserDetail dynamicUserDetail = new DynamicUserDetail(umsMember);


        return CommonResult.success(jwtTokenUtil.generateToken(dynamicUserDetail));
    }

    @PostMapping(value = "/course/create")
    @PreAuthorize("hasRole('MENTOR')")
    public CommonResult<?> createCourse(@RequestBody OmsCourseDto omsCourseDto) {
        umsMentorService.createCourse(omsCourseDto);
        return CommonResult.success("Course created successfully");
    }

    @PreAuthorize("hasRole('MENTOR')")
    @GetMapping("/course/info")
    public CommonResult<OmsCourseDto> getCourse(@RequestParam int id) {

        OmsCourse omsCourse = umsMentorService.getCourse(id);

        if (omsCourse != null) {
            OmsCourseDto omsCourseDto = new OmsCourseDto();
            BeanUtils.copyProperties(omsCourse, omsCourseDto);

            // map lessons
            if (omsCourse.getOmsLeasons() != null) {
                List<OmsLeasonDto> lessonsDto = omsCourse.getOmsLeasons().stream().map(lesson -> {
                    OmsLeasonDto dto = new OmsLeasonDto();
                    BeanUtils.copyProperties(lesson, dto);

                    // map vocabularies (Set -> List)
                    if (lesson.getOmsVocabulary() != null && !lesson.getOmsVocabulary().isEmpty()) {
                        List<OmsVocabularyDto> vocabsDto = lesson.getOmsVocabulary().stream().map(vocab -> {
                            OmsVocabularyDto vocabDto = new OmsVocabularyDto();
                            BeanUtils.copyProperties(vocab, vocabDto);


                            if (vocab.getAudio() != null) {
                                vocabDto.setAudio(vocab.getAudio());
                            }

                            return vocabDto;
                        }).toList();

                        dto.setVocabularies(vocabsDto);
                    }


                    if (lesson.getPdf() != null) {
                        dto.setPdf(String.valueOf(lesson.getPdf()));
                    }

                    return dto;
                }).toList();
                omsCourseDto.setLeasons(lessonsDto);
            }

            // thumb
            if (omsCourse.getThumb() != null) {
                omsCourseDto.setThumb(String.valueOf(omsCourse.getThumb()));
            }
            omsCourseDto.setCourseContent(omsCourse.getCourse_content());

            omsCourseDto.setRequiredForLearning(omsCourseDto.getRequiredForLearning());

            return CommonResult.success(omsCourseDto);
        }

        return CommonResult.failed("Không tìm thấy course");
    }


    @DeleteMapping("/course/delete")
    public CommonResult deleteCourse(@RequestParam int id) {

        int deleteCourse = umsMentorService.deleteCourse(id);
        if (deleteCourse == 1) {
            return CommonResult.success("xoa course thanh cong");
        }

        return CommonResult.failed("khong xoa duoc course");
    }

    @PostMapping("/course/update")
    @PreAuthorize("hasRole('MENTOR')")
    public CommonResult<?> updateCourse(@RequestParam int id, @RequestBody OmsCourseDto omsCourseDto) {

        OmsCourse updatedCourse = umsMentorService.updateCourse(id, omsCourseDto);
        if (updatedCourse != null) {
            return CommonResult.success("Course updated successfully");
        } else {
            return CommonResult.failed("Course not found or update failed");
        }
    }

    @GetMapping("/list-course")
    public CommonResult<List<CourseResponseDTO>> omsCourseList() {
        List<OmsCourse> omsCourses = umsMentorService.listCourse();
        return CommonResult.success(omsCourses.stream().map(CourseResponseDTO::new).collect(Collectors.toList()));
    }
}
