package com.aesp_backend.aesp_backend.jpa.respository;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OmsCourseRepository extends JpaRepository<OmsCourse, Long> {
    Optional<OmsCourse> findById(Long id);

    Page<OmsCourse> findAll(Pageable pageable);


    @Query("SELECT c FROM OmsCourse c JOIN c.buyers b WHERE b.username = :username")
    Page<OmsCourse> findByBuyerUsername(@Param("username") String username, Pageable pageable);

}
