package com.aesp_backend.aesp_backend.jpa.respository;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OmsCourseRepository extends JpaRepository<OmsCourse, Long> {
    Optional<OmsCourse> findById(Long id);
}
