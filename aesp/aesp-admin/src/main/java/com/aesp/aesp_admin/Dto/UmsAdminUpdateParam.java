package com.aesp.aesp_admin.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@Data
public class UmsAdminUpdateParam {

    private String username;

    private String email;

}
