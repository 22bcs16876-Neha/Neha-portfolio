package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String company;

    @Column(nullable = false, length = 120)
    private String role;

    @Column(length = 100)
    private String location;

    @Column(name = "start_date", nullable = false, length = 50)
    private String startDate;

    @Column(name = "end_date", length = 50)
    private String endDate;

    @Column(name = "is_current")
    @Builder.Default
    private Boolean isCurrent = false;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    // Bullet points separated by newlines
    @Lob
    @Column(columnDefinition = "TEXT")
    private String responsibilities;

    // Comma-separated list of technologies
    @Column(length = 300)
    private String technologies;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
