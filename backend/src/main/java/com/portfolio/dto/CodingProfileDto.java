package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingProfileDto {
    private Long id;

    @NotBlank(message = "Platform is required")
    private String platform;

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Profile URL is required")
    private String profileUrl;

    private String iconName;
    private Integer displayOrder;
}
