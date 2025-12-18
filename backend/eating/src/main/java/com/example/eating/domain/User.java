package com.example.eating.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_key", nullable = false, unique = true, length = 64)
    private String userKey;

    @Column(name = "login_id", unique = true, length = 64)
    private String loginId;

    @Column(name = "login_password", length = 128)
    private String loginPassword;

    @Builder
    public User(String loginId, String loginPassword) {
        this.loginId = loginId;
        this.loginPassword = loginPassword;
    }
}
