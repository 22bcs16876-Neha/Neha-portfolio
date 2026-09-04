package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coding_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // e.g. GitHub, LinkedIn, LeetCode, CodeChef, HackerRank, GeeksforGeeks
    @Column(nullable = false, length = 60)
    private String platform;

    @Column(nullable = false, length = 100)
    private String username;

    @Column(name = "profile_url", nullable = false, length = 300)
    private String profileUrl;

    @Column(name = "icon_name", length = 50)
    private String iconName;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
