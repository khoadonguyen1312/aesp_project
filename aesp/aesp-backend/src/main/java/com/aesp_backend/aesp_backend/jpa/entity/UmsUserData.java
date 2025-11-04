package com.aesp_backend.aesp_backend.jpa.entity;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class UmsUserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private String fullname;

    private int age;

    private String level;

    private String nativeLanguage;

    private String goal;

}
