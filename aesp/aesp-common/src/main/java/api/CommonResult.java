package api;

public class CommonResult<T> {
        private Long code;
        private String message;
        private T data;

    public   CommonResult()
    {

    }
    public  CommonResult(long code,String message,T data)
    {
        this.code =code;
        this.message =message;
        this.data =data;
    }

    public  static  <T> CommonResult<T> success(T data)
    {
        return new CommonResult(ResultCode.SUCCESS.getcode(),ResultCode.SUCCESS.getmessage(),data);
    }

    public static  <T> CommonResult<T> success(T data,String message)
    {
        return new CommonResult<>(ResultCode.SUCCESS.getcode(),message,data);
    }

    public static  <T> CommonResult<T> failed(String message)
    {
        return new CommonResult<>(ResultCode.FAILED.getcode(), message,null);
    }
    public static  <T> CommonResult<T> forbidden()
    {
        return new CommonResult<>(ResultCode.FORBIDDEN.getcode(), ResultCode.FORBIDDEN.getmessage(),null);
    }

    public static  <T> CommonResult<T> forbidden(String message)
    {
        return new CommonResult<>(ResultCode.FORBIDDEN.getcode(), message,null);
    }
    public static  <T> CommonResult<T> unauthorized(String message)
    {
        return new CommonResult<>(ResultCode.UNAUTHORIZED.getcode(), message,null);
    }

    public static  <T> CommonResult<T> unauthorized()
    {
        return new CommonResult<>(ResultCode.UNAUTHORIZED.getcode(), ResultCode.UNAUTHORIZED.getmessage(), null);
    }

    public Long getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(T data) {
        this.data = data;
    }
}
