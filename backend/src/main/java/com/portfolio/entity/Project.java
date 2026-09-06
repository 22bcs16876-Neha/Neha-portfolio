package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Lob
    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    @Lob
    @Column(name = "full_description", columnDefinition = "TEXT")
    private String fullDescription;

    @Lob
    @Column(name = "problem_solved", columnDefinition = "TEXT")
    private String problemSolved;

    // Bullet points / newline-separated features
    @Lob
    @Column(columnDefinition = "TEXT")
    private String features;

    // Comma-separated list of technologies, e.g. "Java, Spring Boot, React, MySQL, Docker"
    @Column(length = 300)
    private String technologies;

    @Column(name = "github_url", length = 300)
    private String githubUrl;

    @Column(name = "live_url", length = 300)
    private String liveUrl;

    @Lob
    @Column(name = "image_url", columnDefinition = "LONGTEXT")
    private String imageUrl;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
