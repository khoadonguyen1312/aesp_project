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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UmsAdminServiceImpl implements UmsAdminService {

    private static final Logger logger = LoggerFactory.getLogger(UmsAdminService.class);
    @Autowired
    private UmsMemberRepository umsMemberRepository;

    @Override
    public UmsMember findByUsername(String username) {
        return umsMemberRepository.findByUsername(username);
    }

    @Override
    public String login(String username, String password) {
        return "";
    }

    @Override
    public UmsMember info(int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;
                UmsMember umsMember = umsMemberRepository.findByUsername(userDetails.getUsername());
                if (umsMember != null) {
                    return umsMember;
                } else {
                    logger.debug("khong tim thay user voi username: " + userDetails.getUsername());
                }
            }
        }
        return null;
    }

    @Autowired
    private UmsRoleCache umsRoleCache;


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
    @Transactional
    public int deleteMemberAccount(int id) {
        logger.debug("Bắt đầu xóa member");

        Optional<UmsMember> umsMemberOpt = umsMemberRepository.findById(id);
        if (umsMemberOpt.isPresent()) {
            UmsMember umsMember = umsMemberOpt.get();


            umsMemberRepository.deleteCourseBuyerByMemberId(umsMember.getId());


            umsMemberRepository.deleteById(umsMember.getId());

            logger.debug("Xóa thành công UmsMember với id: " + umsMember.getId() + " username: " + umsMember.getUsername());
            return 1;
        }

        logger.debug("Không xóa được UmsMember, id không tồn tại");
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
        Page<UmsMember> umsMembers = umsMemberRepository.findAllMentors(pageable);
        logger.debug("Page size: {}", umsMembers.getSize());
        return umsMembers;
    }

    @Override
    public int lock_member(int id) {

        logger.debug("service dang bat dau lock tai khoan member");
        Optional<UmsMember> umsMemberOptional = umsMemberRepository.findById(id);
        if (umsMemberOptional.isEmpty()) {
            return 0;
        }
        UmsMember umsMember = umsMemberOptional.get();
        if (umsMember.getStatus() == 1) {
            umsMember.setStatus(0);
            umsMemberRepository.save(umsMember);
            logger.debug("lock thanh cong user voi id :" + umsMember.getId() + "username:" + umsMember.getUsername());
            return 1;
        }

        return 0;


    }

    @Override
    public int unlock_member(int id) {
        logger.debug("dang bat dau unlock cho tai khoan ");

        Optional<UmsMember> umsMemberOptional = umsMemberRepository.findById(id);
        if (umsMemberOptional.isEmpty()) {
            logger.debug("khong tim thay tai khoan trong db");
            return 0;

        }
        UmsMember umsMember = umsMemberOptional.get();
        if (umsMember.getStatus() == 0) {
            umsMember.setStatus(1);
            umsMemberRepository.save(umsMember);
            logger.debug("unlock thanh cong tai khoan voi id :" + id + "username :" + umsMember.getUsername());
            return 1;
        }
        return 0;


    }

    @Override
    public int update_password(int id, String password) {
        Optional<UmsMember> umsMember = umsMemberRepository.findById(id);

        if (umsMember.isEmpty()) {
            return 0;
        }
        umsMember.get().setPassword(password);
        umsMemberRepository.save(umsMember.get());
        return 1;
    }
}
