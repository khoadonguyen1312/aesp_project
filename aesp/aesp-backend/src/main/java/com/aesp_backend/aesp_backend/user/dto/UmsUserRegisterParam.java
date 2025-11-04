package com.aesp_backend.aesp_backend.user.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UmsUserRegisterParam {
    @NotEmpty
    private String username;
    @NotEmpty
    private String email;
    @NotEmpty
    private String password;
    @NotEmpty
    private String fullname;
    @NotNull
    private int age;
    @NotEmpty
    private String level;
    @NotEmpty
    private String nativeLanguage;
    @NotEmpty
    private String goal;

}
