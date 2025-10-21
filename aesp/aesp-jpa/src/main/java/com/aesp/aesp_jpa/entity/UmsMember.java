package com.aesp.aesp_jpa.entity;

import javax.persistence.*;

@Entity
public class UmsMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username",nullable = false,length = 64)
    private String username;
    @Column(name = "password",nullable = false,length = 64)
    private  String password;
    @Column(name = "email",nullable = false,length = 64)
    private  String email;

    @Column(name = "account_type",columnDefinition = "VARCHAR(64) DEFAULT normal")
    private  String account_type;



}
