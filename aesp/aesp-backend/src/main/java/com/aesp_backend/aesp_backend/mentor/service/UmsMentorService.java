package com.aesp_backend.aesp_backend.mentor.service;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;

public interface UmsMentorService {
    OmsCourse createCourse();

    int deleteCourse(int id);

    OmsCourse updateCourse(int id);

    OmsCourse getCourse(int id);

}
