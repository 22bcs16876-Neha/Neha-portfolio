package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "educations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String degree;

    @Column(nullable = false, length = 150)
    private String institution;

    @Column(name = "field_of_study", length = 120)
    private String fieldOfStudy;

    @Column(name = "start_year", length = 20)
    private String startYear;

    @Column(name = "end_year", length = 20)
    private String endYear;

    @Column(name = "grade_or_cgpa", length = 50)
    private String gradeOrCgpa;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
