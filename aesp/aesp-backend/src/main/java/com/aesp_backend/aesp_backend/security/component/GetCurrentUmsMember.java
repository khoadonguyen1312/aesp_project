package com.aesp_backend.aesp_backend.security.component;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class GetCurrentUmsMember {
    private Logger logger = LoggerFactory.getLogger(GetCurrentUmsMember.class);
    @Autowired
    private UmsMemberRepository umsMemberRepository;

    public UmsMember getMember() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();


        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            logger.debug("lay duoc user name tu trang thai security hien tai " + username);

            return umsMemberRepository.findByUsername(username);
        }

        return null;
    }
}
