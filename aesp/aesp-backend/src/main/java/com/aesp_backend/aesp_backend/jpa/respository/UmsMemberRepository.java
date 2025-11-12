package com.aesp_backend.aesp_backend.jpa.respository;

import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UmsMemberRepository extends JpaRepository<UmsMember, Integer> {
    UmsMember findByusername(String username);

    List<UmsMember> findAllByUsername(String username);

    List<UmsMember> findAllByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    UmsMember findById(Long id);


    /**
     * Tìm tất cả Mentor
     * Bao gồm những user có role MENTOR, có thể kèm USER hoặc role khác
     */
    @Query("""
            SELECT DISTINCT m FROM UmsMember m
            JOIN m.umsRoles r
            WHERE r.role = 'MENTOR'
            """)
    Page<UmsMember> findAllMentors(Pageable pageable);

    /**
     * Tìm tất cả User bình thường
     * Chỉ lấy những user có role duy nhất là USER
     */
    @Query("""
            SELECT m FROM UmsMember m
            JOIN m.umsRoles r
            GROUP BY m
            HAVING COUNT(r) = 1 AND MAX(r.role) = 'USER'
            """)
    Page<UmsMember> findAllUsers(Pageable pageable);

}

