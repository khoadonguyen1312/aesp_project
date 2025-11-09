package com.aesp_backend.aesp_backend.admin.service;

import com.aesp_backend.aesp_backend.admin.UmsAdminParam;
import com.aesp_backend.aesp_backend.admin.dto.UmsAdminInfoResponse;
import com.aesp_backend.aesp_backend.admin.dto.UpdatePasswordParam;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import org.springframework.data.domain.Page;

public interface UmsAdminService {
    UmsMember findByUsername(String username);

    String login(String username, String password);

    UmsAdminInfoResponse info(int id);

    UmsMember register(UmsAdminParam umsAdminParam);

    int update(int id, UmsMember umsAdmin);

    int delete(int id);

    int deleteMemberAccount(int id);

    int deleteUserById(int id);

    int updatePassword(int id, UpdatePasswordParam updatePasswordParam);

    void logout();

    Page<UmsMember> listUmsLeaner(int page, int size);

    Page<UmsMember> listUmsMentor(int page, int size);

    int lock_member(int id);

    int unlock_member(int id);
    int update_password(int id,String password);
}
