package com.aesp.aesp_admin.bo;

import com.aesp.aesp_jpa.entity.UmsMember;
import com.aesp.aesp_jpa.respository.UmsMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class DynamicUserDetails implements UserDetails {
    @Autowired
    private UmsMemberRepository umsMemberRepository;
    private UmsMember umsMember ;
    public  DynamicUserDetails(UmsMember umsMember)
    {
        this.umsMember =umsMember;

    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return umsMember.getPassword();
    }

    @Override
    public String getUsername() {
        return umsMember.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
