package com.aesp_backend.aesp_backend.jpa.respository;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.OmsLeason;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OmsCourseRepository extends JpaRepository<OmsCourse, Long> {
}
