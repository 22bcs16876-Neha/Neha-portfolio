package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "achievements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    // e.g. HACKATHON, COMPETITION, ACADEMIC, OPEN_SOURCE, AWARD, OTHER
    @Column(length = 60)
    private String category;

    @Column(name = "event_or_org", length = 150)
    private String eventOrOrg;

    @Column(name = "achievement_date", length = 50)
    private String achievementDate;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
