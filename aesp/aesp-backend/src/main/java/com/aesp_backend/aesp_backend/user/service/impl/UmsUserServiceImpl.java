package com.aesp_backend.aesp_backend.user.service.impl;

import com.aesp_backend.aesp_backend.jpa.cache.UmsRoleCache;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.entity.UmsUserData;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsUserDataRepository;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import com.aesp_backend.aesp_backend.user.dto.UmsUserRegisterParam;
import com.aesp_backend.aesp_backend.user.service.UmsUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UmsUserServiceImpl implements UmsUserService {
    @Autowired
    private UmsMemberRepository umsMemberRepository;
    @Autowired
    private UmsUserDataRepository umsUserDataRepository;
    @Autowired
    private UmsRoleCache umsRoleCache;

    @Override
    public UmsMember register(UmsUserRegisterParam userRegisterParam) {
        UmsMember umsMember = new UmsMember();
        UmsUserData umsUserData = new UmsUserData();
        BeanUtils.copyProperties(userRegisterParam, umsMember);
        BeanUtils.copyProperties(userRegisterParam, umsUserData);
        umsMember.setUmsRoles(Set.of(umsRoleCache.getRole("USER")));
        umsMember.setUmsUserData(umsUserData);
        umsUserDataRepository.save(umsUserData);
        umsMemberRepository.save(umsMember);


        return umsMember;

    }
}
