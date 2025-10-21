package com.aesp.aesp_jpa.entity;

import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
public class UmsAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger id;


    @Column(name = "username" ,nullable = false,length = 64)
    private String username;


    @Column(name = "password",nullable = false,length = 64)
    private  String password;

    @Column(name = "email",nullable = false)
    private  String email;

    @Column(name = "create_at")

    private LocalDateTime create_at;

    @Column(name = "login_time")

    private LocalDateTime login_time;

    @Column(name = "status" ,columnDefinition = "INT DEFAULT 1")

    private  int status;


}
