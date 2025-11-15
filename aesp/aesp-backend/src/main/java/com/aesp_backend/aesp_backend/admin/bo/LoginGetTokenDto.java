package com.aesp_backend.aesp_backend.admin.bo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginGetTokenDto {
    private String token;
    private String role;
}
