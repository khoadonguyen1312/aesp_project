package com.aesp_backend.aesp_backend.user.service;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.user.dto.UmsUserRegisterParam;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;


public interface UmsUserService {

    UmsMember register(UmsUserRegisterParam userRegisterParam);

    Page<OmsCourse> getCourses(int page, int size);

    OmsCourse getCourse(int id);

    OmsCourse learnCourse(int id);

    Page<OmsCourse> myCourse(int page, int size);
}
