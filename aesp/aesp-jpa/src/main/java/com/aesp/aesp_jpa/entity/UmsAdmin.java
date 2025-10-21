package com.aesp.aesp_jpa.entity;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;

/**
 * Entity class for umsadmin table
 */
@Entity
@Getter
@Setter
@ToString
public class UmsAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


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
