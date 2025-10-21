package com.aesp.aesp_admin.Service;

import com.aesp.aesp_admin.Dto.UmsAdminParam;
import com.aesp.aesp_admin.Dto.UpdatePasswordParam;
import com.aesp.aesp_jpa.entity.UmsAdmin;

public interface UmsAdminService {
    UmsAdmin findByUsername(String username);

    String login(String username,String password);

   UmsAdmin register(UmsAdminParam umsAdminParam);

   int update(String id,UmsAdmin umsAdmin);

   int delete(String id);

   int deleteMemberAccount(String id);


   int updatePassword(Long id, UpdatePasswordParam updatePasswordParam);

   void logout();


}
