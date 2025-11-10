package com.aesp_backend.aesp_backend.admin.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data

public class LoginRefeshTokenParam {

    private String username;
    private String password;
}
