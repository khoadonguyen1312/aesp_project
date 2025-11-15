package com.aesp_backend.aesp_backend.mentor.service;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.UmsMentorDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UmsMentorService {
    OmsCourse createCourse(OmsCourseDto omsCourseDto);

    int deleteCourse(int id);

    OmsCourse updateCourse(int id, OmsCourseDto omsCourseDto);

    OmsCourse getCourse(int id);

    UmsMember register(UmsMentorDto umsMentorDto);

    List<OmsCourse> listCourse();
}
