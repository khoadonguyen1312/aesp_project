package com.aesp_backend.aesp_backend.jpa.cache;

import com.aesp_backend.aesp_backend.jpa.entity.UmsRole;
import com.aesp_backend.aesp_backend.jpa.respository.UmsRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class UmsRoleCache {

    private final UmsRoleRepository umsRoleRepository;
    private final Map<String, UmsRole> umsRoleMap = new HashMap<>();

    @Autowired
    public UmsRoleCache(UmsRoleRepository umsRoleRepository) {
        this.umsRoleRepository = umsRoleRepository;
        loadCache(); // tải cache ngay khi khởi tạo
    }


    public void loadCache() {
        umsRoleMap.clear();
        List<UmsRole> roles = umsRoleRepository.findAll();
        for (UmsRole role : roles) {
            umsRoleMap.put(role.getRole(), role);
        }
    }


    public UmsRole getRole(String roleName) {
        UmsRole role = umsRoleMap.get(roleName);
        if (role == null) {
            Optional<UmsRole> optionalRole = umsRoleRepository.findByRole(roleName);
            if (optionalRole.isPresent()) {
                role = optionalRole.get();
                umsRoleMap.put(roleName, role);
            }
        }
        return role;
    }

    public Set<UmsRole> ADMIN_ROLE() {
        Set<UmsRole> roles = new HashSet<>();
        roles.add(this.getRole("ADMIN"));
        roles.add(this.getRole("USER"));
        return roles;
    }

    public Set<UmsRole> USER_ROLE() {
        Set<UmsRole> roles = new HashSet<>();

        roles.add(this.getRole("USER"));
        return roles;
    }

    public Set<UmsRole> MENTOR_ROLE() {
        Set<UmsRole> roles = new HashSet<>();
        roles.add(this.getRole("MENTOR"));
        roles.add(this.getRole("USER"));
        return roles;
    }
}
