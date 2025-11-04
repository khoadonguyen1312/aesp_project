package com.aesp_backend.aesp_backend.security.component;

import com.aesp_backend.aesp_backend.admin.bo.DynamicUserDetail;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class DynamicUserDetailServices implements UserDetailsService {
    @Autowired
    private UmsMemberRepository umsMemberRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      UmsMember umsMember= umsMemberRepository.findByusername(username);
      if(umsMember==null)
      {
          return null;
      }
        return new DynamicUserDetail(umsMember);
    }
}
