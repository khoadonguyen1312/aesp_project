package com.aesp_backend.aesp_backend.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private int id;
    private String name;
    @OneToMany(mappedBy = "omsCourse", cascade = CascadeType.ALL)
    private List<OmsLeason> omsLeasons;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private byte[] thumb;
    private String course_content;
    private String required_for_learning;
    @ManyToOne
    @JoinColumn(name = "mentor_id")

    private UmsMember mentor;
    private String description;
    private Long price;
    @ManyToMany
    @JoinTable(name = "course_buyer", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "buyer_id"))
    private List<UmsMember> buyers;
}
