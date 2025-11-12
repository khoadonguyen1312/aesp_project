package com.aesp_backend.aesp_backend.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UmsAdminInfoResponse {
    private String email;
    private String username;
    private String login_time;
    private String created_at;
    private String status;

}
