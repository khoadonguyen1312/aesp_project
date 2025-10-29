package com.aesp.aesp_jpa.respository;

import com.aesp.aesp_jpa.entity.UmsRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UmsRoleRepository extends JpaRepository<UmsRole,Integer> {
    Optional<UmsRole> findByName(String name);
}
