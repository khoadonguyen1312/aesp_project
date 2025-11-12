package com.aesp_backend.aesp_backend.mentor.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UmsMentorDto {
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
    @NotEmpty
    private String email;
    @NotEmpty
    private String phone_number;
    @NotEmpty
    private String fullname;
    @NotEmpty
    private String bio;
}
