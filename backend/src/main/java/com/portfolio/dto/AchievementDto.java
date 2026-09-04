package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AchievementDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String category;
    private String eventOrOrg;
    private String achievementDate;
    private String description;
    private Integer displayOrder;
}
