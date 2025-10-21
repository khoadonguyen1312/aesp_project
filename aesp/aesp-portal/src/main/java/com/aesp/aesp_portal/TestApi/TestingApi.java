package com.aesp.aesp_portal.TestApi;

import com.aesp.aesp_jpa.entity.UmsAdmin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestingApi {
    @GetMapping("/testingapi")
    public String testing()
    {
        try{
            UmsAdmin umsAdmin =new UmsAdmin();

            return "test";
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
