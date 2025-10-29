package com.aesp.aesp_jpa.Cache;

import com.aesp.aesp_jpa.entity.UmsRole;
import com.aesp.aesp_jpa.respository.UmsRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
            Optional<UmsRole> optionalRole = umsRoleRepository.findByName(roleName);
            if (optionalRole.isPresent()) {
                role = optionalRole.get();
                umsRoleMap.put(roleName, role);
            }
        }
        return role;
    }
}
