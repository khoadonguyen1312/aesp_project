package com.aesp_backend.aesp_backend.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UmsAdminParam {
    @NotEmpty(message = "Tên đăng nhập không được để trống")
    private String username;

    @NotEmpty(message = "Mật khẩu không được để trống")
    private String password;

    @NotEmpty(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;
}
