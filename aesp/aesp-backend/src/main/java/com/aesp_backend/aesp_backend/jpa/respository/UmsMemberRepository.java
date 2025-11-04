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
     * create page on role
     * @param role
     * @param pageable
     * @return
     */
    @Query("SELECT DISTINCT m FROM UmsMember m JOIN m.umsRoles r WHERE r.role = :role")
    Page<UmsMember> findByRole(@Param("role") String role, Pageable pageable);
}

