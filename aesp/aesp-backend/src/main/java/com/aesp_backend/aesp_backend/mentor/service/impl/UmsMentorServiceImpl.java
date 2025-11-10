package com.aesp_backend.aesp_backend.mentor.service.impl;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.respository.OmsCourseRepository;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.service.UmsMentorService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

public class UmsMentorServiceImpl implements UmsMentorService {
    @Autowired
    private OmsCourseRepository omsCourseRepository;

    @Override
    public OmsCourse createCourse(OmsCourseDto omsCourseDto) {
        OmsCourse omsCourse = new OmsCourse();
        BeanUtils.copyProperties(omsCourseDto, omsCourse);

        omsCourseRepository.save(omsCourse);
        return omsCourse;
    }

    @Override
    public int deleteCourse(int id) {
        return 0;
    }

    @Override
    public OmsCourse updateCourse(int id) {
        return null;
    }

    @Override
    public OmsCourse getCourse(int id) {
        return null;
    }
}
