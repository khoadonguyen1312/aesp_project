package com.aesp_backend.aesp_backend.user.service;

import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.user.dto.UmsUserRegisterParam;
import org.springframework.stereotype.Service;


public interface UmsUserService {

    UmsMember register(UmsUserRegisterParam userRegisterParam);
}
