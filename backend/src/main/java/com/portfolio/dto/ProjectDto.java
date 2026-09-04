package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;

    @NotBlank(message = "Short description is required")
    private String shortDescription;

    private String fullDescription;
    private String problemSolved;
    private String features;
    private String technologies;
    private String githubUrl;
    private String liveUrl;
    private String imageUrl;
    private Boolean isFeatured;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
