package com.aesp_backend.aesp_backend.jpa.respository;

import com.aesp_backend.aesp_backend.jpa.entity.UmsRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UmsRoleRepository extends JpaRepository<UmsRole, Integer> {
    Optional<UmsRole> findByRole(String name);
}
