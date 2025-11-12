package com.aesp_backend.aesp_backend.mentor.service;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.UmsMentorDto;
import org.springframework.stereotype.Service;


public interface UmsMentorService {
    OmsCourse createCourse(OmsCourseDto omsCourseDto);

    int deleteCourse(int id);

    OmsCourse updateCourse(int id);

    OmsCourse getCourse(int id);

    UmsMember register(UmsMentorDto umsMentorDto);

}
