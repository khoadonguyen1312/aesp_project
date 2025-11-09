package com.aesp_backend.aesp_backend.jpa.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter

public class UmsMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "username", nullable = false, length = 64)
    private String username;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<UmsRole> umsRoles;


    @OneToOne
    @JoinColumn(
            name = "data_id",
            referencedColumnName = "id"
    )
    private UmsUserData umsUserData;
    @Column(name = "password", nullable = false, length = 64)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "create_at")

    private LocalDateTime create_at;

    @Column(name = "login_time")

    private LocalDateTime login_time;

    @Column(name = "status")

    private int status = 1;


}
