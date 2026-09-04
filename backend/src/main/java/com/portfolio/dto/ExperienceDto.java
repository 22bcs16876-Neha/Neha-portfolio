package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceDto {
    private Long id;

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Role is required")
    private String role;

    private String location;

    @NotBlank(message = "Start date is required")
    private String startDate;

    private String endDate;
    private Boolean isCurrent;
    private String description;
    private String responsibilities;
    private String technologies;
    private Integer displayOrder;
}
