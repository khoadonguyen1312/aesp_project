package com.aesp.aesp_admin.Service.impl;


import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Dto.UpdatePasswordParam;
import com.aesp.aesp_admin.Service.UmsAdminService;
import com.aesp.aesp_jpa.entity.UmsMember;
import com.aesp.aesp_jpa.respository.UmsMemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

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
        umsMember.setUmsRoles(se);
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
        return 1;
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
    public Page<UmsMember> listUmsLeaner(int page) {
        return null;
    }

    @Override
    public Page<UmsMember> listUmsMentor(int page) {
        return null;
    }
}
