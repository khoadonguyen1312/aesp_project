package com.aesp_backend.aesp_backend.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
public class OmsLeason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = true)
    private OmsCourse omsCourse;
    private int order_index;
    private String description;
    private String title;

    private byte[] pdf;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "leason_vocabulary",
            joinColumns = @JoinColumn(name = "leason_id"),
            inverseJoinColumns = @JoinColumn(name = "vocabulary_id")
    )
    private Set<OmsVocabulary> omsVocabulary;

}
