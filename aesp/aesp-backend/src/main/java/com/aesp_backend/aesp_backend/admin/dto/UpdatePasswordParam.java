package com.aesp_backend.aesp_backend.admin.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data

public class UpdatePasswordParam {
    private int id;
    private String password;

}
