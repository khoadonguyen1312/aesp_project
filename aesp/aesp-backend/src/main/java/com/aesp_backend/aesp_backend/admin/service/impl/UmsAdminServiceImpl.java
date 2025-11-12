package com.aesp_backend.aesp_backend.admin.service.impl;


import com.aesp_backend.aesp_backend.admin.UmsAdminParam;
import com.aesp_backend.aesp_backend.admin.dto.UmsAdminInfoResponse;
import com.aesp_backend.aesp_backend.admin.dto.UpdatePasswordParam;
import com.aesp_backend.aesp_backend.admin.service.UmsAdminService;
import com.aesp_backend.aesp_backend.jpa.cache.UmsRoleCache;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.entity.UmsRole;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import org.apache.catalina.core.ApplicationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class UmsAdminServiceImpl implements UmsAdminService {

    private static final Logger logger = LoggerFactory.getLogger(UmsAdminService.class);
    @Autowired
    private UmsMemberRepository umsMemberRepository;

    @Override
    public UmsMember findByUsername(String username) {
        return umsMemberRepository.findByusername(username);
    }

    @Override
    public String login(String username, String password) {
        return "";
    }

    @Autowired
    private UmsRoleCache umsRoleCache;

    @Override
    public UmsAdminInfoResponse info(int id) {
        logger.debug("tim info admin cho user voi id :" + id);

        UmsMember umsMember = umsMemberRepository.findById(Long.valueOf(id));

        if (umsMember != null) {
            return UmsAdminInfoResponse.builder().status(umsMember.getStatus() == 1 ? "active" : "no active").created_at(umsMember.getCreate_at().toString()).username(umsMember.getUsername()).email(umsMember.getEmail()).build();

        }
        return null;
    }


    @Override
    public UmsMember register(UmsAdminParam umsAdminParam) {
        logger.debug("service admin đang đăng ký tài khoản");
        UmsMember umsMember = new UmsMember();
        BeanUtils.copyProperties(umsAdminParam, umsMember);
        logger.debug(umsMember.getUsername());
        if (umsMemberRepository.existsByUsername(umsMember.getUsername()) || umsMemberRepository.existsByEmail(umsMember.getEmail())) {
            logger.debug("khong save thanh cong do bi trung ten hoac email");
            return null;
        }
        umsMember.setCreate_at(LocalDateTime.now());
        umsMember.setLogin_time(LocalDateTime.now());
        Set<UmsRole> umsRoles = new HashSet<>();
        umsRoles.add(umsRoleCache.getRole("ADMIN"));
        umsRoles.add(umsRoleCache.getRole("USER"));
        umsRoles.add(umsRoleCache.getRole("MENTOR"));
        umsMember.setUmsRoles(umsRoles);
        umsMemberRepository.save(umsMember);
        logger.debug("save thanh cong admin user vao db");
        return umsMember;
    }

    @Override
    public int update(int id, UmsMember umsAdmin) {
        if (umsMemberRepository.existsById(id)) {
            umsMemberRepository.save(umsAdmin);
            logger.debug("update thanh cong thong tin cho admin co ten" + umsAdmin.getUsername());
            return 1;
        }
        return 0;
    }

    @Override
    public int delete(int id) {
        if (umsMemberRepository.existsById(id)) {
            umsMemberRepository.deleteById(id);
            logger.debug("xóa thành công user admin với id");
            return 1;
        }
        return 0;
    }

    @Override
    public int deleteMemberAccount(int id) {
        UmsMember umsMember = umsMemberRepository.findById(Long.valueOf(id));
        if (umsMember != null) {
            umsMemberRepository.delete(umsMember);
            logger.debug("xoa thanh cong UmsMember voi id: " + umsMember.getId() + "voi username: " + umsMember.getUsername());
            return 1;
        }

        return 0;
    }

    @Override
    public int deleteUserById(int id) {
        return 0;
    }

    @Override
    public int updatePassword(int id, UpdatePasswordParam updatePasswordParam) {
        return 0;
    }

    @Override
    public void logout() {

    }

    @Override
    public Page<UmsMember> listUmsLeaner(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UmsMember> umsMembers = umsMemberRepository.findAllUsers(pageable);
        logger.debug("Page size: {}", umsMembers.getSize());
        return umsMembers;
    }

    @Override
    public Page<UmsMember> listUmsMentor(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UmsMember> umsMembers = umsMemberRepository.findAllUsers(pageable);
        logger.debug("Page size: {}", umsMembers.getSize());
        return umsMembers;
    }

    @Override
    public int lock_member(int id) {

        logger.debug("service dang bat dau lock tai khoan member");
        UmsMember umsMember = umsMemberRepository.findById(Long.valueOf(id));
        if (umsMember == null) {
            return 0;
        }
        if (umsMember.getStatus() == 1) {
            umsMember.setStatus(0);
            return 1;
        }

        return 0;


    }

    @Override
    public int unlock_member(int id) {
        logger.debug("dang bat dau unlock cho tai khoan ");

        UmsMember umsMember = umsMemberRepository.findById(Long.valueOf(id));
        if (umsMember == null) {
            return 0;

        }
        if (umsMember.getStatus() == 0) {
            umsMember.setStatus(1);
            return 1;
        }
        return 0;


    }

    @Override
    public int update_password(int id, String password) {
        UmsMember umsMember = umsMemberRepository.findById(Long.valueOf(id));

        if (umsMember == null) {
            return 0;
        }
        umsMember.setPassword(password);
        umsMemberRepository.save(umsMember);
        return 1;
    }
}
