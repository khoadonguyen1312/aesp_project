package com.aesp_backend.aesp_backend.jpa.entity;


import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
public class UmsMentorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToMany
    private Set<OmsCourse> omsCourses;

    private LocalDateTime day_join;

    private String fullname;

    private String phone_number;

    private String bio;

}
 