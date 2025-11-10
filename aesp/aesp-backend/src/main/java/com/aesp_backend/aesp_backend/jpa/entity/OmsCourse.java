package com.aesp_backend.aesp_backend.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter

public class OmsCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "omsCourse")
    private List<OmsLeason> omsLeasons;
    private byte[] thumb;
    private String course_content;
    private String required_for_learning;
    private byte video;
    private String description;

}
