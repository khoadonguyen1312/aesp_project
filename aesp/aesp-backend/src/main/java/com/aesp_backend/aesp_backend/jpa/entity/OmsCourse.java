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
    @OneToMany(mappedBy = "omscourse")
    private List<OmsLeason> omsLeasons;

    private List<String> course_content;
    private List<String> required_for_learning;

    private String describe;

}
