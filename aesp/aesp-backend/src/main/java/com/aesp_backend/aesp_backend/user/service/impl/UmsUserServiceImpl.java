package com.aesp_backend.aesp_backend.user.service.impl;

import com.aesp_backend.aesp_backend.jpa.cache.UmsRoleCache;
import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.entity.UmsUserData;
import com.aesp_backend.aesp_backend.jpa.respository.OmsCourseRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsUserDataRepository;
import com.aesp_backend.aesp_backend.security.JwtTokenUtil;
import com.aesp_backend.aesp_backend.security.component.GetCurrentUmsMember;
import com.aesp_backend.aesp_backend.user.dto.UmsUserRegisterParam;
import com.aesp_backend.aesp_backend.user.service.UmsUserService;
import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UmsUserServiceImpl implements UmsUserService {
    @Autowired
    private UmsMemberRepository umsMemberRepository;
    @Autowired
    private UmsUserDataRepository umsUserDataRepository;
    @Autowired
    private UmsRoleCache umsRoleCache;
    @Autowired
    private OmsCourseRepository omsCourseRepository;
    @Autowired
    private GetCurrentUmsMember getCurrentUmsMember;
    private Logger logger = LoggerFactory.getLogger(UmsUserServiceImpl.class);

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

    @Override
    public Page<OmsCourse> getCourses(int page, int size) {
        return omsCourseRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public OmsCourse getCourse(int id) {
        Optional<OmsCourse> omsCourse = omsCourseRepository.findById(id);
        if (omsCourse.isEmpty()) {
            return null;
        }
        return omsCourse.get();
    }

    @Override
    public OmsCourse learnCourse(int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UmsMember umsMember = getCurrentUmsMember.getMember();
        logger.debug(umsMember.getUsername());


        if (umsMember == null) {
            return null;
        }

        OmsCourse omsCourse = omsCourseRepository.findById(id
        ).orElse(null);
        logger.debug(omsCourse.getName());
        if (omsCourse == null) {
            return null;
        }


        if (omsCourse.getBuyers().contains(umsMember)) {
            logger.debug("user da mua khoa hoc nay");
            return null;
        }


        omsCourse.getBuyers().add(umsMember);
        return omsCourseRepository.save(omsCourse);


    }

    @Override
    public Page<OmsCourse> myCourse(int page, int size) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();

            UmsMember umsMember = umsMemberRepository.findByUsername(username);
            if (umsMember == null) {
                return null;
            }


            return omsCourseRepository.findByBuyerUsername(username, PageRequest.of(page, size));
        }

        return null;
    }

}
