package com.aesp_backend.aesp_backend.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
@Getter
@Setter
public class UmsRole {
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private int id;
    private String role;

}
