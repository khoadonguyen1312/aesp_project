package com.aesp.aesp_admin.Service;

import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Dto.UpdatePasswordParam;

import com.aesp.aesp_jpa.entity.UmsMember;
import org.springframework.data.domain.Page;

public interface UmsAdminService {
    UmsMember findByUsername(String username);

    String login(String username,String password);

   UmsMember register(UmsAdminParam umsAdminParam);

   int update(int id,UmsMember umsAdmin);

   int delete(int id);

   int deleteMemberAccount(int id);

    int deleteUserById(int id);
   int updatePassword(int id, UpdatePasswordParam updatePasswordParam);

   void logout();

   Page<UmsMember> listUmsLeaner(int page);

   Page<UmsMember> listUmsMentor(int page);


}
