package com.aesp_backend.aesp_backend.common.api;


public enum ResultCode implements IErorrCode {
    SUCCESS(200L, "Thao tác thành công"),
    FAILED(500L, "Thao tác thất bại"),
    VALIDATE_FAILED(404L, "Kiểm tra tham số thất bại"),
    UNAUTHORIZED(401L, "Chưa đăng nhập hoặc token đã hết hạn"),
    FORBIDDEN(403L, "Không có quyền truy cập");

    private final long code;
    private final String message;

    ResultCode(long code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public long getcode() {
        return this.code;
    }

    @Override
    public String getmessage() {
        return this.message;
    }
}
