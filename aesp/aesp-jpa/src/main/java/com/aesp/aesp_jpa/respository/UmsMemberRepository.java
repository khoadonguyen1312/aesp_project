package com.aesp.aesp_jpa.respository;


import com.aesp.aesp_jpa.entity.UmsMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UmsMemberRepository extends JpaRepository<UmsMember, Integer> {
    UmsMember findByusername(String username);

    List<UmsMember> findAllByUsername(String username);

    List<UmsMember> findAllByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
