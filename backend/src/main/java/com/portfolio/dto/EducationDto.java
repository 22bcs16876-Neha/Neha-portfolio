package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationDto {
    private Long id;

    @NotBlank(message = "Degree is required")
    private String degree;

    @NotBlank(message = "Institution is required")
    private String institution;

    private String fieldOfStudy;
    private String startYear;
    private String endYear;
    private String gradeOrCgpa;
    private String description;
    private Integer displayOrder;
}
