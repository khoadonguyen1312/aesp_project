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
    @OneToMany(mappedBy = "omsCourse", cascade = CascadeType.ALL)
    private List<OmsLeason> omsLeasons;
    private byte[] thumb;
    private String course_content;
    private String required_for_learning;

    private String description;
    private Long price;
    @ManyToMany
    @JoinTable(
            name = "course_buyer",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "buyer_id")
    )
    private List<UmsMember> buyers;
}
