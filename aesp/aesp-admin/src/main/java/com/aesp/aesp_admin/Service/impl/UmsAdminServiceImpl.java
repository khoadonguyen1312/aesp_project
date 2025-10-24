package com.aesp.aesp_admin.Service.impl;

import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Dto.UpdatePasswordParam;
import com.aesp.aesp_admin.Service.UmsAdminService;
import com.aesp.aesp_jpa.entity.UmsAdmin;
import com.aesp.aesp_jpa.respository.UmsAdminRepository;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class UmsAdminServiceImpl implements UmsAdminService {

    private static final Logger logger = LoggerFactory.getLogger(UmsAdminServiceImpl.class);
    @Autowired
    private UmsAdminRepository umsAdminRepository;
    private UmsAdmin umsAdmin;

    @Override
    public UmsAdmin findByUsername(String username) {
        return null;
    }

    @Override
    public String login(String username, String password) {
        return "";
    }

    @Override
    public UmsAdmin register(UmsAdminParam umsAdminParam) {
        logger.debug("admin create account");
        UmsAdmin umsAdmin = new UmsAdmin();
        BeanUtils.copyProperties(umsAdminParam, umsAdmin);

        if (umsAdminRepository.existsByUsername(umsAdmin.getUsername()) || umsAdminRepository.existsByEmail(umsAdmin.getEmail())) {
            logger.debug("usernname hoặc email tồn tại");
            return null;
        }
        umsAdminRepository.save(umsAdmin);
        logger.debug("save umsadmin with username :" + umsAdmin.getUsername());


        return umsAdmin;
    }

    @Override
    public int update(String id, UmsAdmin umsAdmin) {
        return 0;
    }

    @Override
    public int delete(String id) {
        return 0;
    }

    @Override
    public int deleteMemberAccount(String id) {
        return 0;
    }

    @Override
    public int updatePassword(Long id, UpdatePasswordParam updatePasswordParam) {
        return 0;
    }

    @Override
    public void logout() {

    }

    @Override
    public List<UmsAdmin> getAllAdmins() {
    return umsAdminRepository.findAll();
    } 
}
