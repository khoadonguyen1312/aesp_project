package com.aesp.aesp_admin.Service.impl;

import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Dto.UpdatePasswordParam;
import com.aesp.aesp_admin.Service.UmsAdminService;
import com.aesp.aesp_jpa.entity.UmsAdmin;
import com.aesp.aesp_jpa.respository.UmsAdminRepository;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UmsAdminServiceImpl implements UmsAdminService {
    @Autowired
    private UmsAdminRepository umsAdminRepository;

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
        UmsAdmin umsAdmin = new UmsAdmin();
        BeanUtils.copyProperties(umsAdminParam, umsAdmin);
        System.out.println(umsAdmin.getEmail());
        umsAdminRepository.save(umsAdmin);
        return null;
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
}
