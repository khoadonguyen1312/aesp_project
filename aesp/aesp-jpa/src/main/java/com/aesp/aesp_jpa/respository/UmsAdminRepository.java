package com.aesp.aesp_jpa.respository;

import com.aesp.aesp_jpa.entity.UmsAdmin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UmsAdminRepository extends JpaRepository<UmsAdmin, Integer> {
    UmsAdmin findByusername(String username);

    List<UmsAdmin> findAllByUsername(String username);

    List<UmsAdmin> findAllByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
